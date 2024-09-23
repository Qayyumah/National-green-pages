import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Dashboard from './Dashboard';

const isAuthenticated = () => {
  return localStorage.getItem('token')
};

const AdminRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/admin"/>;
  }
  return <Dashboard/>
};

export default AdminRoute;