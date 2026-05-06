import React, { useState, useEffect } from 'react';
import { replace, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  
  if (isAuthenticated) {
      navigate('/', { replace: true });
    //  navigate('/products',{replace: true});
    return null;
  }


  // validate form fields
  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Enter a valid email.';
    }
    if (!password) {
      newErrors.password = 'Password is required.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoginError('');

    if (!validate()) return;

    const result = login(email, password);
    if (result.success) {
      navigate('/', { replace: true });
    } else {
      setLoginError(result.message);
    }
  };

  return (
    <div className="login-page">
      {/* Left Side - Brand Section */}
      <div className="login-brand">
        <div className="brand-logo">
          <span className="brand-icon">S</span>
          <span>ShopHub</span>
        </div>
        <h1 className="brand-heading">
          Discover.<br />Shop. Smile.
        </h1>
        <p className="brand-text">
          Thousands of products. One beautiful portal. Sign in to start shopping.
        </p>
        <div className="brand-line"></div>
      </div>

      {/* Right Side - Login Form */}
      <div className="login-form-section">
        <div className="login-form-box">
          <h2 className="form-title">Welcome back</h2>
          <p className="form-subtitle">Sign in to continue to your account</p>

          {loginError && <div className="error-box">{loginError}</div>}

          <form onSubmit={handleSubmit}>
            {/* Email Field */}
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={errors.email ? 'input-error' : ''}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={errors.password ? 'input-error' : ''}
              />
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            {/* Remember + Forgot */}
            <div className="form-options">
              <label className="remember-label">
                <input type="checkbox" /> Remember me
              </label>
              <a href="#" className="forgot-link">Forgot password?</a>
            </div>

            <button type="submit" className="login-btn">Sign In</button>
          </form>

          <div className="divider"><span>Or</span></div>

          <p className="signup-text">
            Don't have an account? <a href="#">Sign up</a>
          </p>

          <div className="demo-hint">
            Try credentials: <strong>demo@shop.com</strong> / <strong>demo123</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
