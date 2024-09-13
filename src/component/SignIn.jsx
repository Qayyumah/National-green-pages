import React from 'react'
import '../assets/signIn.css'
import axios from 'axios'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link} from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const SignIn = () => {
  const [showMail, setShowMail] = useState(false)
  const [navigate, setNavigate] = useState(false)
  const[result, setResult]= useState('')
  const [btn, setBtn] = useState(false)

  const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const signSubmit = (data) => {
    console.log(data)
    
    axios.post(`${process.env.REACT_APP_API_URL}/api/login/`, data)
    
    .then((response)=>{
      console.log(response.data)
      localStorage.setItem('token', response.data['key'])
    }).then((error)=>{
      console.log(error)
    })

    setNavigate(true)
  }
  if(navigate){
    <Navigate to='/post'/>
  }

  const handleClick = ()=>{
    setShowMail(!showMail)
  }

  return (
    <div>
    <Header/>
    <div className='sign'>
      <div className='section-con'>
      <h1>SignIn</h1>
        <div className='sign-in'>
          <div className='gmail'>
            <button onClick={handleClick}><img src='/images/mdi_email-edit-outline.png'/>Sign in with Email{showMail? '':''}</button>

            {showMail && (
            <form className='inputs-signin' onSubmit={handleSubmit(signSubmit)}>
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
                  {...register("password")}
                />
                <img src='/images/carbon_password.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{errors.password?.message}</p>
              <button type='submit'>submit</button>
            </form>
            )}
          </div>
          
          <button><img src='/images/flat-color-icons_google.png'/>Sign in with Google</button>
          <button><img src='/images/dashicons_facebook-alt.png'/>Sign in with Facebook</button>

          <div className='alreadylogged'>
            <p>Don't have an account?<Link to='/signup'>Sign Up</Link></p>
          </div>
        </div>
      </div>
    </div>

    {
        btn ? 
        <div>
          {result}
          <Link to='/'>OK</Link>
        </div>: null
      }
    <Footer/>
    </div>
  )
}

export default SignIn