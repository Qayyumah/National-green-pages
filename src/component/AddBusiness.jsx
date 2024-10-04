import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AdminHeader from './AdminHeader';
import AdminSidebar from './AdminSidebar';
import '../assets/add-business.css';
import { DataContext } from '../context/DataContext';

const validationSchema = Yup.object().shape({
  companyname: Yup.string().required('Company name is required'),
  email: Yup.string().email('Email is invalid').required('Email is required'),
  phonenumber: Yup.string()
    .matches(/^[0-9]+$/, 'Phone number must be numeric')
    .required('Phone number is required'),
  town: Yup.string().required('Town is required'),
  city: Yup.string().required('City is required'),
  state: Yup.string().required('State is required'),
  dateCreated: Yup.date().required('Date is required').nullable(),
});

const AddBusiness = () => {
  const navigate = useNavigate();
  const [modalMessage, setModalMessage] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {loggedInUser} = useContext(DataContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  useEffect(() => {
    const today = new Date().toISOString().slice(0, 10);
    setValue('dateCreated', today);
  }, [setValue]);

  const onSubmit = async (data) => {
    const businessData = { ...data, status: 'Pending' };

    const token = localStorage.getItem('token');
        if (!token) {
            setModalMessage('You must be logged in to post a business.');
            return;
        }
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/add-business/`, businessData, {
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      if (response.status === 201) {
        setModalMessage('Business added successfully!');
        setIsModalOpen(true);
        setTimeout(() => navigate('/pending'), 2000);
      }
    } catch (error) {
      setModalMessage(error.response?.data?.detail || 'Failed to add business');
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="add-business-container">
      <AdminHeader />
      <AdminSidebar />
      <div className="form-container">
        <h2>Add New Business</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="business-form">
          <div className="form-group">
            <label htmlFor="companyname">Company Name</label>
            <input id="companyname" type="text" {...register('companyname')} />
            {errors.companyname && <p className="error">{errors.companyname.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input id="email" type="email" {...register('email')} />
            {errors.email && <p className="error">{errors.email.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="phonenumber">Phone Number</label>
            <input id="phonenumber" type="tel" {...register('phonenumber')} />
            {errors.phonenumber && <p className="error">{errors.phonenumber.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="town">Town</label>
            <input id="town" type="text" {...register('town')} />
            {errors.town && <p className="error">{errors.town.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="city">City</label>
            <input id="city" type="text" {...register('city')} />
            {errors.city && <p className="error">{errors.city.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="dateCreated">Date Created</label>
            <input id="dateCreated" type="date" {...register('dateCreated')} />
            {errors.dateCreated && <p className="error">{errors.dateCreated.message}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="state">State</label>
            <input id="state" type="text" {...register('state')} />
            {errors.state && <p className="error">{errors.state.message}</p>}
          </div>

          <button type="submit">Add Business</button>
        </form>

        {isModalOpen && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h2>{modalMessage}</h2>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBusiness;

