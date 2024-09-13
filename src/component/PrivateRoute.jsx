import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import PostBusiness from './PostBusiness';

const isAuthenticated = () => {
  return localStorage.getItem('token')
};

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/signin"/>;
  }
  return <PostBusiness />;
};

export default PrivateRoute;
