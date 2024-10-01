import React, { useContext, useEffect, useState } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { FaEdit, FaTrash, FaSave } from 'react-icons/fa';
import '../assets/All-users.css';
import axios from 'axios';

const AllUser = () => {
  const { users, setUsers } = useContext(DataContext);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editedUser, setEditedUser] = useState({});
  const [editingApiIndex, setEditingApiIndex]= useState(null)
  const [editedApiUser, setEditedApiUser] = useState({})
  const [apiUser, setApiUser] = useState([])


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/list-users/`)
        .then(response => {
            setApiUser(response.data);
        })
        .catch(error => {
            console.error(error);
        });
}, []);


  const removeUser = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedUsers = users.filter((_, i) => i !== index);
      setUsers(updatedUsers);
    }
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setEditedUser(users[index]);
  };

  const handleSaveClick = (index) => {
    const updatedUsers = users.map((user, i) =>
      i === index ? { ...user, ...editedUser } : user
    );
    setUsers(updatedUsers);
    setEditingIndex(null);
  };

  const removeApiUser = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      const updatedApiUser = apiUser.filter((_, i) => i !== index);
      setApiUser(updatedApiUser);
    }
  };

  const handleApiEditClick = (index) => {
    setEditingApiIndex(index + apiUser.length);
    setEditedApiUser(apiUser[index]);
  };

  const handleApiSaveClick = (index) => {
    const updatedApiUser = apiUser.map((user, i) =>
      i === index ? { ...user, ...editedApiUser } : user
    );
    setApiUser(updatedApiUser);
    setEditingApiIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prev) => ({ ...prev, [name]: value }));
    setEditedApiUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="all-users">
        <div className='all-header'>
          <h1>User List</h1>
          <Link to="/add-users" className="add-user-button">Add User</Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Date Joined</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="text"
                      name="name"
                      value={editedUser.name || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    user.name
                  )}
                </td>
                <td>
                  {editingIndex === index ? (
                    <input
                      type="email"
                      name="email"
                      value={editedUser.email || ''}
                      onChange={handleChange}
                    />
                  ) : (
                    user.email
                  )}
                </td>
                <td>{user.dateJoined}</td>
                <td>
                  {editingIndex === index ? (
                    <FaSave onClick={() => handleSaveClick(index)} className="icon save-icon" />
                  ) : (
                    <>
                      <FaEdit onClick={() => handleEditClick(index)} className="icon edit-icon" />
                      <FaTrash onClick={() => removeUser(index)} className="icon remove-icon" />
                    </>
                  )}
                </td>
              </tr>
            ))}

            {apiUser.map((value, index)=>{
                return (
                  <tr key={index + apiUser.length}>
                    <td>
                      {editingApiIndex === index + apiUser.length ? (
                        <input
                          type="text"
                          name="name"
                          value={editedApiUser.fullname || ''}
                          onChange={handleChange}
                        />
                      ) : (
                        value.fullname
                      )}
                    </td>
                    <td>
                      {editingApiIndex === index ? (
                        <input
                          type="email"
                          name="email"
                          value={editedApiUser.email || ''}
                          onChange={handleChange}
                        />
                      ) : (
                        value.email
                      )}
                    </td>
                    <td>{value.date}</td>
                    <td>
                      {editingApiIndex === index ? (
                        <FaSave onClick={() => handleApiSaveClick(index)} className="icon save-icon" />
                      ) : (
                        <>
                          <FaEdit onClick={() => handleApiEditClick(index)} className="icon edit-icon" />
                          <FaTrash onClick={() => removeApiUser(index)} className="icon remove-icon" />
                        </>
                      )}
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;

