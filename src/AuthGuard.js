import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const AuthGuard = ({ children, requiredRole }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      try {
        const decodedToken = jwtDecode(token);

        if (requiredRole && decodedToken.role !== requiredRole) {
          navigate("/");
          return;
        }

        setIsAuthenticated(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error.message);
        navigate("/LogIn");
      }
    } else {
      setIsAuthenticated(false);
      navigate("/LogIn");
    }
  }, [navigate, requiredRole]);

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
