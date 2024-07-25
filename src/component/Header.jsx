import React from 'react'
import '../css/Style.css'
import styled from 'styled-components'
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import { useState } from 'react';

const Header = () => {
    const [burgerStatus, setBurgerStatus] = useState(false)
  return (
    <div className='head'>
        <div className='firstHeader'>
            <div className='logo'>
                <img src='' alt='National-green-pages'/>
            </div>
            
            <div className='firstHeaderLink'>
                <a href='#'>Home</a>
                <a href='#'>About Us<select><option></option></select></a>
                <a href='#'>Post a Business</a>
                <a href='#'>Advert Rates</a>
                <a href='#'>Contact Us</a>
            </div>
            <div className='burgernav'>
                <RightMenu>
                    <CustomMenu onClick={()=>setBurgerStatus(true)}/>
                </RightMenu>
                <BurgerNav show={burgerStatus}>
                    <CloseWrapper>
                        <CustomClose onClick={()=>setBurgerStatus(false)}/>
                    </CloseWrapper>
                    <a href='#'>Home</a>
                    <a href='#'>About Us</a>
                    <a href='#'>Post a Business</a>
                    <a href='#'>Advert Rates</a>
                    <a href='#'>Contact Us</a>
                </BurgerNav>
            </div>
        </div>

        <div className='secondHeader'>
            <a href='#'>Home</a>
            <a href='#'>About Us</a>
            <a href='#'>Advert Rates</a>
            <a href='#'>Cart</a>
            <a href='#'>Checkout</a>
            <a href='#'>Contact Us</a>
            <a href='#'>Directory Dashboard</a>
            <a href='#'>Listings</a>
            <a href='#'>My Account</a>
            <a href='#'>Post a Business</a>
            <a href='#'>Shop</a>
        </div>
    </div>
  )
}

export default Header

const RightMenu = styled.div`
    display: flex;
    align-items: center;
    a{
        font-weight: 600;
        text-transform: uppercase;
        margin-right: 10px
    }
`

const CustomMenu = styled(MenuIcon)`
    cursor: pointer;
`
const BurgerNav = styled.div`
    position: fixed;
    top:0;
    bottom: 0;
    right: 0;
    background: white;
    width: 300px;
    z-index: 16;
    list-style: none;
    padding: 20px;
    display: flex;
    flex-direction: column;
    text-align: start;
    transform: ${props => props.show ? 'translateX(0)' : 'translateX(100%)'};
    transition: transform 0.2s;
        
        a{
            font-size: 18px;
            margin-top: 20px;
            font-weight: 400;
            padding: 10px 10px;
            /* border-bottom: 1px solid rgb(23, 118, 23); */
            text-decoration-line: none !important;
            color: rgb(54, 221, 54);
        }

        select{
            border: none;
            color: rgb(54, 221, 54);
        }
`

const CustomClose = styled(CloseIcon)`
    cursor: pointer;
`
const CloseWrapper = styled.div`
     display: flex;
     justify-content: flex-end;
     padding: 0px 17px;
`