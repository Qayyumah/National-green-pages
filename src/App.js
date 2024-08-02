import './App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import About from './component/About';
import Body from './component/Body';
import SignIn from './component/SignIn';


function App() {
  return (
    <Router>
    <div className="App">
      <Routes>
        <Route exact path='/' element={<Body/>}/>
        <Route exact path='/about' element={<About/>}/>
        <Route exact path='/signin' element={<SignIn/>}/>
      </Routes>
   </div>
    </Router>
   
  );
}

export default App;
