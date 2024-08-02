import React from 'react'
import '../assets/about.css'
import Header from './Header'
import Footer from './Footer'

const About = () => {
  return (
    <div>
    <Header/>
        <div className='about'>
            <div className='about-content'>
                <div className='sub-content'>
                    <h1>About Us</h1>
                    <p>Greenpages Inc. is an organization whose focus is on Africa's growth and development.
                    Its special interest is on how Africans both home and in Diaspora will build and develop thier continent.
                    This company was established to encourage foreign investors to invest in the continent of Africa. </p>
                    
                    <p>Established in the late 90s, to the glory of God, and has spread across the world with its agents in various
                    countries, these include Ghana, United Kingdom, United States of America. With trusted and experienced hands
                    working hard globally, we believe with even you, Africa will be a more comfortable continent for all of us to live</p>
                </div>
                <div className='v-m'>
                    <div className='vision'>
                        <h1>OUR VISION</h1>
                        <p>To create global business Consortium, that will serve as a gateway for investors to Nigeria and Africa as a whole.
                        To foster e-business and networking business services in Africa than ever before, by creating a good business
                        links that stands on the pillars of trust, honesty and efficiency.</p>
                    </div>

                    <div className='mission'>
                        <h1>OUR MISSION</h1>
                        <p>Delivering excellent services at all cost is part of us, we take the risk while our customers take 
                        the pleasure. Meanwhile, we exist to provide, <b style={{color:'rgb(11, 106, 11)'}}>State by States Business Directory to the people of
                        Federal Republic of Nigeria</b></p>
                    </div>
                 </div>
            </div>
            <div className='about-image'>
                <img src='/images/map.jpg'/>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default About