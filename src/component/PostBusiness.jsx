import React from 'react'
import '../assets/post.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'

const PostBusiness = () => {

    const [values, setValues] = useState({
        companyname:'',
        email:'',
        state:'',
        localgovernment:'',
        town:'',
        phonenumber:'',
        whatsappnumber:'',
        categoryofbusiness:'',
        website:'',
        staffstrength:'',
        selfiephoto:'',
        productphoto:'',
        address:''
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

  return (
    <div className='post'>
        <Header/>
        <div className='form'>
            <h1>Data Collation Form</h1>
            <form onSubmit={handleSubmit}>
                <label for='name'>Company Name*</label>
                <input type='text' name='companyname' onChange={(e)=> handleChange(e)} required/>

                <label for='email'>Email*</label>
                <input type='text' name='email' onChange={(e)=> handleChange(e)} required/>

                <label for='name'>State</label>
                <input type='text' name='state' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Local Government</label>
                <input type='text' name='localgovernment' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Town/City</label>
                <input type='text' name='town' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Phone Number*</label>
                <input type='text' name='phonenumber' onChange={(e)=> handleChange(e)} required/>

                <label for='name'>WhatsAPP Number*</label>
                <input type='text' name='whatsappnumber' onChange={(e)=> handleChange(e)} required/>

                <label for='name'>Category Of Business</label>
                <input type='text' name='categoryofbusiness' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Website</label>
                <input type='text' name='website' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Staff strength</label>
                <input type='text' name='staffstrength' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Selfie photo of CEO</label>
                <input type='file' name='selfiephoto' placeholder='upload a photo' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Product/Signboard's photo</label>
                <input type='file' name='productphoto' placeholder='upload a photo' onChange={(e)=> handleChange(e)}/>

                <label>Address</label>
                <textarea name='address' onChange={(e)=> handleChange(e)}></textarea>

                <button type='submit'>Submit</button>
            </form>
        </div>
        <Footer/>
    </div>
  )
}

export default PostBusiness