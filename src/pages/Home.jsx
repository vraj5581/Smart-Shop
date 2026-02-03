import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import ProductCard from "../components/ProductCard";
import useFetch from "../hooks/useFetch";

function Home() {
  const dispatch = useDispatch();

  const addProductToCart = useCallback(
    (product) => {
      dispatch(addToCart(product));
    },
    [dispatch],
  );
  const { data: products, loading } = useFetch(
    "https://fakestoreapi.com/products",
  );

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sortOrder, setSortOrder] = useState("");

  // Get unique categories from products
  const categories = [...new Set(products.map((item) => item.category))];

  const filteredProducts = products
    .filter((item) => item.title.toLowerCase().includes(search.toLowerCase()))
    .filter((item) => (category === "all" ? true : item.category === category))
    .sort((a, b) => {
      if (sortOrder === "low") return a.price - b.price;
      if (sortOrder === "high") return b.price - a.price;
      return 0;
    });

  return (
    <div className="home-container">
      <div className="header-section">
        <h1 className="page-title">Discover Products</h1>
        <div className="filters-bar">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="filter-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </option>
            ))}
          </select>
          <select
            className="filter-select"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="">Sort By Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((item) => (
              <ProductCard
                key={item.id}
                product={item}
                addToCart={addProductToCart}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No products found matching your criteria.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Home;
