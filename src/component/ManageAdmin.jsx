import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import '../assets/manage-admin.css'; 
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const ManageAdmin = () => {
  const [admins, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/manage-admins/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      setAdmins(response.data); 
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    }
  };

  const deleteAdmin = async (adminId) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/admins/${adminId}/`, {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      });
      fetchAdmins(); 
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className='manage-header'>
        <h2>Manage Admins</h2>
      </div>
      <div className="manage-admins">
        <h3>Admin List</h3>
        {Array.isArray(admins) && admins.length > 0 ? (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {admins.map((admin) => (
                <tr key={admin.id} className="admin-item">
                  <td>{admin.name}</td>
                  <td>{admin.email}</td>
                  <td className="admin-status">{admin.status}</td>
                  <td>
                    <button 
                      onClick={() => deleteAdmin(admin.id)} 
                      className="delete-button"
                      aria-label="Delete admin"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No admins found.</p>
        )}
      </div>
    </div>
  );
};

export default ManageAdmin;


