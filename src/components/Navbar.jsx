import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">
          Campus L&F
        </Link>
      </div>

      <div className="navbar-center">
        <Link to="/">Home</Link>
        <Link to="/lost">Lost</Link>
        <Link to="/found">Found</Link>
        <Link to="/post" className="post-btn">
          + Post Item
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;