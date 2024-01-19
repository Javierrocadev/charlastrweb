import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const RouteProfesor = ({ path, component }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const handleRouteAccess = () => {
      if (role === null || !isAuthenticated) {
        // Navigate to the login page if the user is not authenticated or the role is null
        setRedirectPath("/login");
      } else if (role !== 2) {
        // Navigate to a 403 page if the user doesn't have the required role
        setRedirectPath("/403");
      }
    };

    handleRouteAccess();
  }, [isAuthenticated, role]);

  if (redirectPath) {
    // If 'redirectPath' is set, navigate to the specified route
    return <Navigate to={redirectPath} />;
  }

  // If no redirection is needed, render the component
  return component;
};

export default RouteProfesor;