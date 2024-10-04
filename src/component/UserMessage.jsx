import React, { useContext, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import UserHeader from './UserHeader';
import UserSidebar from './UserSidebar';

const UserMessage = () => {
  const { message, clearMessage } = useContext(DataContext);

  console.log("Current message:", message);
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        clearMessage();
      }, 3000);
      return () => clearTimeout(timer); 
    }
  }, [message, clearMessage]);

  return (
    <div>
    <UserHeader/>
    <UserSidebar/>
        <h1>Hello</h1>
        {message}
    </div>
  );
};

export default UserMessage;
