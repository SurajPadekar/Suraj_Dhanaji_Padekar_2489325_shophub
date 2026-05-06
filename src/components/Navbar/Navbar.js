import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/login');
  }

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/products" className="logo">
          <span className="logo-icon">S</span>
          ShopHub
        </Link>

        <div className="nav-links">
          <Link to="/products">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/products">About</Link>
        </div>

        <div className="nav-right">
          <Link to="/cart" className="cart-link">
            🛒
            {itemCount > 0 && <span className="badge">{itemCount}</span>}
          </Link>

          {isAuthenticated ? (
            <>
              <span className="user-name">{user?.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </>
          ) : (
            <Link to="/login" className="login-link">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
