import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) return <p>Loading...</p>;

  // Check if admin is null or if there's no token in localStorage
  if (!localStorage.getItem("accessToken")) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
