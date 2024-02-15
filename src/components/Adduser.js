import React,{useEffect, useState} from 'react'
import {useNavigate,useParams} from "react-router-dom";
function Adduser() {
    const navigate=useNavigate();
    let {userId} =useParams();

    let [FormValue,setFormValue]=useState({
        name:"",
        avatar:"",
        mobile:"",
        title:"",
        groupId:"",
        email:""
    });

   const onInputChange=(e)=>{
     setFormValue({...FormValue,[e.target.name]:e.target.value});
    }

   const FormSubmit= async (e)=>{
      e.preventDefault();
      if(userId){
        try{
            let response= await fetch(`https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails/${userId}`,{
              method:"PUT",
              body:JSON.stringify(FormValue),
              headers:{"Content-Type":"application/json"}})
            if(response){
              navigate("/user-directory");
            }
        }catch (err){
          navigate("/add-user");
        }
      }else{
        try{
            let response= await fetch("https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails",{
              method:"POST",
              body:JSON.stringify(FormValue),
              headers:{"Content-Type":"application/json"}})
            if(response){
              navigate("/user-directory");
            }
        }catch (err){
          navigate("/add-user");
        }
      }
   }

   useEffect(()=>{
    const loadUser=async ()=>{
        if(userId){
            let response= await fetch(`https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails/${userId}`);
            let result= await response.json();
            setFormValue(result);
    }
    }
    loadUser();
   },[userId]);

  return (
    <div className="container-fluid mt-5">
    {/* <!-- Page Heading --> */}
    <div className="d-sm-flex align-items-center justify-content-evenly mb-4 " id="add-user-header">
        <h1 className="h3 mb-2 text-gray-800 " style={{fontWeight:"bold" }}>
         <i className="fa-solid fa-user-plus mr-3" ></i>{userId? "Edit":"Add"} User</h1>
       
        <button onClick={()=>navigate("/home")} className="d-none d-sm-inline-block btn btn-sm shadow-sm p-2" style={{fontWeight:"bold",backgroundColor:"#ff5555",color:"#fff",outLine:"none"}}>
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button>      
    </div>

    <div className="row d-flex align-items-center justify-content-center ">

    {/* <!-- Area Chart --> */}
    <div className="col-xl-8 col-lg-10">
        <div className="card shadow mb-4">

           {/*  <!-- Card Body --> */}
            <div className="card-body">
            <form action="#" className="formbox" onSubmit={FormSubmit} >
            <div className="user-details">
                <div className="input-box input-box-add">
                    <label htmlFor="name" className="details">NAME</label>
                    <input type="text" name="name" id="name" value={FormValue.name} onChange={onInputChange} placeholder="Enter your name" required/>
                </div>
               <div className="input-box input-box-add">
                  <label type="text" htmlFor="groupId" className="details">QUALIFICATION</label>
                  <input name="groupId" id="groupId" value={FormValue.groupId} onChange={onInputChange} placeholder="Enter Your Qualification "required/>
               </div>
                <div className="input-box input-box-add">
                    <label htmlFor="email" className="details" >EMAIL-ID</label>
                    <input type="email" name="email" value={FormValue.email} onChange={onInputChange} placeholder="Enter Email-id" id="email"  required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="title" className="details">DESIGNATION</label>
                    <input type="text" name="title" id="title" value={FormValue.title} onChange={onInputChange}  placeholder="Enter your job title" required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="mobile" className="details">PHONE NUMBER</label>
                    <input type="text" name="mobile" value={FormValue.mobile} onChange={onInputChange} placeholder="Enter contact number" id="mobile" required/>
                </div>
                <div className="input-box input-box-add">
                    <label htmlFor="avatar" className="details">PROFILE PICTURE</label>
                    <input type="url" name="avatar" id="avatar" value={FormValue.avatar} onChange={onInputChange}  placeholder="Upload Photo Url" required/>
                </div>
            </div>
            <div className="button">
              <button className="submitbutton" style={{fontWeight:"bold"}}>SUBMIT</button>
            </div>
        </form>
            </div>
        </div>
    </div>
    </div>
    </div>
  )
}

export default Adduser