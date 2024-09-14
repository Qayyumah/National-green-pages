import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

const Successfull = () => {
  return (
    <div>
    <Header/>
        <div style={{minHeight:'100vh', color:'white', fontSize:'26px', fontWeight:'300', paddingTop:'250px', textAlign:'center', backgroundColor:'rgb(145, 203, 145)'}}>
            <p>Your account has been created sucessfully,
                would you like to login? <Link to='/signin' style={{textDecorationLine:'none', color:'black', fontSize:'20px', }}>Sign In</Link>
            </p>
        </div>
        <Footer/>
    </div>
  )
}

export default Successfull