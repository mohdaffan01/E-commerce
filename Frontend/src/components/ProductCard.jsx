import React from 'react';
import { Link } from 'react-router-dom';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart, isAuthenticated }) => {
  const { _id, name, price, image, category, stock, tag } = product;

  return (
    <div className="product-card">
      <div className="product-card-image">
        {tag && (
          <div className={`product-card-badge-diagonal ${tag.toLowerCase().includes('new') ? 'badge-new' : 'badge-sale'}`}>
            {tag}
          </div>
        )}
        <img src={image} alt={name} loading="lazy" />
        <span className="product-card-category">{category}</span>
      </div>

      <div className="product-card-info">
        <Link to={`/products/${_id}`} className="product-card-title-link">
          <h3 className="product-card-title">{name}</h3>
        </Link>
        
        <div className="product-card-meta">
          <span className="product-card-price">${price.toFixed(2)}</span>
          <span className={`product-card-stock ${stock > 0 ? 'in-stock' : 'out-of-stock'}`}>
            {stock > 0 ? `${stock} in stock` : 'Out of stock'}
          </span>
        </div>

        <div className="product-card-actions">
          {stock > 0 ? (
            <button
              onClick={() => onAddToCart(_id)}
              className="btn btn-primary btn-block"
            >
              Add to Cart
            </button>
          ) : (
            <button className="btn btn-secondary btn-block" disabled style={{ cursor: 'not-allowed', opacity: 0.6 }}>
              Out of Stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
