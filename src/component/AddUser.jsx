import React, { useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';

const AddUser = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const { addUser } = useContext(DataContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    addUser({ name, email });
    setName('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
      />
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
        required 
      />
      <button type="submit">Add User</button>
    </form>
  );
};

export default AddUser;
