import React, { useState, useEffect } from 'react';
import ProductCard from '../../components/ProductCard/ProductCard';
import './Products.css';

function Products() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // fetch products on page load
  useEffect(() => {
    async function loadProducts() {
      try {
        setLoading(true);
        const res = await fetch('https://fakestoreapi.com/products');
        if (!res.ok) throw new Error('Failed to fetch products');
        const data = await res.json();
        setProducts(data);

        // get unique categories from products
        const cats = [...new Set(data.map(p => p.category))];
        setCategories(cats);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    loadProducts();
  }, []);

  // filter products by category
  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="error">⚠️ {error}</div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-layout">
        {/* Sidebar */}
        <aside className="sidebar">
          <h4 className="sidebar-heading">Category</h4>
          <button
            className={selectedCategory === 'all' ? 'cat-btn active' : 'cat-btn'}
            onClick={() => setSelectedCategory('all')}
          >
            All Products
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              className={selectedCategory === cat ? 'cat-btn active' : 'cat-btn'}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}

          {/* Price Range - visual only */}
          <h4 className="sidebar-heading" style={{ marginTop: '20px' }}>Price Range</h4>
          <input type="range" min="0" max="1000" defaultValue="1000" className="price-slider" />
          <div className="price-labels">
            <span>$0</span>
            <span>$1000</span>
          </div>

          {/* Sort By - visual only */}
          <h4 className="sidebar-heading" style={{ marginTop: '20px' }}>Sort By</h4>
          <select className="sort-select">
            <option>Default</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </aside>

        {/* Main content */}
        <main className="main-content">
          <h1 className="page-title">
            All Products <span className="count">Showing {filteredProducts.length} of {products.length} results</span>
          </h1>

          {filteredProducts.length === 0 ? (
            <p className="empty">No products found.</p>
          ) : (
            <div className="product-grid">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default Products;
