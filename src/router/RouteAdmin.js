// import React from 'react';
// import { useContext } from 'react';
// import { AuthContext } from '../contexts/authContext';
// import { Navigate } from 'react-router-dom';

// const RouteAdmin = ({ path, component }) => {
//   const { isAuthenticated, role } = useContext(AuthContext);
//   const roleLocal = localStorage.getItem('role');
//   const handleRouteAccess = () => {
//     if (roleLocal === null) {
//       // Navigate to a 403 page if user doesn't have the required role
//       console.log("aaaaaaaaaaaaaaaaaa")
//       return <Navigate to="/403" />;

//     }

//     if (isAuthenticated==false) {
//       // Navigate to login page if user is not authenticated
//       return <Navigate to="/login" />;
//     }

//     // Check if user has the required role for the route
//     if (role !== 1) {
//       // Navigate to a 403 page if user doesn't have the required role
//       return <Navigate to="/403" />;
//     }

//     // Allow access to the route if user is authenticated and has the required role
//     return component;
//   };

//   return handleRouteAccess();
// };

// export default RouteAdmin;
import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/authContext";
import { Navigate } from "react-router-dom";

const RouteAdmin = ({ path, component }) => {
  const { isAuthenticated, role } = useContext(AuthContext);
  const [redirectPath, setRedirectPath] = useState(null);

  useEffect(() => {
    const handleRouteAccess = () => {
      // const token = localStorage.getItem('token');
      // const role = localStorage.getItem('role');
      if (role === null || !isAuthenticated) {
        // Navigate to the login page if the user is not authenticated or the role is null
        setRedirectPath("/login");
      } else if (role !== 1) {
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

export default RouteAdmin;
