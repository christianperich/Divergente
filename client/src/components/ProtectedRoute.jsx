import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const protectedRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("api/user-info", {
          withCredentials: true,
        });
        setIsAuthenticated(true);
        setUser(response.data);
      } catch (err) {
        console.log("Error de autenticación:", err);
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    return <h2>Cargando...</h2>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <>{children && React.cloneElement(children, { user })}</>;
};

export default protectedRoute;
