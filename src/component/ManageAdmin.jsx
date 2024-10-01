import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { FaTrash } from 'react-icons/fa';
import '../assets/manage-admin.css'; // Import the CSS file
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';

const ManageAdmin = () => {
  const { admins, deleteAdmin } = useContext(DataContext);

  return (
    <div>
    <AdminHeader/>
    <AdminSidebar/>
    <div className='manage-header'>
    <h2>Manage Admins</h2>
    </div>
    <div className="manage-admins">
      <h3>Admin List</h3>
      {admins.length > 0 ? (
        <ul className="admin-list">
          {admins.map((admin) => (
            <li key={admin.id} className="admin-item">
              <span>{admin.username} - <span className="admin-status">{admin.status}</span></span>
              <button 
                onClick={() => deleteAdmin(admin.id)} 
                className="delete-button"
                aria-label="Delete admin"
              >
                <FaTrash />
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No admins found.</p>
      )}
    </div>
    </div>
  );
};

export default ManageAdmin;

