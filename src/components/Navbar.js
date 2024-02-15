import React from 'react'
import {Link} from "react-router-dom";
function Navbar() {
  return (
    <nav className=" navbar navbar-expand-sm navbar-dark bg-#eee8e4 d-flex align-items-center justify-content-evenly " id="nav-bar" style={{backgroundColor:"#eee8e4"}}>
      <Link to="/">
      <div className="navbar-brand text-dark" style={{fontWeight:"900",fontSize:"25px"}} >
      <i className="fa-solid fa-mobile mr-2" style={{color:"rgb(255, 102, 71)"}}></i>
        <b>USER <span style={{color:"rgb(255, 102, 71)"}}>MANAGER</span></b>
      </div>
      </Link>
     
      <div className="container" id="navbarSupportedContent">
        <ul className="navbar-nav" style={{width:"100%",display:"flex",justifyContent:"flexStart",fontWeight:"bold"}}>
          <li className="nav-item mr-4" >
            <Link to="/" className="nav-link" aria-current="page"  id="home" >
            &nbsp;Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/user-directory" className="nav-link"  id="Users-Directory">
              Users Directory
            </Link>
          </li>
        </ul>
        <Link to="/add-user">
        <button className="btn btn-outline " type="submit" id="add-user-button">
        <i className="fa-solid fa-user-plus" style={{marginRight:"3px"}} ></i>Add User
          </button>
        </Link>  
       
    </div>
  </nav>
  
  )
}

export default Navbar