import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode"; // To decode the JWT token

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token); // Decode the token
        if (decodedToken.exp < Date.now() / 1000) {
          // Token has expired
          logout();
        } else {
          // Token is valid, set admin data
          setAdmin({ token, user: decodedToken });
        }
      } catch (err) {
        // console.error("Invalid token:", err);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token) => {
    const decodedToken = jwtDecode(token);
    if (decodedToken.exp < Date.now() / 1000) {
      logout(); // If token is expired
    } else {
      localStorage.setItem("accessToken", token);
      setAdmin({ token, user: decodedToken });
      navigate("/admin-panel");
    }
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAdmin(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
