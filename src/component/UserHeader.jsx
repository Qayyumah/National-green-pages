import React from 'react'
import '../assets/user-dashboard.css'
import { Link } from 'react-router-dom'
import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

const UserHeader = () => {
  const {loggedInUser} = useContext(DataContext)
  return (
    <header className="header">
        <h1>User Dashboard</h1>
      <div className="header-right">
        <h3>WELCOME! {loggedInUser? loggedInUser.email: null}</h3>
        <Link to='/'>view site</Link>
      </div>
    </header>
  )
}

export default UserHeader