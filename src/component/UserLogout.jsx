import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'
import '../assets/user-dashboard.css'

const UserLogout = () => {
    const navigate = useNavigate();
    const {logOutUser} = useContext(DataContext)
  
    const handleLogout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('email');
      logOutUser(); 
      
      navigate('/signin'); 
    };
  return (
    <div>
        <UserHeader/>
        <UserSidebar/>
        <div className="user-logout-container">
            <h1>Logout</h1>
            <p>Are you sure you want to logout?</p>
            <div className="user-button-container">
                <button onClick={handleLogout} className="user-logout-button">Yes, Logout</button>
                <button onClick={() => navigate(-1)} className="user-cancel-button">Cancel</button>
            </div>
        </div>
    </div>
  )
}

export default UserLogout