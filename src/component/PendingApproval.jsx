// import React, { useContext, useState } from 'react';
// import { DataContext } from '../context/DataContext';
// import '../assets/pending.css';
// import AdminHeader from './AdminHeader';
// import AdminSidebar from './AdminSidebar';

// const PendingApproval = () => {
//     const { businesses, approveBusiness } = useContext(DataContext);
//     const pendingBusinesses = businesses.filter(business => business.status === 'pending');
//     const [selectedBusiness, setSelectedBusiness] = useState(null);

//     const handleBusinessClick = (business) => {
//         setSelectedBusiness(business);
//     };

//     return (
//         <div>
//             <AdminHeader />
//             <AdminSidebar />
//             <div className='pend-head'>
//                 <h1>
//                     Pending Approval Businesses
//                 </h1>
//             </div>
            
//             <div className="pending-approval">
//                 {selectedBusiness ? (
//                     // Show selected business details only
//                     <div className="business-details" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px auto', maxWidth: '600px' }}>
//                         <h2>Business Details</h2>
//                         <p><strong>Company Name:</strong> {selectedBusiness.companyname}</p>
//                         <p><strong>Email:</strong> {selectedBusiness.email}</p>
//                         <p><strong>Phone:</strong> {selectedBusiness.phonenumber}</p>
//                         <p><strong>Status:</strong> {selectedBusiness.status}</p>
//                         <p><strong>Town:</strong> {selectedBusiness.town}</p>
//                         <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
//                         <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
//                         <p><strong>Whatsapp Number:</strong> {selectedBusiness.whatsappnumber}</p>
//                         <p><strong>Website:</strong> {selectedBusiness.website}</p>
//                         <p><strong>State:</strong> {selectedBusiness.state}</p>
//                         <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
//                         <p><strong>Ceo Image:</strong> {selectedBusiness.ceoimg}</p>
//                         <p><strong>Logo:</strong> {selectedBusiness.logo}</p>
//                         <button onClick={() => setSelectedBusiness(null)}>Close</button>
//                     </div>
//                 ) : (
//                     // Show list of pending businesses
//                     <>
//                         {pendingBusinesses.length === 0 ? (
//                             <p>No businesses pending approval.</p>
//                         ) : (
//                             <ul>
//                                 {pendingBusinesses.map((business) => (
//                                     <li key={business.id} onClick={() => handleBusinessClick(business)} style={{ cursor: 'pointer' }}>
//                                         <h2>{business.companyname}</h2>
//                                         <p>Email: {business.email}</p>
//                                         <p>Phone: {business.phonenumber}</p>
//                                         <p>Status: {business.status}</p>
//                                         <button onClick={() => approveBusiness(business.id)}>Approve</button>
//                                     </li>
//                                 ))}
//                             </ul>
//                         )}
//                     </>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default PendingApproval;


import React, { useContext, useState } from 'react';
import { DataContext } from '../context/DataContext';
import '../assets/pending.css';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import { FaCheckCircle, FaBan } from 'react-icons/fa';

const PendingApproval = () => {
    const { businesses, approveBusiness, rejectBusiness } = useContext(DataContext);
    const pendingBusinesses = businesses.filter(business => business.status === 'pending');
    const [selectedBusiness, setSelectedBusiness] = useState(null);

    const handleBusinessClick = (business) => {
        setSelectedBusiness(business);
    };

    return (
        <div>
            <AdminHeader />
            <AdminSidebar />
            <div className='pend-head'>
                <h1>Pending Approval Businesses</h1>
            </div>
            
            <div className="pending-approval">
                {selectedBusiness ? (
                    <div className="business-details" style={{ padding: '20px', border: '1px solid #ddd', borderRadius: '8px', margin: '20px auto', maxWidth: '600px' }}>
                        <h2>Business Details</h2>
                        <p><strong>Company Name:</strong> {selectedBusiness.companyname}</p>
                        <p><strong>Email:</strong> {selectedBusiness.email}</p>
                        <p><strong>Phone:</strong> {selectedBusiness.phonenumber}</p>
                        <p><strong>Status:</strong> {selectedBusiness.status}</p>
                        <p><strong>Town:</strong> {selectedBusiness.town}</p>
                        <p><strong>Local Government:</strong> {selectedBusiness.localgovernment}</p>
                        <p><strong>Category of Business:</strong> {selectedBusiness.categoryofbusiness}</p>
                        <p><strong>Whatsapp Number:</strong> {selectedBusiness.whatsappnumber}</p>
                        <p><strong>Website:</strong> {selectedBusiness.website}</p>
                        <p><strong>State:</strong> {selectedBusiness.state}</p>
                        <p><strong>Staff Strength:</strong> {selectedBusiness.staffstrength}</p>
                        <p><strong>Ceo Image:</strong> {selectedBusiness.ceoimg}</p>
                        <p><strong>Logo:</strong> {selectedBusiness.logo}</p>
                        <button onClick={() => setSelectedBusiness(null)}>Close</button>
                    </div>
                ) : (
                    <>
                        {pendingBusinesses.length === 0 ? (
                            <p>No businesses pending approval.</p>
                        ) : (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Company Name</th>
                                        <th>Email</th>
                                        <th>Phone Number</th>
                                        <th>Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {pendingBusinesses.map((business) => (
                                        <tr key={business.id} onClick={() => handleBusinessClick(business)} style={{ cursor: 'pointer' }}>
                                            <td>{business.companyname}</td>
                                            <td>{business.email}</td>
                                            <td>{business.phonenumber}</td>
                                            <td>{business.status}</td>
                                            <td>
                                                <FaCheckCircle 
                                                    title="Approve" 
                                                    onClick={(e) => { e.stopPropagation(); approveBusiness(business.id); }} 
                                                    style={{ cursor: 'pointer', marginRight: '10px', color: business.status === 'verified' ? 'gray' : 'green' }} 
                                                />
                                                <FaBan 
                                                    title="Reject" 
                                                    onClick={(e) => { e.stopPropagation(); rejectBusiness(business.id); }} 
                                                    style={{ cursor: 'pointer', color: 'red' }} 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default PendingApproval;
