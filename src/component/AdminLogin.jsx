import React, { useState, useContext } from 'react';
import '../assets/dashboard.css'
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from 'axios';
import { DataContext } from '../context/DataContext';

const AdminLogin = () => {
  const { logInUser, addAdmin } = useContext(DataContext);
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)


  const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const handleLogin = (data) => {
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/admin/`, data)
    .then((response)=>{
      localStorage.setItem('token', response.data['key'])
      const admin = { id: Date.now(), username: data.email, status: 'active' }; 
      logInUser(admin);
      addAdmin(admin);
      setSuccess('You have sucessfully log in')
      setError('')
      setIsLoggedIn(true)
    }).then((error)=>{
      setError('Unable to log in')
      setSuccess('')
    })
  }

  if(isLoggedIn){
    <Navigate to='/dashboard' replace={true}/>
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>NationalGreenpages</h2>
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
      </div>
    </div>
  );
};

export default AdminLogin;
