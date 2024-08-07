import React from 'react'
import '../assets/signup.css'

const SignUp = () => {
  return (
    <div className='signup'>
        <header className='signup-header'>
            <img src='/images/logo.jpg'/>
        </header>
        <section className='section-signup'>
            <div className='section1-signup'>
                <h1>Signup</h1>
                <div className='inputs-signup'>
                    <div className='input-img-signup'>
                        <input  placeholder='Name' type='name'/>
                        <img src='/images/ic_baseline-drive-file-rename-outline.png'/>
                    </div>
                    <div className='input-img-signup'>
                        <input placeholder='Email' type='email'/>
                        <img src='/images/mdi_email-edit-outline.png'/>
                    </div>
                    <div className='input-img-signup'>
                        <input placeholder='Password' type='password'/>
                        <img src='/images/carbon_password.png'/>
                    </div>
                    <div className='span' style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
                        <input type='checkbox'/>
                        <span>I agree to the terms of service</span>
                    </div>
                    <button>Signup</button>
                </div>
            </div>
            <div className='or'><h3>OR</h3></div>
            <div className='section2-signup'>
                <button><img src='/images/flat-color-icons_google.png'/>Sign in with Google</button>
                <button><img src='/images/dashicons_facebook-alt.png'/>Sign in with Facebook</button>
            </div>
        </section>
    </div>
  )
}

export default SignUp