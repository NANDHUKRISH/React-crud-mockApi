import './App.css';
import Home from "./components/Home";
import UserDirectory from './components/UserDirectory';
import Navbar from './components/Navbar';
import Adduser from './components/Adduser';
import ViewUser from './components/ViewUser';
import { BrowserRouter,Routes,Route,Navigate } from 'react-router-dom';
function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Navbar/>
       <Routes>
       <Route path="/home" element={ <Home />}/>
       <Route path="*" element={ <Navigate to="/home" />}/>
       <Route path="/user-directory" element={ <UserDirectory />}/>
       <Route path="/add-user" element={ <Adduser/>}/>
       <Route path="/view-user/:userId" element={ <ViewUser/>}/>
       <Route path="/add-user/:userId" element={ <Adduser/>}/>

       </Routes>
       </BrowserRouter>
      
     
    </div>
  );
}

export default App;
