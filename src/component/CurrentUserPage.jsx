import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext'; // Adjust the import path as necessary
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/signIn.css'; // Import the CSS file

const CurrentUserPage = () => {
  const { loggedInUser } = useContext(DataContext);

  return (
    <div className="page-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="main-content">
        <h1>Current User</h1>
        {loggedInUser ? (
          <p className="logged-in">Logged in as: {loggedInUser.email}</p>
        ) : (
          <p className="no-user">No user currently signed in.</p>
        )}
      </div>
    </div>
  );
};

export default CurrentUserPage;
