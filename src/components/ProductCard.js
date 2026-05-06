import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1000);
  };

  return (
    <div className="product-card">
      {/* Category Label */}
      <div className="card-image-box">
        <span className="card-category">{product.category}</span>
        <img src={product.image} alt={product.title} className="card-image" />
      </div>

      {/* Product Info */}
      <div className="card-info">
        <h3 className="card-title">{product.title}</h3>
        <p className="card-description">{product.description}</p>
        {product.rating && (
          <div className="card-rating">
            <span className="stars">
              {'★'.repeat(Math.round(product.rating.rate))}
              {'☆'.repeat(5 - Math.round(product.rating.rate))}
            </span>
            <span className="rating-text">
              {product.rating.rate} ({product.rating.count})
            </span>
          </div>
        )}
      </div>

      {/* Price and Add Button */}
      <div className="card-footer">
        <span className="card-price">${product.price.toFixed(2)}</span>
        <button
          className={`add-btn ${added ? 'added' : ''}`}
          onClick={handleAddToCart}
        >
          {added ? '✓ Added' : '+ Add'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
