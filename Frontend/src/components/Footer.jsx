import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Brand Description */}
        <div className="footer-section brand">
          <Link to="/" className="footer-logo">
            <span>🛍️</span> E-Commerce
          </Link>
          <p className="footer-desc">
            Discover a curated collection of modern, high-quality desks, drawers, chairs, and modular boxes. Elevate your workspace layout.
          </p>
        </div>

        {/* Quick Links */}
        <div className="footer-section links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cart">My Cart</Link></li>
            <li><Link to="/blog">Blog Insights</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Categories Sitemap */}
        <div className="footer-section categories">
          <h3>Categories</h3>
          <ul>
            <li><Link to="/?category=Desks">Desks</Link></li>
            <li><Link to="/?category=Furnitures">Furnitures</Link></li>
            <li><Link to="/?category=Drawers">Drawers</Link></li>
          </ul>
        </div>

        {/* Customer Support Contact */}
        <div className="footer-section contact">
          <h3>Customer Service</h3>
          <p>Email: support@ecom-furniture.com</p>
          <p>Phone: +31 (20) 555-0199</p>
          <p>Hours: Mon - Fri | 9 AM - 6 PM</p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} E-Commerce Inc. All rights reserved. Plain CSS Design.</p>
      </div>
    </footer>
  );
};

export default Footer;
