import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

const Cart = ({ cartItems, onUpdateQuantity, onRemoveFromCart, loadingCart }) => {
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  // Calculate prices
  const subtotal = cartItems.reduce((acc, item) => {
    if (item.productId) {
      return acc + item.productId.price * item.quantity;
    }
    return acc;
  }, 0);

  const shipping = subtotal > 100 || subtotal === 0 ? 0 : 15.0;
  const total = subtotal + shipping;

  const handleQtyChange = (productId, currentQty, amount, maxStock) => {
    const nextQty = currentQty + amount;
    if (nextQty >= 1 && nextQty <= maxStock) {
      onUpdateQuantity(productId, nextQty);
    }
  };

  const handleCheckout = () => {
    setCheckoutSuccess(true);
    // In a real app we'd trigger order API. Here we just show success.
  };

  if (loadingCart) {
    return <div className="cart-page-spinner">Loading your shopping cart...</div>;
  }

  if (checkoutSuccess) {
    return (
      <div className="container cart-success-page">
        <div className="success-card">
          <span className="success-icon">🎉</span>
          <h2>Order Placed Successfully!</h2>
          <p>Thank you for shopping with ChicCart. Your mock order has been registered.</p>
          <Link to="/products" className="btn btn-primary" onClick={() => setCheckoutSuccess(false)}>
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page container">
      <div className="page-header">
        <h1>Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="empty-cart-container">
          <span className="empty-cart-icon">🛒</span>
          <h2>Your Cart is Empty</h2>
          <p>Looks like you haven't added anything to your cart yet.</p>
          <Link to="/products" className="btn btn-primary">
            Explore Products
          </Link>
        </div>
      ) : (
        <div className="cart-content-grid">
          {/* Items List */}
          <div className="cart-items-list">
            {cartItems.map((item) => {
              const product = item.productId;
              if (!product) return null; // Safe fallback if product was deleted

              return (
                <div key={item._id} className="cart-item-row">
                  <div className="cart-item-image">
                    <img src={product.image} alt={product.name} />
                  </div>

                  <div className="cart-item-details">
                    <Link to={`/products/${product._id}`} className="cart-item-title">
                      {product.name}
                    </Link>
                    <span className="cart-item-category">{product.category}</span>
                    <span className="cart-item-price">${product.price.toFixed(2)} each</span>
                  </div>

                  <div className="cart-item-actions-qty">
                    <div className="cart-quantity-selector">
                      <button
                        onClick={() => handleQtyChange(product._id, item.quantity, -1, product.stock)}
                        disabled={item.quantity <= 1}
                        className="qty-arrow"
                      >
                        -
                      </button>
                      <span className="qty-val">{item.quantity}</span>
                      <button
                        onClick={() => handleQtyChange(product._id, item.quantity, 1, product.stock)}
                        disabled={item.quantity >= product.stock}
                        className="qty-arrow"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => onRemoveFromCart(product._id)}
                      className="btn btn-danger btn-remove-item"
                    >
                      Remove
                    </button>
                  </div>

                  <div className="cart-item-subtotal">
                    <span>Subtotal</span>
                    <h4>${(product.price * item.quantity).toFixed(2)}</h4>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Checkout Summary panel */}
          <div className="cart-summary-panel">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
            </div>
            {shipping > 0 && (
              <div className="shipping-hint">
                Add <strong>${(100 - subtotal).toFixed(2)}</strong> more to unlock FREE shipping!
              </div>
            )}
            <hr className="summary-divider" />
            <div className="summary-row total-row">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className="btn btn-primary btn-block btn-checkout">
              Proceed to Checkout
            </button>
            <div className="checkout-trust-badge">
              🔒 Secure SSL Encrypted Checkout
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
