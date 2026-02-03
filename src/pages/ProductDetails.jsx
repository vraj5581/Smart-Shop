import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  const handleBack = () => {
    if (window.history.length > 2) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  if (!product)
    return (
      <div className="loading-state">
        <div className="spinner"></div>
        <p>Loading details...</p>
      </div>
    );

  return (
    <div className="product-details-container">
      <button
        onClick={handleBack}
        className="back-btn"
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          font: "inherit",
        }}
      >
        ← Back to Products
      </button>
      <div className="details-grid">
        <div className="details-image">
          <img src={product.image} alt={product.title} />
        </div>
        <div className="details-info">
          <span className="details-category">{product.category}</span>
          <h2>{product.title}</h2>
          <p className="details-description">{product.description}</p>
          <div className="details-price">₹{product.price}</div>
          <button
            className="add-to-cart-btn"
            onClick={() => dispatch(addToCart(product))}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
