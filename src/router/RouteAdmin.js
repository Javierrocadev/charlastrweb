import React from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';
import { Navigate } from 'react-router-dom'; 

const RouteAdmin = ({ path, component }) => {
  const { isAuthenticated, role } = useContext(AuthContext);

  const handleRouteAccess = () => {
    if (isAuthenticated==false) {
      // Navigate to login page if user is not authenticated
      return <Navigate to="/login" />;
    }

    // Check if user has the required role for the route
    if (role !== 1) {
      // Navigate to a 403 page if user doesn't have the required role
      return <Navigate to="/403" />;
    }

    // Allow access to the route if user is authenticated and has the required role
    return component;
  };

  return handleRouteAccess();
};

export default RouteAdmin;