import React from 'react'
import '../assets/body.css'
import Header from './Header'
import Footer from './Footer'

const Body = () => {
  return (
    <div>
    <Header/>
    <div className='container'>
        <div className='content'>
            <h1>NationalGreenPages</h1>
            <p>Find Great Businesses close to you.</p>
        </div>
        <div className='inputs'>
            <input placeholder='What are you looking for?'/>
            <select><option>All Region</option></select>
            <select><option>All Categories</option></select>
            <button>Search</button>
        </div>
    </div>
    <Footer/>
    </div>
  )
}

export default Body