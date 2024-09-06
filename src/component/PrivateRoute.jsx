import React from 'react'
import {Route, redirect} from 'react-router-dom'
import PostBusiness from './PostBusiness'
import SignIn from './SignIn'

const isLoggedIn =()=>{
    return localStorage.getItem('token')!==null
}


const PrivateRoute = ({component: Component, ...rest}) => {
    if(isLoggedIn()){
      return <SignIn/>
    }
  return <Route {...rest} render={(props)=>
    <Component {...props}/>
  }/>
}

export default PrivateRoute