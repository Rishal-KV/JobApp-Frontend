import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

function isLoggedOut({ children }) {
  const token = localStorage.getItem('Token');

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role; // Assuming the role is stored in the token

      if (role === 'admin') {
        return <Navigate to="/admin/jobs" />;
      } else if (role === 'user') {
        return <Navigate to="/user/jobs" />;
      }
    } catch (error) {
      console.error('Invalid token:', error);
      // Optionally, you could remove the invalid token
      localStorage.removeItem('Token');
    }
  }

  // If no token is found or the token is invalid, render the children (i.e., public routes)
  return children;
}

export default isLoggedOut;
