import React from 'react'
import '../css/Body.css'

const Body = () => {
  return (
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
  )
}

export default Body