import React, { useEffect } from 'react'
import axios from 'axios'
import '../assets/post.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import { Navigate } from 'react-router-dom'



const PostBusiness = () => {
    const [image, setImage] = useState('images/upload.png')
    const [productImage, setProductImage] = useState('images/upload.png')
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState('')

    const schema = yup.object().shape({
        companyname: yup.string().required('Name is required!'),
        email: yup.string().email('Email is not valid').required('Email is required!'),
        state: yup.string().required('State is required'),
        localgovernment: yup.string().required('This field is required!'),
        town: yup.string().required('Please enter your town'),
        phonenumber: yup.string().required('Phone number is required').matches(/^\d{11}$/, "Phone number is not valid"),
        whatsappnumber: yup.string().required('Enter your whatsapp number').matches(/^\d{11}$/, 'Number is not valid'),
        categoryofbusiness: yup.string().required('Input a Business Category'),
        website: yup.string().required('Website is required'),
        staffstrength: yup.string().required('Required!'),
        ceoImg: yup.string(),
        logo: yup.string(),
        address: yup.string().required('Required!'),
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const SubmitForm = (data)=>{
        axios.post(`${process.env.REACT_APP_API_URL}/api/add-business/`, data, {
            headers:{
                Authorization: `Token ${localStorage.getItem('token')}`
            }
        })
        .then(response=>{
            alert('Business created sucessfully')
            setSuccess(true)
        })
        .catch(error =>{
            alert('Error creating a new business')
        })
    }
    if(success){
       return <Navigate to='/' replace={true}/>
    }

    const handleImage = (e)=>{
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log(image)
    }

    const handleProduct = (e)=>{
        setProductImage(URL.createObjectURL(e.target.files[0]))
    }
    // {success && (
    //     <div style={{color:'green', marginLeft:'20px', fontSize:'17px'}}>{success}</div>
    //   )}
    //   {error && (
    //     <div style={{color:'red', marginLeft:'20px', fontSize:'17px'}}>{error}</div>
    //   )}
    
  return (
    <div className='post'>
        <Header/>
        <div className='form'>
            <h1>Data Collation Form</h1>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <label for='name'>Company Name</label>
                <input type='text' name='companyname'  
                {...register("companyname")}/>
                <p>{errors.companyname?.message}</p>

                <label for='email'>Email</label>
                <input type='text' name='email' 
                {...register("email")}/>
                <p>{errors.email?.message}</p>

                <label for='name'>State</label>
                <input type='text' name='state' 
                {...register("state")}/>
                <p>{errors.state?.message}</p>

                <label for='name'>Local Government</label>
                <input type='text' name='localgovernment' 
                {...register("localgovernment")}/>
                <p>{errors.localgovernment?.message}</p>

                <label for='name'>Town/City</label>
                <input type='text' name='town' 
                {...register("town")}/>
                <p>{errors.town?.message}</p>

                <label for='name'>Phone Number</label>
                <input type='text' name='phonenumber' 
                {...register("phonenumber")}/>
                <p>{errors.phonenumber?.message}</p>


                <label for='name'>WhatsAPP Number</label>
                <input type='text' name='whatsappnumber' 
                {...register("whatsappnumber")}/>
                <p>{errors.whatsappnumber?.message}</p>
                

                <label for='name'>Category Of Business</label>
                <input type='text' name='categoryofbusiness' 
                {...register("categoryofbusiness")}/>
                <p>{errors.categoryofbusiness?.message}</p>

                <label for='name'>Website</label>
                <input type='text' name='website' 
                {...register("website")}/>
                <p>{errors.website?.message}</p>

                <label for='name'>Staff strength</label>
                <input type='text' name='staffstrength' 
                {...register("staffstrength")}/>
                <p>{errors.staffstrength?.message}</p>

                <label for='name'>Selfie photo of CEO</label>
                <div className='upload'>
                    <input 
                        type='file' 
                        id='imgs' 
                        style={{display:'none'}} 
                        onChange={handleImage}
                        
                    />
                    <img src={image} for='imgs'  />
                    <label htmlFor='imgs' {...register("ceoImg")}>Upload a photo</label>
                </div>

                <label for='name'>Product/Signboard's photo</label>
                <div className='upload'>
                    <input 
                        type='file' 
                        id='productImg' 
                        style={{display:'none'}} 
                        onChange={handleProduct}
                        
                    />
                    <img src={productImage} for='imgs' />
                    <label htmlFor='productImg' {...register("logo")}>Upload a photo</label>
                </div>

                <label>Address</label>
                <textarea name='address' 
                {...register("address")}></textarea>
                <p>{errors.address?.message}</p>

                <button type='submit'>Submit</button>
            </form>
        </div>

        <Footer/>
    </div>
  )
}

export default PostBusiness