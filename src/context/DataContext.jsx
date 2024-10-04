
import React, { useEffect, createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [businesses, setBusinesses] = useState(() => {
        const savedBusinesses = localStorage.getItem('businesses');
        return savedBusinesses ? JSON.parse(savedBusinesses) : [];
    });

    const [admins, setAdmins] = useState(() => {
        const savedAdmins = localStorage.getItem('admins');
        return savedAdmins ? JSON.parse(savedAdmins) : [];
    });

    const [loggedInUser, setLoggedInUser] = useState(null);
    const [message, setMessage] = useState(''); 

    useEffect(() => {
        localStorage.setItem('businesses', JSON.stringify(businesses));
    }, [businesses]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('admins', JSON.stringify(admins));
    }, [admins]);

    

    const approveBusiness = (id) => {
        setBusinesses((prevBusinesses) =>
            prevBusinesses.map((business) =>
                business.id === id ? { ...business, status: 'approved' } : business
            )
        );
        setMessage('Your Business has been Approved!');
    };

    const rejectBusiness = (id) => {
        setBusinesses((prevBusinesses) =>
            prevBusinesses.map((business) =>
                business.id === id ? { ...business, status: 'rejected' } : business
            )
        );
        setMessage('Your Business has been Rejected!');
    };

    const clearMessage = () => {
        setMessage("");
    }

    const updateMessage = (newMessage) => {
        setMessage(newMessage);
      };

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
            users, setUsers, 
            businesses, setBusinesses, 
            approveBusiness, rejectBusiness, 
            message, clearMessage,updateMessage,
            admins, addAdmin, deleteAdmin,
            loggedInUser, logInUser, logOutUser
        }}>
            {children}
        </DataContext.Provider>
    );
};