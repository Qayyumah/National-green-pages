// import React, { useEffect, useState, useContext } from 'react';
// import { DataContext } from '../context/DataContext';
// import { Link } from 'react-router-dom';
// import AdminHeader from './AdminHeader';
// import AdminSidebar from './AdminSidebar';
// import '../assets/business-management.css';
// import { FaEdit, FaTrash, FaCheckCircle, FaBan,  FaPause, FaPlay } from 'react-icons/fa';
// import axios from 'axios';

// const AllBusinesses = () => {
//   const { businesses, setBusinesses } = useContext(DataContext);
//   const [apiBusinesses, setApiBusinesses] = useState([]);
//   const [editIndex, setEditIndex] = useState(null);
//   const [editedBusiness, setEditedBusiness] = useState({});
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin/`);
//         setApiBusinesses(response.data);
//       } catch (error) {
//         console.error("Error fetching businesses:", error);
//       } finally {
//         setLoading(false); // Set loading to false after data fetching
//       }
//     };

//     fetchData();
//   }, []);

//   const removeBusiness = (index) => {
//     const updatedBusinesses = businesses.filter((_, i) => i !== index);
//     setBusinesses(updatedBusinesses);
//   };

//   const handleStatusChange = (index, newStatus, isApiBusiness = false) => {
//     if (isApiBusiness) {
//       setApiBusinesses((prevBusinesses) =>
//         prevBusinesses.map((business, i) =>
//           i === index ? { ...business, status: newStatus } : business
//         )
//       );
//     } else {
//       setBusinesses((prevBusinesses) =>
//         prevBusinesses.map((business, i) =>
//           i === index ? { ...business, status: newStatus } : business
//         )
//       );
//     }
//   };

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditedBusiness((prev) => ({ ...prev, [name]: value }));
//   };

//   const saveEdit = (index) => {
//     setBusinesses((prevBusinesses) =>
//       prevBusinesses.map((business, i) =>
//         i === index ? { ...business, ...editedBusiness } : business
//       )
//     );
//     setEditIndex(null);
//     setEditedBusiness({});
//   };

//   const removeApiBusiness = (index) => {
//     const updatedApiBusiness = apiBusinesses.filter((_, i) => i !== index);
//     setApiBusinesses(updatedApiBusiness);
//   };

//   const handleApiEdit = (index) => {
//     setEditIndex(index + businesses.length); // Adjust index for API businesses
//     setEditedBusiness(apiBusinesses[index]);
//   };

//   const saveApiEdit = (index) => {
//     setApiBusinesses((prevBusinesses) =>
//       prevBusinesses.map((business, i) =>
//         i === index ? { ...business, ...editedBusiness } : business
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
//           <h1>Business List</h1>
//           <Link to="/add" className="add-business-button">Add Business</Link>
//         </div>
        
//         {loading ? ( 
//           <p>Loading...</p>
//         ) : (
//           businesses.length === 0 && apiBusinesses.length === 0 ? (
//             <p>No businesses available.</p>
//           ) : (
//             <table>
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
//                 {businesses.map((business, index) => (
//                   <tr key={index}>
//                     <td>
//                       {editIndex === index ? (
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={editedBusiness.companyName || business.companyName}
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
//                           value={editedBusiness.email || business.email}
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
//                           value={editedBusiness.phoneNumber || business.phoneNumber}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         business.phonenumber
//                       )}
//                     </td>
//                     <td>
//                       <select
//                         value={business.status}
//                         onChange={(e) => handleStatusChange(index, e.target.value)}
//                       >
//                         <option value="Pending">Pending</option>
//                         <option value="Verified">Verified</option>
//                       </select>
//                     </td>
//                     <td>{business.dateCreated}</td>
//                     <td>
//                       {editIndex === index ? (
//                         <button onClick={() => saveEdit(index)} style={{ border: 'none', color: 'white', backgroundColor: 'gray' }}>Save</button>
//                       ) : (
//                         <FaEdit className={`action-icon edit-icon`} onClick={() => {
//                           setEditIndex(index);
//                           setEditedBusiness({});
//                         }} />
//                       )}
//                       <FaTrash className={`action-icon delete-icon`} onClick={() => removeBusiness(index)} />
//                       {business.status === "Pending" ? (
//                         <FaCheckCircle className={`action-icon approve-icon`} onClick={() => handleStatusChange(index, "Verified")} />
//                       ) : (
//                         <FaBan className={`action-icon suspend-icon`} onClick={() => handleStatusChange(index, "Pending")} />
//                       )}
//                     </td>
//                   </tr>
//                 ))}
                
//                 {apiBusinesses.map((state, index) => (
//                   <tr key={index + businesses.length}>
//                     <td>
//                       {editIndex === index + businesses.length ? (
//                         <input
//                           type="text"
//                           name="companyName"
//                           value={editedBusiness.companyName || state.companyName}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         state.companyname
//                       )}
//                     </td>
//                     <td>
//                       {editIndex === index + businesses.length ? (
//                         <input
//                           type="email"
//                           name="email"
//                           value={editedBusiness.email || state.email}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         state.email
//                       )}
//                     </td>
//                     <td>
//                       {editIndex === index + businesses.length ? (
//                         <input
//                           type="tel"
//                           name="phoneNumber"
//                           value={editedBusiness.phoneNumber || state.phoneNumber}
//                           onChange={handleEditChange}
//                         />
//                       ) : (
//                         state.phonenumber
//                       )}
//                     </td>
//                     <td>{state.status}</td>
//                     <td>{state.dateCreated}</td>
//                     <td>
//                       {editIndex === index + businesses.length ? (
//                         <button onClick={() => saveApiEdit(index)} style={{ border: 'none', color: 'white', backgroundColor: 'gray' }}>Save</button>
//                       ) : (
//                         <FaEdit className={`action-icon edit-icon`} onClick={() => handleApiEdit(index)} />
//                       )}
//                        <FaTrash className={`action-icon delete-icon`} onClick={() => removeApiBusiness(index)} />
//                        {state.status === "Verified" ? (
//                         <>
//                           <FaPause title="Suspend" onClick={() => handleStatusChange(index, "Suspended", true)} />
//                         </>
//                       ) : (
//                         <>
//                           <FaPlay title="Reactivate" onClick={() => handleStatusChange(index, "Verified", true)} />
//                         </>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )
//         )}
//       </div>
//     </div>
//   );
// };

// export default AllBusinesses;

import React, { useEffect, useState, useContext } from 'react';
import { DataContext } from '../context/DataContext';
import { Link } from 'react-router-dom';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/business-management.css';
import { FaEdit, FaTrash, FaCheckCircle, FaBan, FaPause, FaPlay, FaSave } from 'react-icons/fa';
import axios from 'axios';

const AllBusinesses = () => {
  const { businesses, setBusinesses } = useContext(DataContext);
  const [apiBusinesses, setApiBusinesses] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editedBusiness, setEditedBusiness] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/businesses-in-admin/`);
        setApiBusinesses(response.data);
      } catch (error) {
        console.error("Error fetching businesses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const removeBusiness = (index) => {
    const updatedBusinesses = businesses.filter((_, i) => i !== index);
    setBusinesses(updatedBusinesses);
  };

  const handleStatusChange = (index, newStatus, isApiBusiness = false) => {
    if (isApiBusiness) {
      setApiBusinesses((prevBusinesses) =>
        prevBusinesses.map((business, i) =>
          i === index ? { ...business, status: newStatus } : business
        )
      );
    } else {
      setBusinesses((prevBusinesses) =>
        prevBusinesses.map((business, i) =>
          i === index ? { ...business, status: newStatus } : business
        )
      );
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness((prev) => ({ ...prev, [name]: value }));
  };

  const saveEdit = (index) => {
    setBusinesses((prevBusinesses) =>
      prevBusinesses.map((business, i) =>
        i === index ? { ...business, ...editedBusiness } : business
      )
    );
    setEditIndex(null);
    setEditedBusiness({});
  };

  const removeApiBusiness = (index) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this business?");
    if (confirmDelete) {
      const updatedApiBusiness = apiBusinesses.filter((_, i) => i !== index);
      setApiBusinesses(updatedApiBusiness);
    }
  };

  const handleApiEdit = (index) => {
    setEditIndex(index + businesses.length);
    setEditedBusiness(apiBusinesses[index]);
  };

  const saveApiEdit = (index) => {
    setApiBusinesses((prevBusinesses) =>
      prevBusinesses.map((business, i) =>
        i === index ? { ...business, ...editedBusiness } : business
      )
    );
    setEditIndex(null);
    setEditedBusiness({});
  };

  // Filter out rejected businesses
  const filteredBusinesses = businesses.filter(business => business.status !== 'rejected');

  return (
    <div>
      <AdminHeader />
      <AdminSidebar />
      <div className="all-businesses">
        <div className='all-header'>
          <h1>Business List</h1>
          <Link to="/add" className="add-business-button">Add Business</Link>
        </div>
        
        {loading ? ( 
          <p>Loading...</p>
        ) : (
          filteredBusinesses.length === 0 && apiBusinesses.length === 0 ? (
            <p>No businesses available.</p>
          ) : (
            <table>
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
                {filteredBusinesses.map((business, index) => (
                  <tr key={index}>
                    <td>
                      {editIndex === index ? (
                        <input
                          type="text"
                          name="companyName"
                          value={editedBusiness.companyName || business.companyName}
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
                          value={editedBusiness.email || business.email}
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
                          value={editedBusiness.phoneNumber || business.phoneNumber}
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
                        <FaSave className={`action-icon edit-icon`} onClick={() => saveEdit(index)}/>
                      ) : (
                        <FaEdit className={`action-icon edit-icon`} onClick={() => {
                          setEditIndex(index);
                          setEditedBusiness({});
                        }} />
                      )}
                      <FaTrash className={`action-icon delete-icon`} onClick={() => removeBusiness(index)} />
                      {business.status === "Pending" ? (
                        <FaCheckCircle className={`action-icon approve-icon`} onClick={() => handleStatusChange(index, "Verified")} />
                      ) : (
                        <FaBan className={`action-icon suspend-icon`} onClick={() => handleStatusChange(index, "Pending")} />
                      )}
                    </td>
                  </tr>
                ))}
                
                {apiBusinesses.map((state, index) => (
                  <tr key={index + filteredBusinesses.length}>
                    <td>
                      {editIndex === index + filteredBusinesses.length ? (
                        <input
                          type="text"
                          name="companyName"
                          value={editedBusiness.companyName || state.companyName}
                          onChange={handleEditChange}
                        />
                      ) : (
                        state.companyname
                      )}
                    </td>
                    <td>
                      {editIndex === index + filteredBusinesses.length ? (
                        <input
                          type="email"
                          name="email"
                          value={editedBusiness.email || state.email}
                          onChange={handleEditChange}
                        />
                      ) : (
                        state.email
                      )}
                    </td>
                    <td>
                      {editIndex === index + filteredBusinesses.length ? (
                        <input
                          type="tel"
                          name="phoneNumber"
                          value={editedBusiness.phoneNumber || state.phoneNumber}
                          onChange={handleEditChange}
                        />
                      ) : (
                        state.phonenumber
                      )}
                    </td>
                    <td>{state.status}</td>
                    <td>{state.created_at}</td>
                    <td>
                      {editIndex === index + filteredBusinesses.length ? (
                        <FaSave className={`action-icon edit-icon`} title="Save" onClick={() => saveApiEdit(index)} />
                      ) : (
                        <FaEdit className={`action-icon edit-icon`} title="Edit" onClick={() => handleApiEdit(index)} />
                      )}
                       <FaTrash className={`action-icon delete-icon`} title="Remove" onClick={() => removeApiBusiness(index)} />
                       {state.status === "Verified" ? (
                        <>
                          <FaPause className={`action-icon suspend-icon`} title="Suspend" onClick={() => handleStatusChange(index, "Suspended", true)} />
                        </>
                      ) : (
                        <>
                          <FaPlay className={`action-icon reactivate-icon`} title="Reactivate" onClick={() => handleStatusChange(index, "Verified", true)} />
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>
    </div>
  );
};

export default AllBusinesses;
