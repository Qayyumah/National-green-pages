import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import UserHeader from '../component/UserHeader';
import UserSidebar from '../component/UserSidebar';
import '../assets/userManage.css';

const UserManagePage = () => {
    const [businesses, setBusinesses] = useState([]);
    const [editingBusiness, setEditingBusiness] = useState(null);
    const [modalBusiness, setModalBusiness] = useState(null);
    const [confirmDelete, setConfirmDelete] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchBusinesses = async () => {
            setLoading(true);
            setError('');
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/user-businesses/`, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem('token')}`,
                    },
                });
                setBusinesses(response.data);
            } catch (error) {
                setError('Error fetching businesses. Please check your network connection.');
            } finally {
                setLoading(false);
            }
        };

        fetchBusinesses();
    }, []);

    const handleEdit = (business) => {
        setEditingBusiness(business);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditingBusiness(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/user-businesses/${editingBusiness.email}`, editingBusiness);
            if (response.status === 200) {
                setBusinesses(prevBusinesses =>
                    prevBusinesses.map(business =>
                        business.email === editingBusiness.email ? { ...editingBusiness } : business
                    )
                );
                setEditingBusiness(null);
            }
        } catch (error) {
            setError('Error updating business. Please try again.');
        }
    };

    const handleDeleteClick = (email) => {
        setConfirmDelete(email);
    };

    const handleConfirmDelete = async () => {
        try {
            const response = await axios.delete(`${process.env.REACT_APP_API_URL}/api/user-businesses/${confirmDelete}`);
            if (response.status === 200) {
                setBusinesses(prevBusinesses => prevBusinesses.filter(business => business.email !== confirmDelete));
                setConfirmDelete(null);
            }
        } catch (error) {
            setError('Error deleting business. Please try again.');
        }
    };

    const handleCancelDelete = () => {
        setConfirmDelete(null);
    };

    const handleModalOpen = (business) => {
        setModalBusiness(business);
    };

    const handleModalClose = () => {
        setModalBusiness(null);
    };

    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className="user-content">
                <h1>User Management Page</h1>

                {loading ? (
                    <p>Loading businesses...</p>
                ) : error ? (
                    <p style={{ color: 'red' }}>{error}</p>
                ) : editingBusiness ? (
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
                                    type="text"
                                    name="email"
                                    value={editingBusiness.email}
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
                        {businesses.length > 0 ? (
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
                                    {businesses.map(business => (
                                        <tr key={business.email} onClick={() => handleModalOpen(business)} style={{ cursor: 'pointer' }}>
                                            <td>{business.companyname}</td>
                                            <td>{business.email}</td>
                                            <td>{business.phonenumber}</td>
                                            <td>{business.status}</td>
                                            <td>{new Date(business.dateCreated).toLocaleDateString()}</td>
                                            <td>
                                                <FaEdit onClick={(e) => { e.stopPropagation(); handleEdit(business); }} style={{ cursor: 'pointer', marginRight: '10px' }} />
                                                <FaTrash onClick={(e) => { e.stopPropagation(); handleDeleteClick(business.email); }} style={{ cursor: 'pointer', color: 'red' }} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No businesses found.</p>
                        )}
                    </div>
                )}

                {modalBusiness && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleModalClose}>&times;</span>
                            <h3>{modalBusiness.companyname}</h3>
                            <p>Email: {modalBusiness.email}</p>
                            <p>Phone Number: {modalBusiness.phonenumber}</p>
                            <p>WhatsApp Number: {modalBusiness.whatsappnumber}</p>
                            <p>State: {modalBusiness.state}</p>
                            <p>Local Government: {modalBusiness.localgovernment}</p>
                            <p>Town/City: {modalBusiness.town}</p>
                            <p>Category of Business: {modalBusiness.categoryofbusiness}</p>
                            <p>Website: {modalBusiness.website}</p>
                            <p>Staff Strength: {modalBusiness.staffstrength}</p>
                            <p>Address: {modalBusiness.address}</p>
                        </div>
                    </div>
                )}

                {confirmDelete && (
                    <div className="modal">
                        <div className="modal-content">
                            <h3>Confirm Deletion</h3>
                            <p>Are you sure you want to delete this business?</p>
                            <button onClick={handleConfirmDelete}>Yes, delete</button>
                            <button onClick={handleCancelDelete}>Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default UserManagePage;

