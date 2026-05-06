import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import './Cart.css';

function Cart() {
  const { items, itemCount, subtotal, tax, total, updateQty, removeItem } = useCart();

  return (
    <div className="cart-page">
      <div className="cart-container">
        {/* Breadcrumb */}
        <p className="breadcrumb">
          <Link to="/products">Home</Link> / Shopping Cart
        </p>

        <h1 className="cart-heading">Your Cart</h1>
        <p className="cart-sub">{itemCount} item{itemCount !== 1 ? 's' : ''} in your cart</p>

        {items.length === 0 ? (
          <div className="empty-cart">
            <p>🛒 Your cart is empty</p>
            <Link to="/products" className="shop-link">Continue Shopping</Link>
          </div>
        ) : (
          <div className="cart-grid">
            {/* Left - items */}
            <div className="cart-items">
              {items.map(item => (
                <div key={item.product.id} className="cart-row">
                  <img src={item.product.image} alt={item.product.title} className="cart-img" />
                  <div className="cart-info">
                    <h3>{item.product.title}</h3>
                    <p className="cart-cat">{item.product.category}</p>
                    <p className="cart-unit-price">${item.product.price.toFixed(2)}</p>
                  </div>
                  <div className="qty-box">
                    <button onClick={() => updateQty(item.product.id, item.quantity - 1)}>−</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.product.id, item.quantity + 1)}>+</button>
                  </div>
                  <span className="line-total">${(item.product.price * item.quantity).toFixed(2)}</span>
                  <button className="remove-btn" onClick={() => removeItem(item.product.id)}>Remove</button>
                </div>
              ))}
              <Link to="/products" className="cont-shopping">← Continue Shopping</Link>
            </div>

            {/* Right - order summary */}
            <div className="order-summary">
              <h2>Order Summary</h2>
              <div className="summary-line"><span>Subtotal ({itemCount} items)</span><span>${subtotal.toFixed(2)}</span></div>
              <div className="summary-line"><span>Shipping</span><span className="free">FREE</span></div>
              <div className="summary-line"><span>Tax (estimated)</span><span>${tax.toFixed(2)}</span></div>
              <div className="summary-line total"><span>Total</span><span>${total.toFixed(2)}</span></div>
              <button className="checkout-btn">Proceed to Checkout</button>
              <p className="secure">🔒 Secure checkout</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
