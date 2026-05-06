import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

// custom hook
export function useCart() {
  return useContext(CartContext);
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });

  // save to localStorage whenever items change
  function saveCart(newItems) {
    localStorage.setItem('cart', JSON.stringify(newItems));
    setItems(newItems);
  }

  function addItem(product) {
    const existing = items.find(item => item.product.id === product.id);
    if (existing) {
      // already in cart - increase quantity
      const updated = items.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      saveCart(updated);
    } else {
      // new item
      saveCart([...items, { product, quantity: 1 }]);
    }
  }

  function removeItem(productId) {
    const updated = items.filter(item => item.product.id !== productId);
    saveCart(updated);
  }

  function updateQty(productId, qty) {
    if (qty < 1) {
      removeItem(productId);
      return;
    }
    const updated = items.map(item =>
      item.product.id === productId ? { ...item, quantity: qty } : item
    );
    saveCart(updated);
  }

  // calculate totals
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <CartContext.Provider value={{ items, itemCount, subtotal, tax, total, addItem, removeItem, updateQty }}>
      {children}
    </CartContext.Provider>
  );
}
