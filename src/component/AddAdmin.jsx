import React, { useState } from 'react';
import axios from 'axios';
import '../assets/add-admin.css';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const AddAdmin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admins', { username, password });
            setMessage('Admin created successfully!');
            setUsername('');
            setPassword('');
        } catch (error) {
            setMessage('Error creating admin');
        }
    };

    return (
        <div>
        <AdminHeader/>
        <AdminSidebar/>
        <div className="add-admin-container">
            <h2>Add Admin</h2>
            <form onSubmit={handleSubmit} className="admin-form">
                <div className="form-group">
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="submit-button">Create Admin</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
        </div>
    );
};

export default AddAdmin;

