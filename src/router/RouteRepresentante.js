import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const RouteRepresentante = ({ path, component }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    const handleRouteAccess = () => {
      console.log(role);
      if (role === null) {
        // Navigate to a 403 page if the user doesn't have the required role
        setRedirectTo("/login");
      }
       else if (!isAuthenticated) {
        // Navigate to the login page if the user is not authenticated
        setRedirectTo("/login");
      } 
      else if (role !== 4) {
        // Navigate to a 403 page if the user doesn't have the required role
        setRedirectTo("/403");
      }
    };

    handleRouteAccess();
  }, [isAuthenticated, role]);

  if (redirectTo) {
    // If 'redirectTo' is set, navigate to the specified route
    return <Navigate to={redirectTo} />;
  }

  // If no redirection is needed, render the component
  return component;
};

export default RouteRepresentante;