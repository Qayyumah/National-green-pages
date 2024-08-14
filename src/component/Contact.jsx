import React from 'react'
import '../assets/Contact.css'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'

const Contact = () => {
  const schema = yup.object().shape({
    yourname: yup.string().required('Name is required!'),
    email: yup.string().email('Email is not valid').required('Email is required!'),
    message: yup.string().required('Required!')
  })

  const {register, handleSubmit, formState: {errors}} = useForm({
    resolver: yupResolver(schema)
})

  const contactForm = (data) => {

    console.log(data)

  }

  return (
    <div>
        <Header/>
          <div className='con-body'>
            <div className='contact'>
            
              <div className='contact-container'>
              
                <div className='contact-info'>
                <h2 style={{textAlign:'left', fontSize:'26px', fontWeight:'600', marginLeft:'35px', color:'#000', marginBottom:'20px'}}>Contact Us</h2>
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
                      {...register("yourname")}
                    />
                    <p>{errors.yourname?.message}</p>
                  </div>
                  <div className='input'>
                    <input type='text' 
                      name='email' 
                      placeholder='Email' 
                      {...register("email")}
                    />
                  </div>
                  <p>{errors.email?.message}</p>
                  <div className='input'>
                    <textarea type='text' 
                    name='text'
                    placeholder='Enter your message'  
                    {...register("message")}/>
                  </div>
                  <p>{errors.message?.message}</p>
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