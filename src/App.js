import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { useEffect } from 'react';
import { useState } from 'react';
import About from './component/About';
import Body from './component/Body';
import SignIn from './component/SignIn';
import PostBusiness from './component/PostBusiness';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import Advert from './component/Advert';
import Listing from './component/Listing';
import PrivateRoute from './component/PrivateRoute';
import SignUp from './component/SignUp';
import Loader from './component/Loader';
import AdminLogin from './component/AdminLogin';
import Businesses from './component/AllBusinesses';
import AddBusiness from './component/AddBusiness';
import UserManagement from './component/UserManagement';
import AdminLogOut from './component/AdminLogOut';
import { DataProvider } from './context/DataContext';




function App() {
  const [loading, setLoading] = useState(false)

  //loader functionality

  useEffect (()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    }, 2000)
  }, [])

  return (
    <DataProvider>
    <Router>
    <div className="App">
    {
      loading?<Loader/>:
      <Routes>
        <Route exact path='/' element={<Body/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/admin' element={<AdminLogin/>}/>
        <Route exact path='/post' element={<PrivateRoute element={<PostBusiness/>}/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/advert-rates' element={<Advert/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
        <Route exact path='/business' element={<Businesses/>}/>
        <Route exact path='/users' element={<UserManagement/>}/>
        <Route exact path='/logout' element={<AdminLogOut/>}/>
        <Route exact path='/add' element={<AddBusiness/>}/>
      </Routes>
    }
   </div>
    </Router>
   </DataProvider>
  );
}

export default App;
