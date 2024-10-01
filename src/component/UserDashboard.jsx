import React from 'react'
import UserHeader from './UserHeader'
import UserSidebar from './UserSidebar'
import UserCards from './UserCards';


const UserDashboard = () => {
  return (
    <div>
      <UserHeader/>
      <UserSidebar/>
        <div className='user-dashboard-container'>
          <h1>Welcome to the your dashboard!</h1>
        </div>
      <UserCards/>
    </div>
  );
};


export default UserDashboard