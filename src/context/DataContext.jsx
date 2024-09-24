
import React, {useEffect, createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState(()=>{
    const savedUsers = localStorage.getItem('users');
    return savedUsers ? JSON.parse(savedUsers) : [];
  });

  const [businesses, setBusinesses] = useState(()=>{
    const savedBusinesses = localStorage.getItem('businesses');
    return savedBusinesses ? JSON.parse(savedBusinesses) : [];
  });

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    localStorage.setItem('businesses', JSON.stringify(businesses));
  }, [businesses]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);
  
  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const addBusiness = (business) => {
    setBusinesses((prevBusinesses) => [...prevBusinesses, business]);
  };

  const logInUser = (user) => {
    setLoggedInUser(user);
  };
  return (
    <DataContext.Provider value={{ users, setUsers, businesses, setBusinesses, addUser, addBusiness, loggedInUser, logInUser }}>
      {children}
    </DataContext.Provider>
  );
};
