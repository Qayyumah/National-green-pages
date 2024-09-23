
import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const [businesses, setBusinesses] = useState([]);

  const addUser = (user) => {
    setUsers((prevUsers) => [...prevUsers, user]);
  };

  const addBusiness = (business) => {
    setBusinesses((prevBusinesses) => [...prevBusinesses, business]);
  };

  return (
    <DataContext.Provider value={{ users, businesses, addUser, addBusiness }}>
      {children}
    </DataContext.Provider>
  );
};
