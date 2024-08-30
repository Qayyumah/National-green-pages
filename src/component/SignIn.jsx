import React from 'react'
import '../assets/signIn.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'

const SignIn = () => {
  const [showMail, setShowMail] = useState(false)


  const schema = yup.object().shape({
    email: yup.string().email('Email is not valid').required('Email is required'),
    password: yup.string().required('Password is required')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
  })

  const signSubmit = async(data) => {
    try{
      const response = await fetch('https://d892-102-89-84-117.ngrok-free.app/api/login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(data)
          })
          const res = await response.json()
          console.log(res)
     }catch(error){
      console.log(error)
     }
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
    <Footer/>
    </div>
  )
}

export default SignIn