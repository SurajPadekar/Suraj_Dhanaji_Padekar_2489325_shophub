import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './CartPage.css';

const CartPage = () => {
  const { items, itemCount, subtotal, tax, total, updateQty, removeItem } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Breadcrumb */}
        <div className="breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <span>Shopping Cart</span>
        </div>

        <h1 className="cart-title">Your Cart</h1>
        <p className="cart-subtitle">
          {itemCount > 0
            ? `${itemCount} item${itemCount !== 1 ? 's' : ''} in your cart`
            : 'Your cart is empty'}
        </p>

        {/* If cart is empty */}
        {items.length === 0 ? (
          <div className="empty-cart">
            <div className="empty-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products yet.</p>
            <Link to="/products" className="shop-btn">← Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-content">
            {/* Cart Items */}
            <div className="cart-items">
              {items.map((item) => (
                <div key={item.product.id} className="cart-item">
                  <img
                    src={item.product.image}
                    alt={item.product.title}
                    className="item-image"
                  />
                  <div className="item-info">
                    <h3 className="item-name">{item.product.title}</h3>
                    <p className="item-category">{item.product.category}</p>
                    <span className="item-price">${item.product.price.toFixed(2)}</span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="qty-controls">
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.product.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-btn"
                      onClick={() => updateQty(item.product.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>

                  <span className="item-total">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>

                  <button
                    className="remove-btn"
                    onClick={() => removeItem(item.product.id)}
                  >
                    Remove
                  </button>
                </div>
              ))}

              <Link to="/products" className="continue-link">← Continue Shopping</Link>
            </div>

            {/* Order Summary */}
            <div className="order-summary">
              <h2 className="summary-title">Order Summary</h2>

              <div className="summary-row">
                <span>Subtotal ({itemCount} items)</span>
                <span className="summary-value">${subtotal.toFixed(2)}</span>
              </div>
              <div className="summary-row">
                <span>Shipping</span>
                <span className="free-text">FREE</span>
              </div>
              <div className="summary-row">
                <span>Tax (estimated)</span>
                <span className="summary-value">${tax.toFixed(2)}</span>
              </div>
              <div className="summary-row total-row">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>

              {/* Promo Code */}
              <div className="promo-section">
                <p className="promo-label">Promo code</p>
                <div className="promo-input-group">
                  <input type="text" placeholder="Enter code" className="promo-input" />
                  <button className="promo-btn">Apply</button>
                </div>
              </div>

              <button className="checkout-btn">Proceed to Checkout</button>

              <p className="secure-text">🔒 Secure checkout · 256-bit SSL</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
