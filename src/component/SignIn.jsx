// import React, { useContext, useState } from 'react';
// import '../assets/signIn.css';
// import axios from 'axios';
// import Header from './Header';
// import Footer from './Footer';
// import { useForm } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { Link, Navigate , useNavigate} from 'react-router-dom';
// import { DataContext } from '../context/DataContext';

// const SignIn = () => {
//   const [showMail, setShowMail] = useState(false);
//   const [success, setSuccess] = useState('');
//   const [error, setError] = useState('');
//   const { logInUser, loggedInUser, logOutUser } = useContext(DataContext);
//   const navigate = useNavigate();

//   const schema = yup.object().shape({
//     email: yup.string().email('Email is not valid').required('Email is required'),
//     password: yup.string().required('Password is required'),
//   });

//   const { register, handleSubmit, formState: { errors } } = useForm({
//     resolver: yupResolver(schema),
//   });

//   const signSubmit = async (data) => {
//     try {
//       const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, data);
//       localStorage.setItem('token', response.data.key);
//       logInUser({ email: data.email });
//       setSuccess('You have successfully logged in');
//       setError('');
//       navigate('/post');
//     } catch (err) {
//       if (err.response && err.response.data) {
//         setError(err.response.data.message || 'Unable to log in');
//       } else {
//         setError('Network error. Please try again.');
//       }
//       setSuccess('');
//     }
//   };

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     logOutUser(); 
//   };

//   if (loggedInUser) {
//     return (
//       <div>
//         <Header />
//         <div className='logged-in' style={{minHeight:'100vh', padding:'300px 0', textAlign:'center', backgroundColor:'green'}}>
//           <h2>Welcome, {loggedInUser.email}</h2>
//           <button onClick={handleLogout} style={{border:'none', backgroundColor:'lightGreen', padding:'15px 55px', borderRadius:'10px', fontSize:'18px', color:'#fff', cursor:'pointer'}}>Logout</button>
//         </div>
//         <Footer />
//       </div>
//     );
//   }

//   const handleClick = () => {
//     setShowMail(!showMail);
//   };

//   return (
//     <div>
//       <Header />
//       <div className='sign'>
//         <div className='section-con'>
//           <h1>Sign In</h1>
//           <div className='sign-in'>
//             <div className='gmail'>
//               {success && <div style={{ color: 'white', fontSize: '17px' }} className='s-e'>{success}</div>}
//               {error && <div style={{ color: 'white', fontSize: '17px' }} className='s-e'>{error}</div>}
//               <button onClick={handleClick}>
//                 <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
//                 Sign in with Email {showMail ? '' : ''}
//               </button>

//               {showMail && (
//                 <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
//                   <div className='input-img-sign-in'>
//                     <input 
//                       placeholder='Email'
//                       name='email'
//                       type='email'
//                       {...register("email")}
//                     />
//                     <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
//                   </div>
//                   <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.email?.message}</p>
//                   <div className='input-img-sign-in'>
//                     <input 
//                       placeholder='Password'
//                       name='password'
//                       type='password'
//                       {...register("password")}
//                     />
//                     <img src='/images/carbon_password.png' alt='Password Icon' />
//                   </div>
//                   <p style={{ color: 'red', fontSize: '15px', textAlign: 'left' }}>{errors.password?.message}</p>
//                   <button type='submit'>Submit</button>
//                 </form>
//               )}
//             </div>

//             <button>
//               <img src='/images/flat-color-icons_google.png' alt='Google Icon' />
//               Sign in with Google
//             </button>
//             <button>
//               <img src='/images/dashicons_facebook-alt.png' alt='Facebook Icon' />
//               Sign in with Facebook
//             </button>

//             <div className='alreadylogged'>
//               <p>Don't have an account? <Link to='/signup'>Sign Up</Link></p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// };

// export default SignIn;


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
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
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
            setError(err.response?.data?.message || 'Unable to log in');
            setSuccess('');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        logOutUser(); 
    };

    if (loggedInUser) {
        return (
            <div>
                <Header />
                <div className='logged-in' style={{ minHeight: '100vh', padding: '300px 0', textAlign: 'center', backgroundColor: 'green' }}>
                    <h2>Welcome, {loggedInUser.email}</h2>
                    <button onClick={handleLogout} style={{ border: 'none', backgroundColor: 'lightGreen', padding: '15px 55px', borderRadius: '10px', fontSize: '18px', color: '#fff', cursor: 'pointer' }}>Logout</button>
                </div>
                <Footer />
            </div>
        );
    }

    const handleClick = () => {
        setShowMail(!showMail);
    };

    return (
        <div>
            <Header />
            <div className='sign'>
                <div className='section-con'>
                    <h1>Sign In</h1>
                    <div className='sign-in'>
                        <div className='gmail'>
                            {success && <div style={{ color: 'white', fontSize: '17px' }} className='s-e'>{success}</div>}
                            {error && <div style={{ color: 'white', fontSize: '17px' }} className='s-e'>{error}</div>}
                            <button onClick={handleClick}>
                                <img src='/images/mdi_email-edit-outline.png' alt='Email Icon' />
                                Sign in with Email {showMail ? '' : ''}
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
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default SignIn;
