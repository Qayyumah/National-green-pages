import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../context/DataContext';
import UserHeader from '../component/UserHeader';
import UserSidebar from '../component/UserSidebar';
import '../assets/userManage.css';

const UserManagePage = () => {
    const { loggedInUser, businesses, setBusinesses } = useContext(DataContext);
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [userBusinesses, setUserBusinesses] = useState([]);

    useEffect(() => {
        const filteredBusinesses = businesses.filter(business => business.userId === loggedInUser?.email);
        setUserBusinesses(filteredBusinesses);
    }, [loggedInUser, businesses]);

    const saveBusinessesToLocalStorage = (businesses) => {
        localStorage.setItem('businesses', JSON.stringify(businesses));
    };
    
    const handleEdit = (business) => {
        setEditingBusiness(business);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingBusiness(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setBusinesses(prevBusinesses =>
            prevBusinesses.map(business =>
                business.id === editingBusiness.id ? { ...editingBusiness } : business
            )
        );
        setEditingBusiness(null);
    };

    const handleDelete = (id) => {
        setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.id !== id));
    };

    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className="user-content">
                <h1>User Management Page</h1>

                {editingBusiness ? (
                    <div className="edit-form-container">
                        <h2>Edit Business</h2>
                        <form onSubmit={handleSubmit} className="edit-form">
                            <label>
                                Company Name:
                                <input
                                    type="text"
                                    name="companyname"
                                    value={editingBusiness.companyname}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Email:
                                <input
                                    type="email"
                                    name="email"
                                    value={editingBusiness.email}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                State:
                                <input
                                    type="text"
                                    name="state"
                                    value={editingBusiness.state}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Local Government:
                                <input
                                    type="text"
                                    name="localgovernment"
                                    value={editingBusiness.localgovernment}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Town/City:
                                <input
                                    type="text"
                                    name="town"
                                    value={editingBusiness.town}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Phone Number:
                                <input
                                    type="text"
                                    name="phonenumber"
                                    value={editingBusiness.phonenumber}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                WhatsApp Number:
                                <input
                                    type="text"
                                    name="whatsappnumber"
                                    value={editingBusiness.whatsappnumber}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Category of Business:
                                <input
                                    type="text"
                                    name="categoryofbusiness"
                                    value={editingBusiness.categoryofbusiness}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Website:
                                <input
                                    type="text"
                                    name="website"
                                    value={editingBusiness.website}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Staff Strength:
                                <input
                                    type="text"
                                    name="staffstrength"
                                    value={editingBusiness.staffstrength}
                                    onChange={handleChange}
                                />
                            </label>
                            <label>
                                Address:
                                <textarea
                                    name="address"
                                    value={editingBusiness.address}
                                    onChange={handleChange}
                                />
                            </label>
                            <button type="submit">Save Changes</button>
                            <button type="button" onClick={() => setEditingBusiness(null)}>Cancel</button>
                        </form>
                    </div>
                ) : (
                    <div>
                        <h2>Your Businesses</h2>
                        {userBusinesses.length > 0 ? (
                            <ul className="business-list">
                                {userBusinesses.map(business => (
                                    <li key={business.id} className="business-item">
                                        <h3>{business.companyname}</h3>
                                        <p><strong>Email:</strong> {business.email}</p>
                                        <p><strong>State:</strong> {business.state}</p>
                                        <p><strong>Local Government:</strong> {business.localgovernment}</p>
                                        <p><strong>Town/City:</strong> {business.town}</p>
                                        <p><strong>Phone Number:</strong> {business.phonenumber}</p>
                                        <p><strong>WhatsApp Number:</strong> {business.whatsappnumber}</p>
                                        <p><strong>Category of Business:</strong> {business.categoryofbusiness}</p>
                                        <p><strong>Website:</strong> {business.website}</p>
                                        <p><strong>Staff Strength:</strong> {business.staffstrength}</p>
                                        <p><strong>Address:</strong> {business.address}</p>
                                        <div className="buttons">
                                            <button onClick={() => handleEdit(business)}>Edit</button>
                                            <button onClick={() => handleDelete(business.id)}>Delete</button>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p>No businesses found.</p>
                        )}
                    </div>
                )}
            </div>
   
        </div>
    );
};

export default UserManagePage;
