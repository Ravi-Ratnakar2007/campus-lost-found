import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    document.body.classList.toggle("dark", darkMode);
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  return (
    <nav className="navbar">
      {/* LEFT */}
      <div className="navbar-left">
        <Link to="/" className="logo">
          🎒 Campus L&F
        </Link>
      </div>

      {/* CENTER */}
      <div className="navbar-center">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/lost"
          className={({ isActive }) =>
            isActive ? "nav-link active lost" : "nav-link"
          }
        >
          Lost
        </NavLink>

        <NavLink
          to="/found"
          className={({ isActive }) =>
            isActive ? "nav-link active found" : "nav-link"
          }
        >
          Found
        </NavLink>

        <NavLink to="/post" className="post-btn">
          + Post Item
        </NavLink>
      </div>

      {/* RIGHT */}
      <div className="navbar-right">
        <button
          className="dark-toggle"
          onClick={() => setDarkMode((p) => !p)}
          title="Toggle theme"
        >
          {darkMode ? "🌙" : "☀️"}
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
