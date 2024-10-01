// src/components/Header.js
import React, { useContext } from 'react';
import '../assets/dashboard.css'
import { Link } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const AdminHeader = () => {
  const {loggedInUser} = useContext(DataContext)

  return (
    <header className="header">
    <h1>Admin Dashboard</h1>
      <div className='header-search-input'>
      <form className='search-menu'>
        <input type="text" className="search-input" placeholder="search-businesses"/>
      </form>
      </div>
      <div className="header-right">
        <h3>WELCOME! {loggedInUser ? loggedInUser.email : null}</h3>
        <Link to='/'>view site</Link>
      </div>
    </header>
  );
};

export default AdminHeader;

