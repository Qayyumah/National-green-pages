// import React, { useEffect, useState, useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import { Link } from 'react-router-dom';
// import AdminHeader from './AdminHeader';
// import AdminSidebar from './AdminSidebar';
// import '../assets/business-management.css';
// import { FaEdit, FaTrash, FaPause, FaPlay } from 'react-icons/fa';
// import axios from 'axios';

// const AllBusinesses = () => {
//   const [apiBusinesses, setApiBusinesses] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedBusiness, setEditedBusiness] = useState({});
//   const [loading, setLoading] = useState(true);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [deleteIndex, setDeleteIndex] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin`);
//         const verifiedBusinesses = response.data.filter(business => business.status.toLowerCase() === "verified");
//         setApiBusinesses(verifiedBusinesses);
//       } catch (error) {
//         console.error("Error fetching businesses:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const removeApiBusiness = (index) => {
//     const updatedApiBusinesses = apiBusinesses.filter((_, i) => i !== index);
//     setApiBusinesses(updatedApiBusinesses);
//     setIsModalOpen(false);
//   };

//   const confirmDelete = (index) => {
//     setDeleteIndex(index);
//     setIsModalOpen(true);
//   };

//   const handleStatusChange = (index) => {
//     setApiBusinesses((prevBusinesses) =>
//       prevBusinesses.map((business, i) =>
//         i === index 
//           ? { ...business, status: business.status === "verified" ? "suspended" : "verified" } 
//           : business
//       )
//     );
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBusiness((prev) => ({ ...prev, [name]: value }));
//   };

//   const startEditing = (index) => {
//     setEditIndex(index);
//     setEditedBusiness({
//       companyName: apiBusinesses[index].companyname,
//       email: apiBusinesses[index].email,
//       phoneNumber: apiBusinesses[index].phonenumber,
//     });
//   };

//   const saveApiEdit = (index) => {
//     setApiBusinesses((prevBusinesses) =>
//       prevBusinesses.map((business, i) =>
//         i === index ? { 
//           ...business, 
//           companyname: editedBusiness.companyName, 
//           email: editedBusiness.email, 
//           phonenumber: editedBusiness.phoneNumber 
//         } : business
//       )
//     );
//     setEditIndex(null);
//     setEditedBusiness({});
//   };

//   return (
//     <div>
//       <AdminHeader />
//       <AdminSidebar />
//       <div className="all-businesses">
//         <div className='all-header'>
//           <h1>Verified Business List</h1>
//           <Link to="/add" className="add-business-button">Add Business</Link>
//         </div>
        
//         {loading ? ( 
//           <p>Loading...</p>
//         ) : (
//           apiBusinesses.length === 0 ? (
//             <p>No verified businesses available.</p>
//           ) : (
//             <table>
//               <thead>
//                 <tr style={{ color: '#fff' }}>
//                   <th>Company Name</th>
//                   <th>Email</th>
//                   <th>Phone Number</th>
//                   <th>Status</th>
//                   <th>Date Created</th>
//                   <th>Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {apiBusinesses.map((business, index) => (
//                   <tr key={index}>
//                     <td>
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={editedBusiness.companyName}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         business.companyname
//                       )}
//                     </td>
//                     <td>
//                       {editIndex === index ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={editedBusiness.email}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         business.email
//                       )}
//                     </td>
//                     <td>
//                       {editIndex === index ? (
//                         <input
//                           type="tel"
//                           name="phoneNumber"
//                           value={editedBusiness.phoneNumber}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         business.phonenumber
//                       )}
//                     </td>
//                     <td>{business.status}</td>
//                     <td>{business.created_at}</td>
//                     <td>
//                       {editIndex === index ? (
//                         <button onClick={() => saveApiEdit(index)} style={{ border: 'none', color: 'white', backgroundColor: 'gray' }}>Save</button>
//                       ) : (
//                         <FaEdit title='edit' className={`action-icon edit-icon`} onClick={() => startEditing(index)} />
//                       )}
//                       <FaTrash title='delete' className={`action-icon delete-icon`} onClick={() => confirmDelete(index)} />
//                       {business.status === "verified" ? (
//                         <FaPause title="Suspend" className={`action-icon edit-icon`} onClick={() => handleStatusChange(index)} />
//                       ) : (
//                         <FaPlay title="Reactivate" className={`action-icon edit-icon`} onClick={() => handleStatusChange(index)} />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )
//         )}

