import React, { useState, useContext } from 'react';
import '../assets/dashboard.css';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { DataContext } from '../context/DataContext';

const AdminLogin = () => {
  const { logInUser, addAdmin } = useContext(DataContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState(''); 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const handleLogin = (data) => {
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin/`, data)
      .then((response) => {
        console.log(response)
        localStorage.setItem('token', response.data['key']);
        const admin = { id: Date.now(), username: data.email, status: 'active' }; 
        logInUser(admin);
        addAdmin(admin);
        setModalMessage('You have successfully logged in');
        setModalType('success');
        setIsLoggedIn(true);
      })
      .catch((error) => {
        setModalMessage(error.message);
        setModalType('error');
      })
      .finally(() => {
        setIsModalOpen(true); 
      });
  };

  // if (isLoggedIn) {
  //   return <Navigate to='/dashboard' replace={true} />;
  // }

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className='login-box-header'>
          <img src='/images/header-logo.jpg' alt="Header Logo" />
        </div>
        
        <form onSubmit={handleSubmit(handleLogin)} className="login-form">
          <input
            type="email"
            placeholder="Email"
            name='email'
            {...register('email')}
          />

          <input
            type="password"
            placeholder="Password"
            name='password'
            {...register('password')}
          />
          <button type="submit" className="login-button">Log In</button>
        </form>

        {isModalOpen && (
          <div className={`modal ${modalType}`}>
            <div className="modal-content">
              <span className="close" onClick={closeModal}>&times;</span>
              <p>{modalMessage}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLogin;
