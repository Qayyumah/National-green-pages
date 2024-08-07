import React from 'react'
import '../assets/Contact.css'
import Header from './Header'
import Footer from './Footer'

const Contact = () => {
  return (
    <div>
        <Header/>
        <div className='contact'>
            <h1>Contact</h1>
            <div className='contents'>
                <input placeholder='Name'/>
                <input placeholder='Email'/>
                <textarea placeholder='Message'/>
                <button>SUBMIT</button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default Contact