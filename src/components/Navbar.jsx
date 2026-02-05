import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import "./Navbar.css";
import logo from "../assets/JJ.logo.PNG";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <nav className="nav">
      {/* Brand */}
      <Link to="/" className="brand">
        <img className="logo" src={logo} alt="Tic-Tasker logo" />
        <span className="brand-text">Tic-Tasker</span>
      </Link>

      {/* Links – always side by side */}
      <div className="nav-links">
        <Link className="nav-link" to="/">
          Home
        </Link>

        {isLoggedIn ? (
          <>
            <Link className="nav-link" to="/dashboard">
              Dashboard
            </Link>
            <button
              className="nav-btn"
              onClick={() => {
                logout();
                navigate("/login");
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="nav-link" to="/login">
              Log in
            </Link>
            <Link className="nav-link nav-link--primary" to="/signup">
              Sign up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
