import React, { useEffect, useState , useContext} from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';


const AllBusinesses = () => {
  const { businesses, setBusinesses } = useContext(DataContext);
  const [states, setStates]= useState([])
  
  useEffect(()=>{
    fetch('https://nigerian-states-and-lga.vercel.app/')
    .then((response) =>response.json())
    .then((data)=> setStates(data))
  }, [])

  const removeBusiness = (index) => {
    const updatedBusinesses = businesses.filter((_, i) => i !== index);
    setBusinesses(updatedBusinesses);
  };
  const removeApiBusiness = (index) => {
    const updatedBusinesses = states.filter((_, i) => i !== index);
    setStates(updatedBusinesses);
  };
  // Function to handle status change
  const handleStatusChange = (index, newStatus) => {
    setBusinesses(businesses => 
      businesses.map((business, i) => 
        i === index ? { ...business, status: newStatus } : business
      )
    );
  };


  return (
    <div>
    <AdminHeader/>
    <AdminSidebar/>
    <div className="all-businesses">
      <div className='all-header'>
        <h1>Business List</h1>
        <Link to="/add" className="add-business-button">Add Business</Link>
      </div>
      <table>
        <thead>
          <tr>
            <th>Company Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Date Created</th>
            <th>Remove</th>
          </tr>
        </thead>
        <tbody>
          {businesses.map((business, index) => (
            <tr key={index}>
              <td>{business.companyName}</td>
              <td>{business.email}</td>
              <td>{business.phoneNumber}</td>
              <td>
                <select
                  value={business.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                </select>
              </td>
              <td>{business.dateCreated}</td>
              <td>
                <button onClick={() => removeBusiness(index)} className="remove-button">
                  Remove
                </button>
              </td>
            </tr>
          ))}

          {states.map((state, index)=>{
            return <tr key={index}>
              <td>{state.name}</td>
              <td>{state.name}</td>
              <td>{state.name}</td>
              <td>
                <select
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                >
                  <option value="Pending">Pending</option>
                  <option value="Verified">Verified</option>
                </select>
              </td>
              <td>{state.name}</td>
              <td>
                <button onClick={() => removeApiBusiness(index)} className="remove-button">
                  Remove
                </button>
              </td>
            </tr>
            
          })}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default AllBusinesses;
