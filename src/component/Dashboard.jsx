import React from 'react';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import DashboardCards from './DashboardCards'

const Dashboard = () => {
  return (
    <div>
    <AdminHeader/>
    <AdminSidebar/>
      <div className='dashboard-container'>
        <h1>Welcome to the admin dashboard!</h1>
      </div>
    <DashboardCards/>
    </div>
  );
};

export default Dashboard;
