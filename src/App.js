import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './component/About';
import Body from './component/Body';
import SignIn from './component/SignIn';
import SignUp from './component/SignUp';
import PostBusiness from './component/PostBusiness';
import Contact from './component/Contact';
import Dashboard from './component/Dashboard';
import Advert from './component/Advert';
import Listing from './component/Listing';



function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Body/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
        <Route exact path='/signup' element={<SignUp/>}/>
        <Route exact path='/post' element={<PostBusiness/>}/>
        <Route exact path='/contact' element={<Contact/>}/>
        <Route exact path='/dashboard' element={<Dashboard/>}/>
        <Route exact path='/advert-rates' element={<Advert/>}/>
        <Route exact path='/listing' element={<Listing/>}/>
      </Routes>
   </div>
    </Router>
   
  );
}

export default App;
