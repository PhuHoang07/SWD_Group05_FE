import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token') !== null;
  const user = JSON.parse(localStorage.getItem('user'));
  const isAdmin = user && user.role === 'Admin';

  if (isAuthenticated) {
    if (isAdmin) {
      return <Route {...rest} element={element} />;
    } else {
      return <Navigate to="/404-notfound" replace />;
    }
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default ProtectedRoute;
