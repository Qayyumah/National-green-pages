import React, { useState } from 'react';
import axios from 'axios';
import '../assets/add-admin.css';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const AddAdmin = () => {
    
    const [message, setMessage] = useState('');
    
    const schema = yup.object().shape({
        email: yup.string().email('Email is not valid').required('Email is required!'),
        password: yup.string().required('Required')
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });
    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admins');
            setMessage('Admin created successfully!');
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
            <form onSubmit={handleSubmit(submit)} className="admin-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="text"
                        {...register('email')}
                    />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input
                        type="password"
                        {...register('password')}
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

