import React, { useContext, useState, useEffect } from 'react';
import '../assets/signIn.css';
import axios from 'axios';
import Header from './Header';
import Footer from './Footer';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Link, useNavigate } from 'react-router-dom';
import { DataContext } from '../context/DataContext';

const SignIn = () => {
    const [showMail, setShowMail] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const { logInUser, loggedInUser, logOutUser } = useContext(DataContext);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const email = localStorage.getItem('email'); 
            if (email) {
                logInUser({ email });
            }
        }
    }, [logInUser]);

    const schema = yup.object().shape({
        email: yup.string().email('Email is not valid').required('Email is required'),
        password: yup.string().required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const signSubmit = async (data) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, data);
            localStorage.setItem('token', response.data.key);
            localStorage.setItem('email', data.email);
            logInUser({ email: data.email });
            setSuccess('You have successfully logged in');
            setError('');
            navigate('/post');
        } catch (err) {
            if (err.response) {
                switch (err.response.status) {
                    case 401:
                        setError('Incorrect password. Please try again.');
                        break;
                    case 404:
                        setError('Email not found. Please check your email or sign up.');
                        break;
                    case 400:
                        setError('Bad request. Please check your input and try again.');
                        break;
                    case 500:
                        setError('Server error. Please try again later.');
                        break;
                    default:
                        setError(err.response.data.message || 'An unexpected error occurred. Please try again later.');
                }
            } else if (err.request) {
                setError('Network error. Please check your connection and try again.');
            } else {
                setError('An error occurred. Please try again.');
            }
            setSuccess('');
            setShowModal(true);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        logOutUser(); 
    };

    const handleClick = () => {
        setShowMail(!showMail);
    };

    const closeModal = () => {
        setShowModal(false);
        setSuccess('');
        setError('');
        setShowForgotPassword(false);
    };

    const handleForgotPassword = async (email) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/password-reset/`, { email });
            setSuccess('Password reset email sent. Please check your inbox.');
            setError('');
            setShowForgotPassword(false);
        } catch (err) {
            setError(err.response?.data?.message || 'Error sending password reset email.');
            setSuccess('');
        } finally {
            setShowModal(true);
        }
    };

    return (
        <div>
            <Header />
            <div className='sign'>
                <div className='section-con'>
                    <h1>Sign In</h1>
                    {loggedInUser ? (
                        <div style={{textAlign:'center', paddingTop:'50px'}}>
                            <h2>Welcome, {loggedInUser.email}!</h2>
                            <button style={{border:'none', backgroundColor:'green', padding:'10px 20px', color:'#fff', fontSize:'18px', cursor:'pointer'}} onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className='sign-in'>
                            <div className='gmail'>
                                {success && <div style={{ color: 'white', fontSize: '17px' }} className='s-e'>{success}</div>}
                                <button onClick={handleClick}>
                                    <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
                                    Sign in with Email
                                </button>

                                {showMail && (
                                    <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
                                        <div className='input-img-sign-in'>
                                            <input 
                                                placeholder='Email'
                                                name='email'
                                                type='email'
                                                {...register("email")}
                                            />
                                            <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
                                        </div>
                                        <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.email?.message}</p>
                                        <div className='input-img-sign-in'>
                                            <input 
                                                placeholder='Password'
                                                name='password'
                                                type='password'
                                                {...register("password")}
                                            />
                                            <img src='/images/carbon_password.png' alt='Password Icon' />
                                        </div>
                                        <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password?.message}</p>
                                        <button type='submit'>Submit</button>
                                        <p onClick={() => setShowForgotPassword(true)} style={{ cursor: 'pointer', color: 'green', marginTop:'10px', marginLeft:'10px' }}>Forgot Password?</p>
                                    </form>
                                )}
                            </div>

                            <button>
                                <img src='/images/flat-color-icons_google.png' alt='Google Icon' />
                                Sign in with Google
                            </button>
                            <button>
                                <img src='/images/dashicons_facebook-alt.png' alt='Facebook Icon' />
                                Sign in with Facebook
                            </button>

                            <div className='alreadylogged'>
                                <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p>{error}</p>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            {showForgotPassword && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Reset Password</h2>
                        <p>Enter your email to receive a password reset link:</p>
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            const email = e.target.elements.email.value;
                            handleForgotPassword(email);
                        }}>
                            <input type="email" name="email" placeholder="Your email" required />
                            <button type="submit">Send Reset Link</button>
                        </form>
                        <button onClick={closeModal}>Close</button>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default SignIn;

