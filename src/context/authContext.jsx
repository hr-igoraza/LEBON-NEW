import React, { createContext, useState, useEffect, useContext } from "react";
import {jwtDecode} from "jwt-decode"; 
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      const decoded = jwtDecode(token);
      setAdmin(decoded.user);
    }
  }, []);

  const login = (accessToken) => {
    localStorage.setItem("accessToken", accessToken);
    const decoded = jwtDecode(accessToken);
    setAdmin(decoded.user);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAdmin(null);
  };

  const isAuthenticated = !!admin;

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Create a custom hook to use the AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
