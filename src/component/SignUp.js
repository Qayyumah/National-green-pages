import React from 'react'
import '../assets/signIn.css'
import { useState, useContext } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { DataContext } from '../context/DataContext';

const SignUp = () => {
  const [showMail, setShowMail] = useState(false);
  const [navigate, setNavigate] = useState(false)
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const schema = yup.object().shape({
    fullname: yup.string().required('Name is required'),
    email: yup.string().email('Email is not valid').required('Email is required'),
    password1: yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
    password2: yup.string().required('Required').oneOf([yup.ref('password1')], 'Password must match')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const signSubmit = (data)=>{
    console.log(data)
    axios.post(
      `${process.env.REACT_APP_API_URL}/api/register/`, data)
      .then((response)=>{
        setSuccess('Account created successfully')
        setError('')
        setNavigate(true)
    }).catch((error)=>{
      setError('Error creating account')
      setSuccess('')
    })
  }

  if (navigate){
    return <Navigate to='/signin' replace={true}/>
  }

  const handleClick = ()=>{
    setShowMail(!showMail)
  }

  return (
    <div>
    <Header/>
    <div className='sign'>
      <div className='section-con'>
        <h1>SignUp</h1>
        <div className='sign-in'>
          <div className='gmail'>

          {success && (
            <div style={{color:'white', fontSize:'17px'}} className='s-e'>{success}</div>
          )}
          {error && (
            <div style={{color:'white', fontSize:'17px'}} className='s-e'>{error}</div>
          )}
          
            <button onClick={handleClick}><img src='/images/mdi_email-edit-outline.png'/>Sign up with Email{showMail? '':''}</button>

            {showMail && (
            <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
                <div className='input-img-sign-in'>
                    <input
                        placeholder='Full-Name'
                        name='fullname'
                        type='name'
                        {...register("fullname")}
                    />
                    <img src='images/name.png'/>
                </div>
                <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{errors.fullname?.message}</p>

              <div className='input-img-sign-in'>
                <input 
                  placeholder='Email'
                  name='email' 
                  type='email'  
                  {...register("email")}
                  />
                <img src='/images/mdi_email-edit-outline.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{errors.email?.message}</p>

              <div className='input-img-sign-in'>
                <input 
                  placeholder='Password' 
                  name='password' 
                  type='password' 
                  {...register("password1")}
                />
                <img src='/images/carbon_password.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{errors.password1?.message}</p>

              <div className='input-img-sign-in'>
                <input 
                  placeholder='Confirm Password' 
                  name='password' 
                  type='password' 
                  {...register("password2")}
                />
                <img src='/images/carbon_password.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{errors.password2?.message}</p>

              <button type='submit'>submit</button>
            </form>
            )}
          </div>
          
          <button><img src='/images/flat-color-icons_google.png'/>Sign up with Google</button>
          <button><img src='/images/dashicons_facebook-alt.png'/>Sign up with Facebook</button>

          <div className='alreadylogged'>
                <p>Already have an account?<Link to='/signin'>Log in</Link></p>
          </div>
        </div>
      </div>
    </div>

    
     
    <Footer/>
    </div>
  )
}

export default SignUp