import React, { useState, useEffect } from 'react';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = ({ onAddToCart, isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Sidebar Filter States
  const [selectedCategory, setSelectedCategory] = useState('All Products');
  const [selectedLegs, setSelectedLegs] = useState([]);
  const [priceMax, setPriceMax] = useState(4000);
  const [mockDuration, setMockDuration] = useState('-');

  // Header Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('Benelux');
  const [sortBy, setSortBy] = useState('Featured');

  // Load products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let { data } = await api.get('/products');
        
        // Auto-seed if database is empty to guarantee content is visible
        if (data.length === 0) {
          try {
            await api.post('/products/seed');
            const res = await api.get('/products');
            data = res.data;
          } catch (seedErr) {
            console.error('Auto-seeding failed:', seedErr);
          }
        }
        
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Could not load products. Please check if backend server is running.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and Sort execution
  useEffect(() => {
    let temp = [...products];

    // Category Filter
    if (selectedCategory !== 'All Products') {
      temp = temp.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    // Search Query Filter
    if (searchQuery) {
      temp = temp.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
    }

    // Legs Material Filter
    if (selectedLegs.length > 0) {
      temp = temp.filter(p => selectedLegs.includes(p.legs));
    }

    // Price Max Filter
    temp = temp.filter(p => p.price <= priceMax);

    // Sorting
    if (sortBy === 'price-asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
  }, [products, selectedCategory, searchQuery, selectedLegs, priceMax, sortBy]);

  const handleLegsChange = (material) => {
    if (selectedLegs.includes(material)) {
      setSelectedLegs(selectedLegs.filter(l => l !== material));
    } else {
      setSelectedLegs([...selectedLegs, material]);
    }
  };

  const categories = [
    'All Products', 'Desks', 'Furnitures', 'Boxes', 'Drawers', 'Cabinets', 'Bins', 'Lamps', 'Services', 'Multimedia'
  ];

  const quickCategories = [
    { name: 'Desks', icon: '💻' },
    { name: 'Furnitures', icon: '🛋️' },
    { name: 'Boxes', icon: '📦' },
    { name: 'Drawers', icon: '🗄️' },
    { name: 'Cabinets', icon: '🚪' },
    { name: 'Bins', icon: '🗑️' }
  ];

  return (
    <div className="home-dashboard container">
      {/* 1. Left Sidebar Filters */}
      <aside className="dashboard-sidebar">
        {/* Category List */}
        <div className="sidebar-group">
          <h3>Categories</h3>
          <ul className="category-list">
            {categories.map((cat) => (
              <li key={cat}>
                <label className="radio-container">
                  <input
                    type="radio"
                    name="category"
                    checked={selectedCategory === cat}
                    onChange={() => setSelectedCategory(cat)}
                  />
                  <span className="checkmark"></span>
                  <span className="label-text">{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Legs material checkbox list */}
        <div className="sidebar-group">
          <h3>Legs</h3>
          <ul className="checkbox-list">
            {['Steel', 'Aluminium', 'Custom', 'Wood'].map((mat) => (
              <li key={mat}>
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    checked={selectedLegs.includes(mat)}
                    onChange={() => handleLegsChange(mat)}
                  />
                  <span className="custom-box"></span>
                  <span className="label-text">{mat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Duration Dropdown */}
        <div className="sidebar-group">
          <h3>Duration</h3>
          <div className="custom-select-wrapper">
            <select
              value={mockDuration}
              onChange={(e) => setMockDuration(e.target.value)}
              className="sidebar-select"
            >
              <option value="-">-</option>
              <option value="1 month">1 month</option>
              <option value="3 months">3 months</option>
              <option value="6 months">6 months</option>
            </select>
          </div>
        </div>

        {/* Price range selector */}
        <div className="sidebar-group">
          <h3>Price Range</h3>
          <div className="price-slider-values">
            <span>$12.00</span>
            <span>${priceMax.toFixed(2)}</span>
          </div>
          <input
            type="range"
            min="12"
            max="4000"
            value={priceMax}
            onChange={(e) => setPriceMax(Number(e.target.value))}
            className="price-slider"
          />
        </div>
      </aside>

      {/* 2. Main Content Area */}
      <main className="dashboard-content">
        {/* Header Search & Sort widgets */}
        <div className="content-header-bar">
          <div className="search-box-wrapper">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="header-search-input"
            />
          </div>

          <div className="header-actions">
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="header-select"
            >
              <option value="Benelux">Benelux</option>
              <option value="USA">USA</option>
              <option value="Asia">Asia</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="header-select"
            >
              <option value="Featured">Sort By: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pill Shortcut Horizontal List */}
        <div className="quick-categories-row">
          {quickCategories.map((qc) => (
            <button
              key={qc.name}
              className={`quick-category-pill ${selectedCategory === qc.name ? 'active' : ''}`}
              onClick={() => setSelectedCategory(qc.name)}
            >
              <span className="pill-icon">{qc.icon}</span>
              <span className="pill-name">{qc.name}</span>
            </button>
          ))}
        </div>

        {/* Product Grid display */}
        {loading ? (
          <div className="spinner">Loading store catalog...</div>
        ) : error ? (
          <div className="alert alert-danger">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="empty-catalog">
            <h3>No products found</h3>
            <p>Try resetting the search terms or change your sidebar filters.</p>
          </div>
        ) : (
          <div className="dashboard-products-grid">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p._id}
                product={p}
                onAddToCart={onAddToCart}
                isAuthenticated={isAuthenticated}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;
