import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar/Navbar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import Login from './pages/Login/Login';
import Products from './pages/Products/Products';
import Cart from './pages/Cart/Cart';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Routes>
            {/* Login is the first page */}
            {/* <Route path="/" element={<Navigate to="/login" replace />} /> */}
            <Route path="/login" element={<Login />} />

            {/* Products page with navbar */}
            <Route path="/products" element={<><Navbar /><Products /></>} />

            {/* Cart is protected - needs login */}
            <Route element={<ProtectedRoute />}>
              <Route path="/cart" element={<><Navbar /><Cart /></>} />
            </Route>

            {/* anything else goes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
