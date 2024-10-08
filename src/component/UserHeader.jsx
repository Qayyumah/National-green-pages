import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBell } from 'react-icons/fa';
import axios from 'axios';
import '../assets/user-dashboard.css';


const UserHeader = () => {
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const [modalNotification, setModalNotification] = useState(false);

  useEffect(() => {
    const Notifications = async () => {
      try {
        const response = await axios.get('/api/notifications'); 
        setNotifications(response.data);
        setNotificationCount(response.data.length);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
    Notifications();
  }, []);

  const openNotification = () => {
    setModalNotification(!modalNotification);
  };

  return (
    <header className="header">
      <h1>User Dashboard</h1>
      <div className="header-right">
        <Link to="/">view site</Link>
        <div className="notification-container">
          <FaBell className="notification-icon" onClick={openNotification} />
          {notificationCount > 0 && (
            <span className="notification-badge">{notificationCount}</span>
          )}
        </div>
      </div>

      {modalNotification && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Notifications</h2>
            <button onClick={openNotification} className="close-button">Close</button>
            {notifications.length > 0 ? (
              <ul>
                {notifications.map((notification, index) => (
                  <li key={index}>{notification.message}</li>
                ))}
              </ul>
            ) : (
              <p>No notifications available.</p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default UserHeader;

