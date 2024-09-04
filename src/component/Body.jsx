import React, { useEffect } from 'react'
import '../assets/body.css'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react'

const Body = () => {
  const [btn, setBtn]= useState(false)
  const [value, setValue] = useState({
    searchBusiness:'',
    select:'',
    search:''
  })
  const [states, setStates]= useState([])

  const handleChange=(e)=>{
    setValue({...value, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setBtn(true)
    console.log(value)
    fetch('https://91da-102-89-76-117.ngrok-free.app/api/find-business/?search=Marny Cooper', value)
    .then((response)=>{
      console.log(response)
    })
  }
  useEffect(()=>{
    fetch('https://nigerian-states-and-lga.vercel.app/')
    .then((response) =>response.json())
    .then((data)=> setStates(data))

  }, [])
  return (
    <div>
    <Header/>
    {
      btn?null:
      <div className='container'>
        <div className='content'>
            <h1>NationalGreenPages</h1>
            <p>Find Great Businesses close to you.</p>
        </div>
        <form className='inputs' onSubmit={handleSubmit}>
            <input placeholder='What are you looking for?' name='searchBusiness' onChange={handleChange}/>
            <select onChange={handleChange} name='select' value={value.select} >
              <option value="" >All Region</option>
              {states.map((state)=>(
                <option value={state.name} >{state.name}</option>
              ))}
              
            </select>
            <select onChange={handleChange}><option value="option2">All Categories</option></select>
            <button type='submit' name='search'>Search</button>
        </form>
      </div>
    }
      {
        btn?
      <div className='search-result'>
        <div className='back-img'>
          <img src='images/arow.png' onClick={()=> setBtn(false)}/>
        </div>
        <h1>Here is your search result:</h1>
      </div>:null
      }
    <Footer/>
    </div>
  )
}

export default Body