import React, { useContext } from 'react';
import { DataContext } from '../context/DataContext';
import UserHeader from '../component/UserHeader';
import UserSidebar from '../component/UserSidebar';
import '../assets/userManage.css';

const UserPendingBusiness = () => {
    const { businesses, loggedInUser } = useContext(DataContext);

    const userBusinesses = loggedInUser
    ? businesses.filter(business => business.userId === loggedInUser.email)
    : businesses;

  
    return (
        <div>
            <UserHeader />
            <UserSidebar />
            <div className="user-content">
                <h1>Your Business Status</h1>
                {userBusinesses.length > 0 ? (
                    <ul className="pending-business-list">
                        {userBusinesses.map(business => (
                            <li key={business.id} className="pending-business-item">
                                <h3>{business.companyname}</h3>
                                <p>
                                    <strong>Status:</strong> 
                                    {business.status === 'pending' ? ' Pending Approval' : ' Approved'}
                                </p>
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
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No businesses found.</p>
                )}
            </div>
        </div>
    );
};

export default UserPendingBusiness;