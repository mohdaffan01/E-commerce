import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import './ProductDetails.css';

const ProductDetails = ({ onAddToCart, isAuthenticated }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedMessage, setAddedMessage] = useState('');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const { data } = await api.get(`/products/${id}`);
        setProduct(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.error || 'Product not found or database error.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleQuantityChange = (amount) => {
    const nextQty = quantity + amount;
    if (nextQty >= 1 && nextQty <= product.stock) {
      setQuantity(nextQty);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      // Redirect to login page if user isn't signed in
      navigate('/login');
      return;
    }

    try {
      setAddedMessage('');
      await onAddToCart(product._id, quantity);
      setAddedMessage(`Successfully added ${quantity} item(s) to your cart!`);
      // Clear message after 3 seconds
      setTimeout(() => setAddedMessage(''), 3000);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="product-details-spinner">Loading product details...</div>;
  }

  if (error) {
    return (
      <div className="container product-details-error">
        <div className="alert alert-danger">{error}</div>
        <Link to="/products" className="btn btn-secondary">Back to Products</Link>
      </div>
    );
  }

  if (!product) return null;

  return (
    <div className="product-details-page container">
      <Link to="/products" className="back-link">
        &larr; Back to Catalog
      </Link>

      <div className="details-grid">
        {/* Left Column: Image */}
        <div className="details-image-container">
          <img src={product.image} alt={product.name} />
          <span className="details-category-badge">{product.category}</span>
        </div>

        {/* Right Column: Information */}
        <div className="details-info-container">
          <h1 className="details-title">{product.name}</h1>
          
          <div className="details-price-stock">
            <span className="details-price">${product.price.toFixed(2)}</span>
            <span className={`details-stock-badge ${product.stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
              {product.stock > 0 ? `${product.stock} items left` : 'Out of stock'}
            </span>
          </div>

          <p className="details-description">{product.description}</p>

          {product.stock > 0 ? (
            <div className="purchase-controls">
              {/* Quantity incrementer */}
              <div className="quantity-selector-container">
                <span className="qty-label">Quantity:</span>
                <div className="quantity-selector">
                  <button 
                    onClick={() => handleQuantityChange(-1)} 
                    disabled={quantity <= 1}
                    className="qty-btn"
                  >
                    -
                  </button>
                  <span className="qty-number">{quantity}</span>
                  <button 
                    onClick={() => handleQuantityChange(1)} 
                    disabled={quantity >= product.stock}
                    className="qty-btn"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart button */}
              <button onClick={handleAddToCart} className="btn btn-primary btn-add-cart">
                Add to Cart
              </button>

              {addedMessage && (
                <div className="alert alert-success added-alert">
                  {addedMessage}
                </div>
              )}
            </div>
          ) : (
            <div className="out-of-stock-msg">
              <p>We are currently out of stock for this item. Check back soon!</p>
              <button disabled className="btn btn-secondary btn-disabled">
                Out of Stock
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
