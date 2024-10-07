// import React, { useEffect, useState, useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import { Link } from 'react-router-dom';
// import AdminHeader from './AdminHeader';
// import AdminSidebar from './AdminSidebar';
// import '../assets/business-management.css';
// import { FaCheck, FaTimes } from 'react-icons/fa';
// import axios from 'axios';
// import '../assets/pending.css';

// const PendingApproval = () => {
//   const [pendingBusinesses, setPendingBusinesses] = useState([]);
//   const [pendingRejectedBusinesses, setPendingRejectedBusinesses] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedBusiness, setSelectedBusiness] = useState(null);
//   const [modalVisible, setModalVisible] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin`);
//         const pendingBusinesses = response.data.filter(business => business.status.toLowerCase() === "pending");
//         setPendingBusinesses(pendingBusinesses);
//       } catch (error) {
//         console.error("Error fetching businesses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const handleApproval = async (index, approved) => {
//     const updatedBusinesses = pendingBusinesses.map((business, i) => 
//       i === index ? { ...business, status: approved ? "approved" : "rejected" } : business
//     );
//     setPendingBusinesses(updatedBusinesses);
//   };

//   const approveSubmit = (id) =>{
//     axios.post(`${process.env.REACT_APP_API_URL}/api/approve-business/`)
//     .then((response)=>{
//         console.log(response.data)
//     })
//     .catch((err)=>{
//       console.log(err)
//     })
//   }

//   const removeApiBusiness = async (index, rejected) => {
//     const updatedApiBusinesses = pendingRejectedBusinesses.filter((_, i) => i !== index);
//     setPendingRejectedBusinesses(updatedApiBusinesses);
//     setIsModalOpen(false);

    
//   }

//   const handleReject= (index) => {
//     const updatedBusinesses = pendingRejectedBusinesses.map((business, i) => 
//       i === index ? { ...business, status: 'rejected'} : business
//     );
//     setPendingRejectedBusinesses(updatedBusinesses);
//     setDeleteIndex(index);
//     setIsModalOpen(true);
//   };

//   const openModal = (business) => {
//     setSelectedBusiness(business);
//     setModalVisible(true);
//   };

//   const closeModal = () => {
//     setModalVisible(false);
//     setSelectedBusiness(null);
//   };

//   return (
//     <div className="pending-approval-container">
//       <AdminHeader />
//       <AdminSidebar />
//       <div className="pending-approval">
//         <div className='pending-header'>
//           <h1>Pending Approval</h1>
//         </div>
        
//         {loading ? (
//           <p>Loading...</p>
//         ) : (
//           pendingBusinesses.length === 0 ? (
//             <p>No pending businesses available.</p>
//           ) : (
//             <table className="business-table">
//               <thead>
//                 <tr>
//                   <th>Company Name</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                   <th>Status</th>
//                   <th>Date Created</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pendingBusinesses.map((business, index) => (
//                   <tr key={index} onClick={() => openModal(business)}>
//                     <td>{business.companyname}</td>
//                     <td>{business.email}</td>
//                     <td>{business.phonenumber}</td>
//                     <td>{business.status}</td>
//                     <td>{business.created_at}</td>
//                     <td>
//                     <form onSubmit={approveSubmit}>
//                       <FaCheck 
//                         className="action-icon approve-icon" 
//                         onClick={(e) => { e.stopPropagation(); handleApproval(index, true); }} 
//                         title="Approve" 
//                       />
//                       </form>
//                       <FaTimes 
//                         className="action-icon reject-icon" 
//                         onClick={(e) => { e.stopPropagation(); handleReject(index, false); }} 
//                         title="Reject" 
//                       />
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )
//         )}
        
