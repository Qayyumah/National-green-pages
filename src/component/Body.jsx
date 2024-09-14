import React, { useEffect, useRef } from 'react'
import '../assets/body.css'
import Header from './Header'
import Footer from './Footer'
import axios from 'axios'
import { useState } from 'react'
import { Link } from 'react-router-dom'

const Body = () => {
  const [btn, setBtn]= useState(false)
  const [value, setValue] = useState({
    searchBusiness:'',
    select:'',
    search:''
  })
  const [states, setStates]= useState([])
  const [searchResults, setSearchResults] = useState([])

  const myref = useRef()

  const handleChange=(e)=>{
    setValue({...value, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setBtn(true)

    console.log(myref)
    // console.log(`${process.env.REACT_APP_API_URL}/api/find-business/?search=`)
    axios.get(`${process.env.REACT_APP_API_URL}/api/find-business/?search=${myref.current.value}`, value, {
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then((response)=>{
      setSearchResults(response.data)
    })
    .catch((error)=>{
      setSearchResults(error.data)
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
            <input placeholder='What are you looking for?' name='searchBusiness' ref={myref} onChange={handleChange}/>
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
        <h2 style={{textAlign:'center', color:'green',fontSize:'27px', fontWeight:'400'}}>Here is your search result:</h2>
        {
          searchResults.map((searchResult)=>{
            return <div className='search'>
              <h3 style={{fontSize:'28px', color:'rgb(28, 104, 60)'}}>Company Name: <span style={{fontSize:'24px',letterSpacing:'1px', fontWeight:'400', color:'black'}}>{searchResult.companyname}</span></h3>
              <h3 style={{fontSize:'28px', color:'rgb(28, 104, 60)'}}>Address: <span style={{fontSize:'24px',letterSpacing:'1px', fontWeight:'400', color:'black'}}>{searchResult.address}</span></h3>
              <p>To get in touch with us: <Link to='/contact'>Contact us</Link></p>
            </div>
          })
        }
      </div>:null
      }
    <Footer/>
    </div>
  )
}

export default Body