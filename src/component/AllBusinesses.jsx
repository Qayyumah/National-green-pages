import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css'; // Ensure you have this file for styles

const AllBusinesses = () => {
  const { businesses } = useContext(DataContext);
  const [states, setStates]= useState([])
  const [business, setBusiness] = useState()

  useEffect(()=>{
    fetch('https://nigerian-states-and-lga.vercel.app/')
    .then((response) =>response.json())
    .then((data)=> setStates(data))

  }, [])

  const removeBusiness = (index) => {
    const updatedBusinesses = states.filter((_, i) => i !== index);
    setStates(updatedBusinesses);
  };
  return (
    <div className="all-businesses-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="content-all">
        <h2>Businesses</h2>
        <div className='link-add'>
          <Link to="/add">
            <button className="add-button">Add New Business</button>
          </Link>
        <h3>All Businesses</h3>
        </div>
        <ul className="business-list">
          <div className='business-item-list'>
            <h5>Company Name</h5>
            <h5>Email</h5>
            <h5>Phone Number</h5>
            <h5>status</h5>
            <h5>Date Created</h5>
            <h5>Remove</h5>
          </div>
          {businesses.map((business, index) => (
            <li key={index} className="business-item">
              <p>{business.companyName}</p>
              <p>{business.email}</p>
              <p>{business.phoneNumber}</p>
              <select>
                <option>Pending</option>
                <option>{business.status}</option>
              </select>
              <p>{business.dateCreated}</p>
              
            </li>
          ))}

        {
          states.map((state, index)=>{
            return <div className='other-businesses'>
              <p>{state.name}</p>
              <p>{state.name}</p>
              <p>{state.name}</p>
              <p>{state.name}</p>

              <div className='select-remove'>
              <select>
                <option>Pending</option>
                <option>Verified</option>
              </select>
              <button className="remove-button" onClick={() => removeBusiness(index)}>
                Remove
              </button>
              </div>
            </div>
          })
        }
        </ul>
      </div>
    </div>
  );
};

export default AllBusinesses;

// Phone: {business.phoneNumber}<br />
// Town: {business.town}<br />
// City: {business.city}<br />
// Status: {business.status}<br />
// Date Created: {business.dateCreated}<br />
// State: {business.state}