//         {modalVisible && selectedBusiness && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h2>{selectedBusiness.companyname}</h2>
//               <p><strong>Email:</strong> {selectedBusiness.email}</p>
//               <p><strong>Phone Number:</strong> {selectedBusiness.phonenumber}</p>
//               <p><strong>Status:</strong> {selectedBusiness.status}</p>
//               <p><strong>State:</strong>{selectedBusiness.state}</p>
//               <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
//               <p><strong>Town/City:</strong> {selectedBusiness.town}</p>
//               <p><strong>Phone Number:</strong> {selectedBusiness.phonenumber}</p>
//               <p><strong>WhatsApp Number:</strong> {selectedBusiness.whatsappnumber}</p>
//               <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
//               <p><strong>Website:</strong> {selectedBusiness.website}</p>
//               <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
//               <p><strong>Address:</strong> {selectedBusiness.address}</p>
//               <button onClick={closeModal} className="close-button">Close</button>
//             </div>
//           </div>
//         )}

//         {isModalOpen && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h2>Confirm Deletion</h2>
//               <p>Are you sure you want to reject this business?</p>
//               <div className="modal-actions">
//                 <button onClick={() => setIsModalOpen(false)}>Cancel</button>
//                 <button onClick={() => removeApiBusiness(deleteIndex)}>Reject</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PendingApproval;


import React, { useEffect, useState } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);
  const [messageModalVisible, setMessageModalVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin`);
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

  const handleApproval = async (index, email, e) => {
    e.stopPropagation();
    try {
      const response = await approveSubmit(email);
      if (response.status === 200) {
        const updatedBusinesses = pendingBusinesses.map((business, i) => 
          i === index ? { ...business, status: "approved" } : business
        );
        setPendingBusinesses(updatedBusinesses);
        setMessage("Business approved successfully!");
        setIsSuccess(true);
      } else {
        setMessage("Business not found. Status not updated.");
        setIsSuccess(false);
      }
      setMessageModalVisible(true);
    } catch (error) {
      console.error("Error approving business:", error);
      setMessage("An error occurred while approving the business.");
      setIsSuccess(false);
      setMessageModalVisible(true);
    }
  };

  const approveSubmit = async (email) => {
    return await axios.post(`${process.env.REACT_APP_API_URL}/api/approve-business/`, { 
      email: email 
    })
    .then((response) => {
      return response;
    })
    .catch((err) => {
      throw err;
    });
  };

  const handleReject = (index, e) => {
    e.stopPropagation();
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const removeApiBusiness = async () => {
    const updatedBusinesses = pendingBusinesses.filter((_, i) => i !== deleteIndex);
    setPendingBusinesses(updatedBusinesses);
    setIsModalOpen(false);
  };

  const openModal = (business) => {
    setSelectedBusiness(business);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedBusiness(null);
  };

  const closeMessageModal = () => {
    setMessageModalVisible(false);
    setMessage('');
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
                        title="Approve" 
                        onClick={(e) => handleApproval(index, business.email, e)} 
                      />
                      <FaTimes 
                        className="action-icon reject-icon" 
                        onClick={(e) => { handleReject(index, e); }} 
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
              <p><strong>State:</strong> {selectedBusiness.state}</p>
              <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
              <p><strong>Town/City:</strong> {selectedBusiness.town}</p>
              <p><strong>WhatsApp Number:</strong> {selectedBusiness.whatsappnumber}</p>
              <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
              <p><strong>Website:</strong> {selectedBusiness.website}</p>
              <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
              <p><strong>Address:</strong> {selectedBusiness.address}</p>
              <button onClick={closeModal} className="close-button">Close</button>
            </div>
          </div>
        )}

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>Confirm Deletion</h2>
              <p>Are you sure you want to reject this business?</p>
              <div className="modal-actions">
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button onClick={removeApiBusiness}>Reject</button>
              </div>
            </div>
          </div>
        )}

        {messageModalVisible && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{isSuccess ? "Success" : "Error"}</h2>
              <p>{message}</p>
              <button onClick={closeMessageModal} className="close-button">Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PendingApproval;

