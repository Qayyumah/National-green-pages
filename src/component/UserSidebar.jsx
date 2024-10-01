// import React from 'react'
// import { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { FaTachometerAlt, FaUsers, FaList, FaUserPlus, FaBuilding, FaBriefcase, FaPlusCircle, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';

// const UserSidebar = () => {
//     const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);
//     const [isSidebarOpen, setIsSidebarOpen] = useState(false);

//     const toggleBusinesses = () => setIsBusinessesOpen(prev => !prev);
//     const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

//   return (
//     <div>
//       <button className="toggle-button" onClick={toggleSidebar}>
//         <FaBars />
//       </button>
//       <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
//         <div className="sidebar-header">
//           <h2>NationalGreenPages</h2>
//         </div>
//         <ul className="sidebar-menu">
//           <li>
//             <Link to="/user-dashboard">
//               <FaTachometerAlt style={{marginRight:'10px'}}/> User Dashboard
//             </Link>
//           </li>
//           <li>
//           <div onClick={toggleBusinesses} className="dropdown-toggle">
//             <FaBuilding style={{marginRight:'10px'}}/> Businesses <FaCaretDown style={{ marginLeft: '8px' }} />
//           </div>
//           <ul className={`dropdown-menu ${isBusinessesOpen ? 'open' : ''}`}>
//             <li>
//               <Link to="/user-all">
//                 <FaBriefcase style={{marginRight:'10px'}}/> Manage Businesses
//               </Link>
//             </li>
//             <li>
//               <Link to="/user-pending">
//                 <FaBriefcase style={{marginRight:'10px'}}/> Business Pending Approval
//               </Link>
//             </li>
//           </ul>
//         </li>
//         <li>
//           <Link to="/notification">
//             <FaSignOutAlt style={{marginRight:'10px'}}/> Notification
//           </Link>
//         </li>
//           <li>
//             <Link to="/user-logout">
//               <FaSignOutAlt style={{marginRight:'10px'}}/> Logout
//             </Link>
//           </li>
//         </ul>
//       </nav>
//     </div>
//   )
// }

// export default UserSidebar

import React, { useContext } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaBuilding, FaBriefcase, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';
import { DataContext } from '../context/DataContext'; // Import your context

const UserSidebar = () => {
    const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const toggleBusinesses = () => setIsBusinessesOpen(prev => !prev);
    const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

    const { message } = useContext(DataContext);
    const messageCount = message.length;

    return (
        <div>
            <button className="toggle-button" onClick={toggleSidebar}>
                <FaBars />
            </button>
            <nav className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>NationalGreenPages</h2>
                </div>
                <ul className="sidebar-menu">
                    <li>
                        <Link to="/user-dashboard">
                            <FaTachometerAlt style={{ marginRight: '10px' }} /> User Dashboard
                        </Link>
                    </li>
                    <li>
                        <div onClick={toggleBusinesses} className="dropdown-toggle">
                            <FaBuilding style={{ marginRight: '10px' }} /> Businesses <FaCaretDown style={{ marginLeft: '8px' }} />
                        </div>
                        <ul className={`dropdown-menu ${isBusinessesOpen ? 'open' : ''}`}>
                            <li>
                                <Link to="/user-all">
                                    <FaBriefcase style={{ marginRight: '10px' }} /> Manage Businesses
                                </Link>
                            </li>
                            <li>
                                <Link to="/user-pending">
                                    <FaBriefcase style={{ marginRight: '10px' }} /> Business Pending Approval
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/user-message">
                            <FaSignOutAlt style={{ marginRight: '10px' }} /> Notification
                            {messageCount > 0 && <span className="notification-count">{messageCount}</span>}
                        </Link>
                    </li>
                    <li>
                        <Link to="/user-logout">
                            <FaSignOutAlt style={{ marginRight: '10px' }} /> Logout
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default UserSidebar;
