import React, { useState } from 'react';
import { useCart } from '../../context/CartContext';
import './ProductCard.css';

function ProductCard({ product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  function handleAdd() {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  }

  return (
    <div className="product-card">
      <div className="card-img-box">
        <span className="card-category">{product.category}</span>
        <img src={product.image} alt={product.title} className="card-img" />
      </div>
      <div className="card-body">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-desc">{product.description}</p>
        {product.rating && (
          <p className="card-rating">⭐ {product.rating.rate} ({product.rating.count})</p>
        )}
      </div>
      <div className="card-bottom">
        <span className="card-price">${product.price.toFixed(2)}</span>
        <button className={added ? 'add-btn added' : 'add-btn'} onClick={handleAdd}>
          {added ? '✓ Added' : '+ Add'}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
