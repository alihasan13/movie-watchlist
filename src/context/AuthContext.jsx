import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Context
const AuthContext = createContext();

// Custom Hook to use Auth Context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is already logged in (from localStorage)
  useEffect(() => {
    const storedUser = localStorage.getItem('movieapp_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = (email, password) => {
    // Mock authentication - in production, call Firebase or your backend
    const mockUser = { 
      id: email, 
      email, 
      name: email.split('@')[0] 
    };
    
    setUser(mockUser);
    localStorage.setItem('movieapp_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  // Signup function
  const signup = (email, password, name) => {
    const mockUser = { id: email, email, name };
    setUser(mockUser);
    localStorage.setItem('movieapp_user', JSON.stringify(mockUser));
    return Promise.resolve(mockUser);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('movieapp_user');
  };

  const value = {
    user,
    login,
    signup,
    logout,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};