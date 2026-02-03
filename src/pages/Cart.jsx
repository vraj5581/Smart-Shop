import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromCart } from "../redux/cartSlice";

function Cart() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const removeItem = (index) => {
    dispatch(removeFromCart(index));
  };

  return (
    <div className="cart-container">
      <h1 className="page-title">🛒 Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>No items in cart</p>
          <Link to="/" className="continue-link">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="cart-grid">
          {cart.map((item, index) => (
            <div key={index} className="cart-card">
              <Link to={`/product/${item.id}`} className="product-link">
                <h3>{item.title}</h3>
              </Link>
              <div className="card-details">
                <span className="price">₹{item.price}</span>
                <button
                  className="remove-btn"
                  onClick={() => removeItem(index)}
                >
                  ❌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Cart;
