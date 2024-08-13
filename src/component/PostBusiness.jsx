import React from 'react'
import '../assets/post.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'


const PostBusiness = () => {

    // const [values, setValues] = useState({
    //     companyname:'',
    //     email:'',
    //     state:'',
    //     localgovernment:'',
    //     town:'',
    //     phonenumber:'',
    //     whatsappnumber:'',
    //     categoryofbusiness:'',
    //     website:'',
    //     staffstrength:'',
    //     selfiephoto:'',
    //     productphoto:'',
    //     address:''
    // })
   


    const schema = yup.object().shape({
        companyname: yup.string().required('Name is required!'),
        email: yup.string().email('Email is not valid').required('Email is required!'),
        state: yup.string().required('State is required'),
        localgovernment: yup.string().required('This field is required!'),
        town: yup.string().required('Please enter your town'),
        phonenumber: yup.string().required('Phone number is required').matches(/^\d{11}$/, "Phone number is not valid"),
        whatsappnumber: yup.string().required('Enter your whatsapp number'),
        categoryofbusiness: yup.string().required('Input a Business Category'),
        website: yup.string().required('Website is required'),
        staffstrength: yup.string().required('Required!'),
        address: yup.string().required('Required!')    
    })

    const {register, handleSubmit, formState: {errors}} = useForm({
        resolver: yupResolver(schema)
    })

    const SubmitForm = (data) => {
        // e.preventDefault()
        console.log(data)

    }

    const handleChange = () => {
        // setValues({...values, [e.target.name]:[e.target.value]})
    }
    const [image, setImage] = useState('images/upload.png')
    const [productImage, setProductImage] = useState('images/upload.png')

    const handleImage = (e)=>{
        setImage(URL.createObjectURL(e.target.files[0]))
        console.log(image)
    }

    const handleProduct = (e)=>{
        setProductImage(URL.createObjectURL(e.target.files[0]))
    }
  return (
    <div className='post'>
        <Header/>
        <div className='form'>
            <h1>Data Collation Form</h1>
            <form onSubmit={handleSubmit(SubmitForm)}>
                <label for='name'>Company Name*</label>
                <input type='text' name='companyname'  
                onChange={(e)=> handleChange(e)}
                {...register("companyname")}/>
                <p>{errors.companyname?.message}</p>

                <label for='email'>Email</label>
                <input type='text' name='email' 
                onChange={(e)=> handleChange(e)}
                {...register("email")}/>
                <p>{errors.email?.message}</p>

                <label for='name'>State</label>
                <input type='text' name='state' 
                onChange={(e)=> handleChange(e)}
                {...register("state")}/>
                <p>{errors.state?.message}</p>

                <label for='name'>Local Government</label>
                <input type='text' name='localgovernment' 
                onChange={(e)=> handleChange(e)}
                {...register("localgovernment")}/>
                <p>{errors.localgovernment?.message}</p>

                <label for='name'>Town/City</label>
                <input type='text' name='town' 
                onChange={(e)=> handleChange(e)}
                {...register("town")}/>
                <p>{errors.town?.message}</p>

                <label for='name'>Phone Number*</label>
                <input type='text' name='phonenumber' 
                onChange={(e)=> handleChange(e)} 
                {...register("phonenumber")}/>
                <p>{errors.phonenumber?.message}</p>


                <label for='name'>WhatsAPP Number*</label>
                <input type='text' name='whatsappnumber' 
                onChange={(e)=> handleChange(e)}
                {...register("whatsappnumber")}/>
                <p>{errors.whatsappnumber?.message}</p>
                

                <label for='name'>Category Of Business</label>
                <input type='text' name='categoryofbusiness' 
                onChange={(e)=> handleChange(e)}
                {...register("categoryofbusiness")}/>
                <p>{errors.categoryofbusiness?.message}</p>

                <label for='name'>Website</label>
                <input type='text' name='website' 
                onChange={(e)=> handleChange(e)}
                {...register("website")}/>
                <p>{errors.website?.message}</p>

                <label for='name'>Staff strength</label>
                <input type='text' name='staffstrength' 
                onChange={(e)=> handleChange(e)}
                {...register("staffstrength")}/>
                <p>{errors.staffstrength?.message}</p>

                <label for='name'>Selfie photo of CEO</label>
                <div className='upload'>
                    <input type='file' id='imgs' style={{display:'none'}} onChange={handleImage}/>
                    <img src={image} for='imgs'  />
                    <label htmlFor='imgs'>Upload a photo</label>
                </div>

                <label for='name'>Product/Signboard's photo</label>
                <div className='upload'>
                    <input type='file' id='productImg' style={{display:'none'}} onChange={handleProduct}/>
                    <img src={productImage} for='imgs' />
                    <label htmlFor='productImg'>Upload a photo</label>
                </div>

                <label>Address</label>
                <textarea name='address' 
                onChange={(e)=> handleChange(e)}
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