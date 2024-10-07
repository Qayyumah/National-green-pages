import React, { useEffect, useState } from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import DashboardCards from './DashboardCards';
import axios from 'axios';

const Dashboard = () => {
  const [token, setToken] = useState(null);
  const [isValidToken, setIsValidToken] = useState(false);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      verifyToken(storedToken);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify-admin-token/${token}`);
      if (response.status === 200) {
        setIsValidToken(true);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
    }
  };

  if (!isValidToken) {
    return <div>Please log in to access the dashboard.</div>;
  }

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className='dashboard-container'>
        <h1>Welcome to the admin dashboard!</h1>
      </div>
      <DashboardCards />
    </div>
  );
};

export default Dashboard;
 
