import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaEdit, FaTrash, FaPause, FaPlay, FaSave, FaEye } from 'react-icons/fa';
import axios from 'axios';
import Cookies from 'js-cookie';

const AllBusinesses = () => {
  const [apiBusinesses, setApiBusinesses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBusiness, setEditedBusiness] = useState({});
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [isSuspendModalOpen, setIsSuspendModalOpen] = useState(false);
  const [suspendIndex, setSuspendIndex] = useState(null);
  const [suspendReason, setSuspendReason] = useState('');
  const [viewBusiness, setViewBusiness] = useState(null);
  const [errorMessage, setErrorMessage] = useState(''); 

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin`, {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        });
        const verifiedBusinesses = response.data.filter(business => business.status.toLowerCase() === "verified");
        setApiBusinesses(verifiedBusinesses);
      } catch (error) {
        setErrorMessage("Error fetching businesses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeApiBusiness = async () => {
    const businessEmail = apiBusinesses[deleteIndex].email;
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin-delete-business/`, { email: businessEmail }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setApiBusinesses(prev => prev.filter((_, i) => i !== deleteIndex));
    } catch (error) {
      setErrorMessage("Error deleting business. Please try again.");
    } finally {
      setIsModalOpen(false);
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const startEditing = (index) => {
    setEditIndex(index);
    setEditedBusiness({
      companyName: apiBusinesses[index].companyname,
      email: apiBusinesses[index].email,
      phoneNumber: apiBusinesses[index].phonenumber,
    });
  };

  const saveApiEdit = async () => {
    const businessEmail = apiBusinesses[editIndex].email;
    
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/admin-edit-business/${businessEmail}`, {...editedBusiness }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
  
      setApiBusinesses(prevBusinesses =>
        prevBusinesses.map((business, i) => (i === editIndex ? { ...business, ...editedBusiness } : business))
      );
    } catch (error) {
      setErrorMessage("Error updating business. Please try again.");
    } finally {
      setEditIndex(null);
      setEditedBusiness({});
    }
  };
  

  const handleSuspend = async (index) => {
    const businessEmail = apiBusinesses[index].email;

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/suspend-business/`, 
        { email: businessEmail, reason: suspendReason },
        {
          headers: {
            Authorization: `Token ${Cookies.get('token')}`,
          },
        }
      );

      setApiBusinesses(prev =>
        prev.map((business, i) => (i === index ? { ...business, status: "suspended" } : business))
      );

      setIsSuspendModalOpen(false);
      setSuspendReason('');
      console.log(response.data)
    } catch (error) {
      setErrorMessage("Error suspending business. Please try again.");
    }
  };

  const handleStatusChange = async (index) => {
    const businessEmail = apiBusinesses[index].email;
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/unsuspend-business/`, { email: businessEmail }, {
        headers: {
          Authorization: `Token ${Cookies.get('token')}`,
        },
      });
      setApiBusinesses(prevBusinesses =>
        prevBusinesses.map((business, i) => (i === index ? { ...business, status: "verified" } : business))
      );
      console.log(response.data)
    } catch (error) {
      setErrorMessage("Error reactivating business. Please try again.");
    }
  };

  const handleViewBusiness = (business) => {
    setViewBusiness(business);
  };

  const handleCloseModal = () => {
    setViewBusiness(null);
  };

  const handleCloseErrorModal = () => {
    setErrorMessage('');
  };

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="all-businesses">
        <div className='all-header'>
          <h1>Verified Business List</h1>
          <Link to="/add" className="add-business-button">Add Business</Link>
        </div>
        
        {loading ? ( 
          <p>Loading...</p>
        ) : (
          apiBusinesses.length === 0 ? (
            <p>No verified businesses available.</p>
          ) : (
            <table>
              <thead>
                <tr style={{ color: '#fff' }}>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiBusinesses.map((business, index) => (
                  <tr key={index}>
                    <td>{editIndex === index ? (
                      <input
                        type="text"
                        name="companyName"
                        value={editedBusiness.companyName}
                        onChange={handleEditChange}
                      />
                    ) : (
                      business.companyname
                    )}</td>
                    <td>{editIndex === index ? (
                      <input
                        type="email"
                        name="email"
                        value={editedBusiness.email}
                        onChange={handleEditChange}
                      />
                    ) : (
                      business.email
                    )}</td>
                    <td>{editIndex === index ? (
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={editedBusiness.phoneNumber}
                        onChange={handleEditChange}
                      />
                    ) : (
                      business.phonenumber
                    )}</td>
                    <td>{business.status}</td>
                    <td>{business.created_at}</td>
                    <td>
                      <FaEye title='view' className={`action-icon edit-icon`} onClick={() => handleViewBusiness(business)} />
                      {editIndex === index ? (
                        <FaSave onClick={saveApiEdit} title='save' className={`action-icon delete-icon`} />
                      ) : (
                        <FaEdit title='edit' className={`action-icon edit-icon`} onClick={() => startEditing(index)} />
                      )}
                      <FaTrash title='delete' className={`action-icon delete-icon`} onClick={() => { setDeleteIndex(index); setIsModalOpen(true); }} />
                      {business.status === "verified" ? (
                        <FaPause title="Suspend" className={`action-icon edit-icon`} onClick={() => { setSuspendIndex(index); setIsSuspendModalOpen(true); }} />
                      ) : (
                        <FaPlay title="Reactivate" className={`action-icon edit-icon`} onClick={() => handleStatusChange(index)} />
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to delete this business?</p>
              <div className="modal-actions">
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button onClick={removeApiBusiness}>Delete</button>
              </div>
            </div>
          </div>
        )}

        {isSuspendModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Reason for Suspension</h2>
              <textarea
                value={suspendReason}
                onChange={(e) => setSuspendReason(e.target.value)}
                placeholder="Enter the reason for suspension"
              />
              <div className="modal-actions">
                <button onClick={() => setIsSuspendModalOpen(false)}>Cancel</button>
                <button onClick={() => handleSuspend(suspendIndex)}>Suspend</button>
              </div>
            </div>
          </div>
        )}

        {viewBusiness && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Business Details</h3>
              <p><strong>Company Name:</strong> {viewBusiness.companyname}</p>
              <p><strong>Email:</strong> {viewBusiness.email}</p>
              <p><strong>Status:</strong> {viewBusiness.status}</p>
              <p><strong>Date Created:</strong> {viewBusiness.created_at}</p>
              <p><strong>Phone Number:</strong> {viewBusiness.phonenumber}</p>
              <button onClick={handleCloseModal}>Close</button>
            </div>
          </div>
        )}

        {errorMessage && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Error</h2>
              <p>{errorMessage}</p>
              <div className="modal-actions">
                <button onClick={handleCloseErrorModal}>Close</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBusinesses;
