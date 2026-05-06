import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');

  // if already logged in go to products
  useEffect(()=>{
     if (isAuthenticated) {
    navigate('/products', { replace: true });
    //return null;
  }
  },[isAuthenticated, navigate])
  

  function validate() {
    const errs = {};
    if (!email.trim()) errs.email = 'Email is required.';
    if (!password) errs.password = 'Password is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    setLoginError('');
    if (!validate()) return;

    const result = login(email, password);
    if (result.success) {
      navigate('/products', { replace: true });
    } else {
      setLoginError(result.message);
    }
  }

  return (
    <div className="login-page">
      {/* Left - brand panel */}
      <div className="brand-panel">
        <div className="brand-logo">S ShopHub</div>
        <h1>Discover.<br />Shop. Smile.</h1>
        <p>Thousands of products. One beautiful portal.<br />Sign in to start shopping.</p>
      </div>

      {/* Right - form panel */}
      <div className="form-panel">
        <div className="form-box">
          <h2>Welcome back</h2>
          <p className="form-sub">Sign in to continue to your account</p>

          {loginError && <div className="error-msg">{loginError}</div>}

          <form onSubmit={handleSubmit}>
            <label>Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            {errors.email && <span className="field-err">{errors.email}</span>}

            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            {errors.password && <span className="field-err">{errors.password}</span>}

            <div className="form-row">
              <label className="remember"><input type="checkbox" /> Remember me</label>
              <span className="forgot">Forgot password?</span>
            </div>

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <p className="or-text">— Or —</p>
          <p className="signup-text">Don't have an account? <strong>Sign up</strong></p>

          <div className="demo-box">
            Try: <strong>demo@shop.com</strong> / <strong>demo123</strong>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
