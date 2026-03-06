import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">Campus L&F</Link>
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/lost">Lost</Link>
        <Link to="/found">Found</Link>
      </div>

      <div className="nav-right">
        <Link to="/post" className="post-nav-btn">
          + Post Item
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;