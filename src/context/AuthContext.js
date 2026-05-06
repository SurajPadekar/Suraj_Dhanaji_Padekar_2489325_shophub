import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// custom hook
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('token') ? true : false
  );
  const [user, setUser] = useState(
    localStorage.getItem('token') ? { email: 'demo@shop.com' } : null
  );

  function login(email, password) {
    // hardcoded credentials check
    if (email === 'demo@shop.com' && password === 'demo123') {
      localStorage.setItem('token', 'fake-token-123');
      setIsAuthenticated(true);
      setUser({ email });
      return { success: true };
    }
    return { success: false, message: 'Invalid email or password' };
  }

  function logout() {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
