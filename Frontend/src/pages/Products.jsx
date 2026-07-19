import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../services/api';
import ProductCard from '../components/ProductCard';
import './Products.css';

const Products = ({ onAddToCart, isAuthenticated }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Search and Filter states
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Load category from URL if any
  useEffect(() => {
    const categoryUrl = searchParams.get('category');
    if (categoryUrl) {
      setCategoryFilter(categoryUrl);
    } else {
      setCategoryFilter('');
    }
  }, [searchParams]);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        let { data } = await api.get('/products');
        
        // Seeding helper if database starts empty
        if (data.length === 0) {
          try {
            await api.post('/products/seed');
            const res = await api.get('/products');
            data = res.data;
          } catch (seedErr) {
            console.error('Seeding database failed:', seedErr);
          }
        }
        
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching products from server.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter and Sort logic
  useEffect(() => {
    let result = [...products];

    // Category Filter
    if (categoryFilter) {
      result = result.filter((p) => p.category === categoryFilter);
    }

    // Search term filter
    if (searchTerm) {
      result = result.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sorting
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(result);
  }, [products, categoryFilter, searchTerm, sortBy]);

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategoryFilter(val);
    if (val) {
      setSearchParams({ category: val });
    } else {
      setSearchParams({});
    }
  };

  return (
    <div className="products-page container">
      <div className="page-header">
        <h1>Our Catalog</h1>
      </div>

      {/* Filter and Sort bar */}
      <div className="filters-bar">
        <div className="filter-group search">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="filter-group category">
          <select value={categoryFilter} onChange={handleCategoryChange}>
            <option value="">All Categories</option>
            <option value="Desks">Desks</option>
            <option value="Furnitures">Furnitures</option>
            <option value="Boxes">Boxes</option>
            <option value="Drawers">Drawers</option>
            <option value="Cabinets">Cabinets</option>
            <option value="Bins">Bins</option>
            <option value="Lamps">Lamps</option>
            <option value="Multimedia">Multimedia</option>
          </select>
        </div>

        <div className="filter-group sort">
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="default">Sort by: Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="products-spinner">Loading items...</div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          <h3>No products match your criteria.</h3>
          <p>Try refining your search terms or choosing a different category.</p>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onAddToCart={onAddToCart}
              isAuthenticated={isAuthenticated}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;
