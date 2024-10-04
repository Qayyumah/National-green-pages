import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaCheck, FaTimes } from 'react-icons/fa';
import axios from 'axios';
import '../assets/pending.css';

const PendingApproval = () => {
  const [pendingBusinesses, setPendingBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin/`);
        const pendingBusinesses = response.data.filter(business => business.status.toLowerCase() === "pending");
        setPendingBusinesses(pendingBusinesses);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApproval = async (index, approved) => {
    const updatedBusinesses = pendingBusinesses.map((business, i) => 
      i === index ? { ...business, status: approved ? "approved" : "rejected" } : business
    );
    setPendingBusinesses(updatedBusinesses);
  };

  const openModal = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  return (
    <div className="pending-approval-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="pending-approval">
        <div className='pending-header'>
          <h1>Pending Approval</h1>
        </div>
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          pendingBusinesses.length === 0 ? (
            <p>No pending businesses available.</p>
          ) : (
            <table className="business-table">
              <thead>
                <tr>
                  <th>Company Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Status</th>
                  <th>Date Created</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pendingBusinesses.map((business, index) => (
                  <tr key={index} onClick={() => openModal(business)}>
                    <td>{business.companyname}</td>
                    <td>{business.email}</td>
                    <td>{business.phonenumber}</td>
                    <td>{business.status}</td>
                    <td>{business.created_at}</td>
                    <td>
                      <FaCheck 
                        className="action-icon approve-icon" 
                        onClick={(e) => { e.stopPropagation(); handleApproval(index, true); }} 
                        title="Approve" 
                      />
                      <FaTimes 
                        className="action-icon reject-icon" 
                        onClick={(e) => { e.stopPropagation(); handleApproval(index, false); }} 
                        title="Reject" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
        
        {modalVisible && selectedBusiness && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{selectedBusiness.companyname}</h2>
              <p><strong>Email:</strong> {selectedBusiness.email}</p>
              <p><strong>Phone Number:</strong> {selectedBusiness.phonenumber}</p>
              <p><strong>Status:</strong> {selectedBusiness.status}</p>
              <p><strong>State:</strong>{selectedBusiness.state}</p>
              <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
              <p><strong>Town/City:</strong> {selectedBusiness.town}</p>
              <p><strong>Phone Number:</strong> {selectedBusiness.phonenumber}</p>
              <p><strong>WhatsApp Number:</strong> {selectedBusiness.whatsappnumber}</p>
              <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
              <p><strong>Website:</strong> {selectedBusiness.website}</p>
              <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
              <p><strong>Address:</strong> {selectedBusiness.address}</p>
              <button onClick={closeModal} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;
