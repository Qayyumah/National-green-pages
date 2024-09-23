// src/components/Header.js
import React from 'react';
import '../assets/dashboard.css'
import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <header className="header">
      <h1>Admin Dashboard</h1>
      <div className="header-right">
        <h3>WELCOME! admin@admin.com</h3>
        <Link to='/'>view site</Link>
      </div>
    </header>
  );
};

export default AdminHeader;