//         {isModalOpen && (
//           <div className="modal-overlay">
//             <div className="modal-content">
//               <h2>Confirm Deletion</h2>
//               <p>Are you sure you want to delete this business?</p>
//               <div className="modal-actions">
//                 <button onClick={() => setIsModalOpen(false)}>Cancel</button>
//                 <button onClick={() => removeApiBusiness(deleteIndex)}>Delete</button>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBusinesses;



import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaEdit, FaTrash, FaPause, FaPlay } from 'react-icons/fa';
import axios from 'axios';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin`);
        const verifiedBusinesses = response.data.filter(business => business.status.toLowerCase() === "verified");
        setApiBusinesses(verifiedBusinesses);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeApiBusiness = (index) => {
    const updatedApiBusinesses = apiBusinesses.filter((_, i) => i !== index);
    setApiBusinesses(updatedApiBusinesses);
    setIsModalOpen(false);
  };

  const confirmDelete = (index) => {
    setDeleteIndex(index);
    setIsModalOpen(true);
  };

  const handleStatusChange = (index) => {
        setApiBusinesses((prevBusinesses) =>
          prevBusinesses.map((business, i) =>
            i === index 
              ? { ...business, status: business.status === "verified" ? "suspended" : "verified" } 
              : business
          )
        );
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

  const saveApiEdit = (index) => {
    setApiBusinesses((prevBusinesses) =>
      prevBusinesses.map((business, i) =>
        i === index ? { 
          ...business, 
          companyname: editedBusiness.companyName, 
          email: editedBusiness.email, 
          phonenumber: editedBusiness.phoneNumber 
        } : business
      )
    );
    setEditIndex(null);
    setEditedBusiness({});
  };

  const handleSuspend = (index) => {
    setSuspendIndex(index);
    setIsSuspendModalOpen(true);
  };

  const confirmSuspend = () => {
    setApiBusinesses((prevBusinesses) =>
      prevBusinesses.map((business, i) =>
        i === suspendIndex 
          ? { ...business, status: "suspended", suspendReason: suspendReason } 
          : business
      )
    );
    setSuspendReason('');
    setIsSuspendModalOpen(false);
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
                    <td>
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="companyName"
                          value={editedBusiness.companyName}
                          onChange={handleEditChange}
                        />
                      ) : (
                        business.companyname
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="email"
                          name="email"
                          value={editedBusiness.email}
                          onChange={handleEditChange}
                        />
                      ) : (
                        business.email
                      )}
                    </td>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editedBusiness.phoneNumber}
                          onChange={handleEditChange}
                        />
                      ) : (
                        business.phonenumber
                      )}
                    </td>
                    <td>{business.status}</td>
                    <td>{business.created_at}</td>
                    <td>
                      {editIndex === index ? (
                        <button onClick={() => saveApiEdit(index)} style={{ border: 'none', color: 'white', backgroundColor: 'gray' }}>Save</button>
                      ) : (
                        <FaEdit title='edit' className={`action-icon edit-icon`} onClick={() => startEditing(index)} />
                      )}
                      <FaTrash title='delete' className={`action-icon delete-icon`} onClick={() => confirmDelete(index)} />
                      {business.status === "verified" ? (
                        <FaPause title="Suspend" className={`action-icon edit-icon`} onClick={() => handleSuspend(index)} />
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
                <button onClick={() => removeApiBusiness(deleteIndex)}>Delete</button>
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
                <button onClick={confirmSuspend}>Suspend</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllBusinesses;
