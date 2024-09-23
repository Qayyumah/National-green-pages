// import React, { useState } from 'react';
// import '../assets/dashboard.css';
// import AdminHeader from './AdminHeader';
// import AdminSidebar from './AdminSidebar';

// const UserManagement = () => {
//   const [users, setUsers] = useState([]);
//   const [newUser, setNewUser] = useState({ name: '', email: '', role: '' });

//   const addUser = (e) => {
//     e.preventDefault();
//     if (newUser.name && newUser.email && newUser.role) {
//       setUsers([...users, { ...newUser, id: Date.now() }]);
//       setNewUser({ name: '', email: '', role: '' });
//     }
//   };

//   const removeUser = (id) => {
//     setUsers(users.filter((user) => user.id !== id));
//   };

//   return (
//     <div>
//     <AdminHeader/>
//     <AdminSidebar/>
//     <div className="user-management">
//       <h2>User Management</h2>
//       <form onSubmit={addUser} className="user-form">
//         <input
//           type="text"
//           placeholder="Name"
//           value={newUser.name}
//           onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={newUser.email}
//           onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Role"
//           value={newUser.role}
//           onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
//           required
//         />
//         <button type="submit">Add User</button>
//       </form>

//       {users.length > 0 ? (
//         <ul className="user-list">
//           {users.map((user) => (
//             <li key={user.id} className="user-item">
//               <span>{user.name}</span>
//               <span>{user.email}</span>
//               <span>{user.role}</span>
//               <button onClick={() => removeUser(user.id)} className="remove-button">Remove</button>
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No users added yet.</p>
//       )}
//     </div>
//     </div>
//   );
// };

// export default UserManagement;

import React, { useState } from 'react';
import AddUser from './AddUser';

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  
  const addUser = (newUser) => {
    setUsers([...users, newUser]);
  };

  return (
    <div>
      <h1>Users</h1>
      <AddUser onAdd={addUser} />
      <ul>
        {users.map((user, index) => (
          <li key={index}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserManagement;
