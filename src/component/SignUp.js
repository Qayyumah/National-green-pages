import React, { useState } from 'react';
import '../assets/signIn.css';
import Header from './Header';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const [showMail, setShowMail] = useState(false);
  const [navigate, setNavigate] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  const schema = yup.object().shape({
    fullname: yup.string().required('Name is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    password1: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    password2: yup.string().required('Required').oneOf([yup.ref('password1')], 'Password must match'),
  });

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const signSubmit = async (data) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/register/`, data);
      setSuccessMessage('Account created successfully');
      setErrorMessage('');
      setShowModal(true);
      setNavigate(true);
    }catch (error) {
      if (!error.response) {
        setErrorMessage('Network error. Please try again later.');
      } else if (error.response.status === 400 && error.response.data.email) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        setErrorMessage('Error creating account. Please try again.');
      }
      setSuccessMessage('');
      setShowModal(true);
    }
  };

  if (navigate) {
    return <Navigate to='/signin' replace={true} />;
  }

  const handleClick = () => {
    setShowMail(!showMail);
  };

  const closeModal = () => {
    setShowModal(false);
    setSuccessMessage('');
    setErrorMessage('');
  };

  return (
    <div>
      <Header />
      <div className='sign'>
        <div className='section-con'>
          <h1>SignUp</h1>
          <div className='sign-in'>
            <div className='gmail'>
              <button onClick={handleClick}>
                <img src='/images/mdi_email-edit-outline.png' /> Sign up with Email{showMail ? '' : ''}
              </button>

              {showMail && (
                <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
                  <div className='input-img-sign-in'>
                    <input
                      placeholder='Full-Name'
                      name='fullname'
                      type='name'
                      {...register("fullname")}
                    />
                    <img src='images/name.png' />
                  </div>
                  <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.fullname?.message}</p>

                  <div className='input-img-sign-in'>
                    <input
                      placeholder='Email'
                      name='email'
                      type='email'
                      {...register("email")}
                    />
                    <img src='/images/mdi_email-edit-outline.png' />
                  </div>
                  <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.email?.message}</p>

                  <div className='input-img-sign-in'>
                    <input
                      placeholder='Password'
                      name='password'
                      type='password'
                      {...register("password1")}
                    />
                    <img src='/images/carbon_password.png' />
                  </div>
                  <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password1?.message}</p>

                  <div className='input-img-sign-in'>
                    <input
                      placeholder='Confirm Password'
                      name='password'
                      type='password'
                      {...register("password2")}
                    />
                    <img src='/images/carbon_password.png' />
                  </div>
                  <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password2?.message}</p>

                  <button type='submit'>Submit</button>
                </form>
              )}
            </div>

            <button><img src='/images/flat-color-icons_google.png' /> Sign up with Google</button>
            <button><img src='/images/dashicons_facebook-alt.png' /> Sign up with Facebook</button>

            <div className='alreadylogged'>
              <p>Already have an account?<Link to='/signin'> Log in</Link></p>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <p>{successMessage || errorMessage}</p>
            <button onClick={closeModal}>Close</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default SignUp;
