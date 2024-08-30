import React from 'react'
import {Route, redirect} from 'react-router-dom'
import SignUp from './SignUp'
import PostBusiness from './PostBusiness'

const isLoggedIn =()=>{
    return localStorage.getItem('token')!==null
}

const PrivateRoute = ({component: Component, ...rest}) => {
    if(!isLoggedIn()){
        return <SignUp/>
    }else if(isLoggedIn()){
        return <PostBusiness/>
    }
  return <Route {...rest} render={(props)=>
    <Component {...props}/>
  }/>
}

export default PrivateRoute