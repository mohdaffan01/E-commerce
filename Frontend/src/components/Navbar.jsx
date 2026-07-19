import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingCart, User, LogOut, Menu, X } from 'lucide-react';
import './Navbar.css';

const Navbar = ({ user, cartCount, logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Left: Brand Logo */}
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <ShoppingCart className="logo-cart-icon" size={24} /> E-Commerce
        </Link>

        {/* Mobile Hamburger Icon using Lucide Menu/X */}
        <div className="navbar-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </div>

        {/* Middle: Main Navigation Links */}
        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/blog" className="navbar-link" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link" onClick={() => setIsOpen(false)}>
              Contact us
            </Link>
          </li>
          {user && (
            <li className="navbar-item">
              <Link to="/add-product" className="navbar-link" onClick={() => setIsOpen(false)}>
                Add Product
              </Link>
            </li>
          )}
        </ul>

        {/* Right: Actions (Wishlist, Cart, User/Auth Logos) */}
        <div className="navbar-actions">
          {/* Wishlist Icon */}
          <div className="navbar-action-item wishlist-icon-wrapper" title="Wishlist">
            <Heart className="action-icon" size={18} />
            <span className="action-badge">0</span>
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="navbar-action-item cart-icon-wrapper" title="Cart">
            <ShoppingCart className="action-icon" size={18} />
            <span className="action-badge badge-primary">{cartCount}</span>
          </Link>

          {/* User Account / Auth Icon */}
          {user ? (
            <div className="navbar-user-menu">
              <span className="navbar-username" title={`Logged in as ${user.name}`}>
                <User size={16} style={{ marginRight: '4px' }} />
                {user.name.split(' ')[0]}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn-icon-logout" 
                title="Logout"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="navbar-action-item" title="Login / Register">
              <User className="action-icon" size={18} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
