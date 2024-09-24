import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/add-business.css'; // Import the CSS file

const AddBusiness = () => {
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [town, setTown] = useState('');
  const [city, setCity] = useState('');
  const [status, setStatus] = useState('Pending');
  const [dateCreated, setDateCreated] = useState(''); 
  const [state, setState] = useState('');

  const { addBusiness } = useContext(DataContext);
  const navigate = useNavigate();

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setDateCreated(today);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    addBusiness({
      companyName,
      email,
      phoneNumber,
      town,
      city,
      status,
      dateCreated,
      state,
    });
    navigate('/business');
  };

  return (
    <div className="add-business-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="form-container">
        <h2>Add New Business</h2>
        <form onSubmit={handleSubmit} className="business-form">
          <input 
            type="text" 
            placeholder="Company Name" 
            value={companyName} 
            onChange={(e) => setCompanyName(e.target.value)} 
           
          />
          <input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
         
          />
          <input 
            type="text" 
            placeholder="Phone Number" 
            value={phoneNumber} 
            onChange={(e) => setPhoneNumber(e.target.value)} 
     
          />
          <input 
            type="text" 
            placeholder="Town" 
            value={town} 
            onChange={(e) => setTown(e.target.value)} 
     
          />
          <input 
            type="text" 
            placeholder="City" 
            value={city} 
            onChange={(e) => setCity(e.target.value)} 

          />
          <select value={status} onChange={(e) => setStatus(e.target.value)}>
            <option value="Pending">Pending</option>
            <option value="Verified">Verified</option>
          </select>
          <input 
            type="date" 
            value={dateCreated} 
            onChange={(e) => setDateCreated(e.target.value)} 
          />
          <input 
            type="text" 
            placeholder="State" 
            value={state} 
            onChange={(e) => setState(e.target.value)} 
            
          />
          <button type="submit">Add Business</button>
        </form>
      </div>
    </div>
  );
};

export default AddBusiness;
