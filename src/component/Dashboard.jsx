import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import DashboardCards from './DashboardCards';
import axios from 'axios';

const Dashboard = () => {
  const [isValidToken, setIsValidToken] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      verifyToken(storedToken);
    } else {
      navigate('/admin');
    }
  }, [navigate]);

  const verifyToken = async (token) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/verify-admin-token/${token}`);
      if (response.status === 200) {
        setIsValidToken(true);
      } else {
        navigate('/admin');
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      navigate('/admin');
    }
  };

  if (!isValidToken) {
    return null; // Prevent rendering until the token verification is complete
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

 
