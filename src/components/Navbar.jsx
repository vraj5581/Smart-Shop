import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <nav className="navbar">
      <div className="nav-brand">
        <a href="/">SmartShop</a>
      </div>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Home
        </Link>
        <Link to="/cart" className="nav-link cart-link">
          Cart <span className="cart-count">({cartItems.length})</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
