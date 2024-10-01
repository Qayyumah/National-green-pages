import React from 'react'
import { Navigate } from 'react-router-dom'
import Dashboard from './Dashboard'

const isAuthenticated = () => {
    return localStorage.getItem('token')
}

const AdminPrivateRoute = () => {
    if (!isAuthenticated()) {
        return <Navigate to="/admin"/>;
      }
      return <Dashboard />;
}
 
export default AdminPrivateRoute