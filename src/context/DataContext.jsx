import React, { useEffect, createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [admins, setAdmins] = useState(() => {
        const savedAdmins = localStorage.getItem('admins');
        return savedAdmins ? JSON.parse(savedAdmins) : [];
    });

    const [loggedInUser, setLoggedInUser] = useState(null);
    
    useEffect(() => {
        localStorage.setItem('admins', JSON.stringify(admins));
    }, [admins]);


    const logInUser = (user) => {
        setLoggedInUser(user);
    };

    const logOutUser = () => {
        setLoggedInUser(null);
    };

    // Admin Management
    const addAdmin = (admin) => {
        setAdmins((prevAdmins) => [...prevAdmins, admin]);
    };

    const deleteAdmin = (id) => {
        setAdmins((prevAdmins) => prevAdmins.filter(admin => admin.id !== id));
    };

    return (
        <DataContext.Provider value={{ 
            admins, addAdmin, deleteAdmin,
            loggedInUser, logInUser, logOutUser
        }}>
            {children}
        </DataContext.Provider>
    );
};