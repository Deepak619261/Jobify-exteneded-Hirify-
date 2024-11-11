import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthWrapper = () => {
  const isAuthenticated = Boolean(localStorage.getItem("user"));
  console.log("AuthWrapper - isAuthenticated:", isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default AuthWrapper;
