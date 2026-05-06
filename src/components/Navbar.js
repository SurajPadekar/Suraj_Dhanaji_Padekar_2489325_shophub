import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, user, logout } = useAuth();
  const { itemCount } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <span className="logo-icon">S</span>
          <span className="logo-text">ShopHub</span>
        </Link>

        {/* Search Bar */}
        <div className="navbar-search">
          <span className="search-icon">🔍</span>
          <input type="text" placeholder="Search products..." className="search-input" />
        </div>

        {/* Nav Links */}
        <div className="navbar-links">
          <NavLink to="/" end className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Home
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            Products
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}>
            About
          </NavLink>
        </div>

        {/* Right Side - Cart & User */}
        <div className="navbar-right">
          <Link to="/cart" className="cart-icon-link">
            {/* Cart SVG icon */}
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {itemCount > 0 && (
              <span className="cart-badge">{itemCount}</span>
            )}
          </Link>

          {isAuthenticated ? (
            <div className="user-section">
              <div className="user-avatar">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
              <span className="user-name">{user?.email?.split('@')[0]}</span>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="signin-link">Sign In</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
