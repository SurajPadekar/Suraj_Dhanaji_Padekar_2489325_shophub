import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // filter states
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('default');

  // fetch products and categories on page load
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [prodRes, catRes] = await Promise.all([
          fetch('https://fakestoreapi.com/products'),
          fetch('https://fakestoreapi.com/products/categories'),
        ]);

        if (!prodRes.ok) throw new Error('Failed to load products');

        const prodData = await prodRes.json();
        const catData = await catRes.json();

        setProducts(prodData);
        setCategories(catData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // filter and sort products
  const getFilteredProducts = () => {
    let filtered = [...products];

    // category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    // search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      );
    }

    // price filter
    filtered = filtered.filter((p) => p.price <= maxPrice);

    // sorting
    if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();

  // show loading spinner
  if (loading) {
    return (
      <div className="products-page">
        <div className="loading-box">
          <div className="spinner"></div>
          <p>Loading products...</p>
        </div>
      </div>
    );
  }

  // show error
  if (error) {
    return (
      <div className="products-page">
        <div className="error-state">
          <p>⚠️ {error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-layout">
        {/* Sidebar Filters */}
        <aside className="filters-sidebar">
          <div className="filter-group">
            <h4 className="filter-heading">Category</h4>
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h4 className="filter-heading">Price Range</h4>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="price-slider"
            />
            <div className="price-labels">
              <span>$0</span>
              <span>${maxPrice}</span>
            </div>
          </div>

          <div className="filter-group">
            <h4 className="filter-heading">Sort by</h4>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="default">Default</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </aside>

        {/* Products Grid */}
        <main className="products-main">
          <div className="products-header">
            <h1 className="products-title">
              All Products
              <span className="products-count">
                Showing {filteredProducts.length} of {products.length} results
              </span>
            </h1>
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="products-search"
            />
          </div>

          {filteredProducts.length === 0 ? (
            <div className="empty-state">
              <p>🔍 No products found matching your filters.</p>
            </div>
          ) : (
            <div className="products-grid">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;
