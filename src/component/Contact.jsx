import React from 'react'
import '../assets/Contact.css'
import Header from './Header'
import Footer from './Footer'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const Contact = () => {
  const [mail, setMail] = useState('')
  const [message, setMessage] = useState('')

  const schema = yup.object().shape({
    yourname: yup.string().required('Name is required!'),
    email: yup.string().email().required()
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
})


  const handleChange = () => {
    
}

  const contactForm = (data) => {
    data.preventDefault()
    console.log(data)

  }

  const handleInput=(mail)=>{
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/
    if (rgExp.test(mail)) {
        setMessage('')
    }else if(mail === ""){
      setMessage('Email is required')
    }
    else if(!rgExp.test(mail)){
        setMessage('Email is not valid')
    }else{
        setMessage('')
    }
  }

  return (
    <div>
        <Header/>
          <div className='con-body'>
          <h2 style={{textAlign:'center', fontSize:'36px', color:'#000', marginBottom:'20px'}}>Contact Us</h2>
            <div className='contact'>
              <div className='contact-container'>
                <div className='contact-info'>
                  <div className='infos'>
                    <div className='icon'>
                      <img src=''/>
                    </div>
                    <div className='contact-text'>
                      <h3>Address</h3>
                      <p> Corporate Office: 18, M K O Abiola way, Ring Road,
                      By Bolumole Junction, Challenge, Ibadan, Oyo State, Nigeria</p>
                    </div>
                  </div>
                  
                  <div className='infos'>
                    <div className='icon'>
                      <img src='images/bi_phone-fill.png'/>
                    </div>
                    <div className='contact-text'>
                      <h3>Phone</h3>
                      <p>0805-949-3021, 0806-418-2031, 02-7518154,
                      0803-421-7292, 02-2022177, 02-2005445</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className='contact-form'>
                <form onSubmit={handleSubmit(contactForm)}>
                  <h2>Send Message</h2>
                  <div className='input'>
                    <input type='text' 
                      name='yourname' 
                      placeholder='Name' 
                      onChange={(e)=>{handleChange(e)}} 
                      {...register("yourname")}
                    />
                    <p>{errors.yourname?.message}</p>
                  </div>
                  <div className='input'>
                    <input type='text' 
                      name='email' 
                      placeholder='Email' 
                      onChange={(e)=>{handleChange(e)}} 
                      onInput={(e)=>handleInput(e.target.value)}
                      {...register("email")}
                    />
                    <p>{message}</p>
                  </div>
                  <div className='input'>
                    <textarea type='text' name='text'placeholder='Enter your message' onChange={(e)=>{handleChange(e)}}/>
                  </div>
                  <div className='input'>
                    <input type='submit' value='submit'/>
                  </div>
                </form>
              </div>
            </div>
          </div>
        <Footer/>
    </div>
  )
}

export default Contact