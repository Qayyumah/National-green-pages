import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { useNavigate } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/All-users.css';

const AddUser = () => {
  const { addUser } = useContext(DataContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      name,
      email,
      password,
    };
    addUser(newUser);
    navigate('/all-users');
  };

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="add-user">
        <h1>Add New User</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Name:</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
             
            />
          </div>
          <div>
            <label>Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              
            />
          </div>
          <div>
            <label>Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              
            />
          </div>
          <button type="submit">Add User</button>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
