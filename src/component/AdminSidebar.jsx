// // src/components/Sidebar.js

// import React, { useState } from 'react';
// import { FaUser, FaBusinessTime, FaCog, FaSignOutAlt, FaAngleDown } from 'react-icons/fa';
// import '../assets/sidebar.css'; // Import CSS for styling
// import { Link } from 'react-router-dom';

// const AdminSidebar = () => {
//     const [userDropdown, setUserDropdown] = useState(false);
//     const [businessDropdown, setBusinessDropdown] = useState(false);

//     return (
//         <div className="sidebar">
//             <h2 className="sidebar-title">NationalGreenPages</h2>
//             <ul className="sidebar-list">
//                 <li className="sidebar-item">
//                     <Link style={{fontSize:'28px'}} to="/dashboard">Dashboard</Link>
//                 </li>
//                 <li className="sidebar-item">
//                     <Link style={{fontSize:'22px'}} href="/admin">
//                         <FaCog /> Admin
//                     </Link>
//                 </li>
//                 <li className="sidebar-item" onClick={() => setUserDropdown(!userDropdown)}>
//                     <span>
//                         <FaUser /> Users <FaAngleDown />
//                     </span>
//                     {userDropdown && (
//                         <ul className="dropdown">
//                             <li><Link to="/add-user">All User</Link></li>
//                             <li><Link to="/manage-users">Add Users</Link></li>
//                         </ul>
//                     )}
//                 </li>
//                 <li className="sidebar-item" onClick={() => setBusinessDropdown(!businessDropdown)}>
//                     <span>
//                         <FaBusinessTime /> Businesses <FaAngleDown />
//                     </span>
//                     {businessDropdown && (
//                         <ul className="dropdown">
//                             <li><Link to="/add">All Business</Link></li>
//                             <li><Link to="/business">Add Business</Link></li>
//                         </ul>
//                     )}
//                 </li>
//                 <li className="sidebar-item">
//                     <Link style={{fontSize:'22px'}} to="/logout">
//                         <FaSignOutAlt /> Log Out
//                     </Link>
//                 </li>
//             </ul>
//         </div>
//     );
// };

// export default AdminSidebar;


import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaList, FaUserPlus, FaBuilding, FaBriefcase, FaPlusCircle, FaSignOutAlt, FaBars, FaCaretDown } from 'react-icons/fa';
import '../assets/sidebar.css';

const AdminSidebar = () => {
  const [isUsersOpen, setIsUsersOpen] = useState(false);
  const [isBusinessesOpen, setIsBusinessesOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleUsers = () => setIsUsersOpen(prev => !prev);
  const toggleBusinesses = () => setIsBusinessesOpen(prev => !prev);
  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

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
            <Link to="/dashboard">
              <FaTachometerAlt style={{marginRight:'10px'}}/> Admin Dashboard
            </Link>
          </li>
          <li>
            <div onClick={toggleUsers} className="dropdown-toggle">
              <FaUsers style={{marginRight:'10px'}}/> Users <FaCaretDown style={{ marginLeft: '8px' }} />
            </div>
            <ul className={`dropdown-menu ${isUsersOpen ? 'open' : ''}`}>
              <li>
                <Link to="/users">
                  <FaList style={{marginRight:'10px'}}/> All Users
                </Link>
              </li>
              <li>
                <Link to="/add-user">
                  <FaUserPlus style={{marginRight:'10px'}}/> Add User
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <div onClick={toggleBusinesses} className="dropdown-toggle">
              <FaBuilding style={{marginRight:'10px'}}/> Businesses <FaCaretDown style={{ marginLeft: '8px' }} />
            </div>
            <ul className={`dropdown-menu ${isBusinessesOpen ? 'open' : ''}`}>
              <li>
                <Link to="/business">
                  <FaBriefcase style={{marginRight:'10px'}}/> All Businesses
                </Link>
              </li>
              <li>
                <Link to="/add">
                  <FaPlusCircle style={{marginRight:'10px'}}/> Add Business
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/logout">
              <FaSignOutAlt style={{marginRight:'10px'}}/> Logout
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;




