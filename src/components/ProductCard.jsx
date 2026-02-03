import React from "react";
import { Link } from "react-router-dom";

function ProductCard({ product, addToCart }) {
  console.log("Rendering:", product.title);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image-placeholder">
          <img
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </div>
        <div className="product-info">
          <h3 className="product-title">{product.title}</h3>
          <span className="product-price">₹{product.price}</span>
        </div>
      </Link>
      <button className="add-to-cart-btn" onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}

export default React.memo(ProductCard);
