import React from 'react'
import '../assets/signIn.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const SignIn = () => {
  const [showMail, setShowMail] = useState(false)
  const[values, setValues] = useState({
    email:'',
    password:''
  })
  const [mail, setMail] = useState('')
  const [pass, setPass] = useState('')
  const [message, setMessage] = useState('')
  const [passMessage, setPassMessage] = useState('')

  const handleChange = (e) => {
    setValues({...values, [e.target.name]:[e.target.value]})
}

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(values)
  }

  const handleLogInput=(mail)=>{
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/
    if (rgExp.test(mail)) {
        setMessage('')
    }else if(mail === ""){
        setMessage('Please enter email')
    }else if(!rgExp.test(mail)){
        setMessage('Wrong Email')
    }else{
        setMessage('Error')
    }
  }

  const handlePassInput=(pass)=>{
    const passExp = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/
    if (passExp.test(pass)){
      setPassMessage('')
    }else if(pass === ""){
      setPassMessage('Please enter a valid password')
    }else if(!passExp.test(pass)){
      setPassMessage('wrong password')
    }else{
      setPassMessage('Error')
    }
  }

  return (
    <div>
    <Header/>
    <div className='sign'>
     
      <div className='section-con'>
      <h1>SignIn</h1>
        <div className='sign-in'>
          <div className='gmail'>
            <button onClick={()=>{setShowMail(true)}}><img src='/images/mdi_email-edit-outline.png'/>Sign in with Gmail</button>
          {
            showMail?
            <div className='inputs-signin'>
              <div className='left-img' style={{cursor:'pointer'}}>
                <img src='images/akar-icons_arrow-left.png' onClick={()=>{setShowMail(false)}}/>
              </div>
              <div className='input-img-sign-in'>
                <input placeholder='Email' name='email' type='email' onInput={(e)=>handleLogInput(e.target.value)} onChange={(e)=>{handleChange(e)}} required/>
                <img src='/images/mdi_email-edit-outline.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{message}</p>
              <div className='input-img-sign-in'>
                <input placeholder='Password' name='password' type='password' onChange={(e)=>{handleChange(e)}} onInput={(e)=>{handlePassInput(e.target.value)}} required/>
                <img src='/images/carbon_password.png'/>
              </div>
              <p style={{color:'red', fontSize:'15px', textAlign:'left'}}>{passMessage}</p>
              <button>Login</button>
            </div>:null
          }
          </div>
          <button><img src='/images/flat-color-icons_google.png'/>Sign in with Google</button>
          <button><img src='/images/dashicons_facebook-alt.png'/>Sign in with Facebook</button>
        </div>
      </div>
    </div>
    <Footer/>
    </div>
  )
}

export default SignIn