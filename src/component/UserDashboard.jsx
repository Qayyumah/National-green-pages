import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';
import UserCards from './UserCards';
import '../assets/user-dashboard.css'

const UserDashboard = () => {
    const { loggedInUser } = useContext(DataContext);
    const userName = loggedInUser ? loggedInUser.name || loggedInUser.email : '';

    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className='user-dashboard-container'>
                <h1>Welcome to your dashboard! {userName}</h1>
            </div>
            <UserCards />
        </div>
    );
};

export default UserDashboard;