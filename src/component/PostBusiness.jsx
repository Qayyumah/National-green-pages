import React from 'react'
import '../assets/post.css'
import { useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import { set } from 'react-hook-form'


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
    const [companyName, setCompanyName] = useState('')
    const[emails, setEmails]= useState('')
    const [phone, setPhone] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [companyMessage, setCompanyMessage] = useState('')
    const [message , setMessage]=useState('')
    const [phoneMessage, setPhoneMessage]= useState('')
    const [whatsappMessage, setWhatsappMessage] = useState('')

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

  const handleInput=(emails)=>{
    const rgExp = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,6}$/
    if (rgExp.test(emails)) {
        setMessage('')
    }else if(emails === ""){
        setMessage('Please enter email')
    }else if(!rgExp.test(emails)){
        setMessage('Email is not valid')
    }else{
        setMessage('')
    }
  }

    const handlePhoneInput=(phone)=>{
        const pexp = /^\d{11}$/
        if (pexp.test(phone)){
            setPhoneMessage('')
        }else if(phone === ""){
            setPhoneMessage('Please enter your phone number')
        }else if(!pexp.test(phone)){
            setPhoneMessage('phone number is not valid')
        }else{
            setPhoneMessage('')
        }
    }

    const handleWhatsappInput = (whatsapp)=>{
        const whatsapExp = /^\d{11}$/
        if (whatsapExp.test(whatsapp)){
            setWhatsappMessage('')
        }else if(whatsapp === ""){
            setWhatsappMessage('Please enter your whatsapp number')
        }else if(!whatsapExp.test(phone)){
            setWhatsappMessage('Number is not valid')
        }else{
            setWhatsappMessage('')
        }
    }

    const handleNameInput = ()=>{
        const nameExp = '/^\d{A-Z}$/'
        if(nameExp.test(companyName)){
            setCompanyMessage('')
        }else if(companyName === ""){
            setCompanyMessage('Name is required')
        }
    }
  
  return (
    <div className='post'>
        <Header/>
        <div className='form'>
            <h1>Data Collation Form</h1>
            <form onSubmit={handleSubmit}>
                <label for='name'>Company Name*</label>
                <input type='text' name='companyname' onInput={(e)=>{handleNameInput(e.target.value)}} onChange={(e)=> handleChange(e)}/>

                <label for='email'>Email*</label>
                <input type='text' name='email' onChange={(e)=> handleChange(e)} onInput={(e)=>handleInput(e.target.value)}/>
                <p style={{color:'red', fontSize:'15px', textAlign:'left',margin:'0'}}>{message}</p>

                <label for='name'>State</label>
                <input type='text' name='state' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Local Government</label>
                <input type='text' name='localgovernment' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Town/City</label>
                <input type='text' name='town' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Phone Number*</label>
                <input type='text' name='phonenumber' onChange={(e)=> handleChange(e)} onInput={(e)=>handlePhoneInput(e.target.value)}/>
                <p style={{color:'red', fontSize:'15px', textAlign:'left',margin:'0'}}>{phoneMessage}</p>

                <label for='name'>WhatsAPP Number*</label>
                <input type='text' name='whatsappnumber' onChange={(e)=> handleChange(e)} onInput={(e)=>handleWhatsappInput(e.target.value)}/>
                <p style={{color:'red', fontSize:'15px', textAlign:'left',margin:'0'}}>{whatsappMessage}</p>

                <label for='name'>Category Of Business</label>
                <input type='text' name='categoryofbusiness' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Website</label>
                <input type='text' name='website' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Staff strength</label>
                <input type='text' name='staffstrength' onChange={(e)=> handleChange(e)}/>

                <label for='name'>Selfie photo of CEO</label>
                <div className='upload'>
                    <button onChange={(e)=> handleChange(e)}>upload a photo</button>
                </div>

                <label for='name'>Product/Signboard's photo</label>
                <div className='upload'>
                    <button onChange={(e)=> handleChange(e)}>upload a photo</button>
                </div>

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