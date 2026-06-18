import "./Navbar.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../services/api";

function Navbar() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [cartCount, setCartCount] = useState(0);

  const logout = () => {
    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  useEffect(() => {
    fetchCartCount();
  }, []);

  const fetchCartCount = async () => {
    try {
      const user = JSON.parse(
        localStorage.getItem("user")
      );

      if (!user) return;

      const res = await API.get(
        `/cart/${user.user._id}`
      );

      setCartCount(res.data.length);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="navbar">
      <Link to="/" className="logo">
        ShopEZ
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>

        <Link to="/cart">
          Cart ({cartCount})
        </Link>

        {!user && (
          <Link to="/login">Login</Link>
        )}

        <Link to="/orders">Orders</Link>

        <Link to="/profile">Profile</Link>

        {user?.user?.role?.toLowerCase() ===
  "admin" && (
  <Link to="/admin">Admin</Link>
)}

        {!user && (
          <Link to="/register">Register</Link>
        )}
      </div>

      {user && (
        <button
          className="logout-btn"
          onClick={logout}
        >
          Logout
        </button>
      )}
    </div>
  );
}

export default Navbar;