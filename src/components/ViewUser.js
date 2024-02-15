import React,{useState,useEffect} from 'react'
import {useNavigate,useParams} from "react-router-dom";
import Spinner from './Spinner';
function ViewUser() {
    let {userId}=useParams();
    const navigate=useNavigate();
    let [data,Setdata]=useState({loading:true,users:[],errormessage:""});

    useEffect(()=>{
    const loaduser= async ()=>{
          try{
            Setdata({...data,loading:true});
            let response=await fetch(`https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails/${userId}`);
            let result= await response.json();
            console.log(result);
            Setdata({...data,loading:false,users:result});
          }catch(err){
            Setdata({...data,loading:false,errormessage:err.message});
          }
    }
    loaduser();
    },[]);

    let{loading,users,errormessage}=data;

  return (
   
    <section className="users-list d-flex align-items-center justify-content-around mt-5">
       {loading? <Spinner/> :
        Object.keys(users).length>0 &&
        <div className="container-list ">
        <div className="row d-flex align-items-center justify-content-center" >
        <div className="col-lg-12 mt-4" id="inner-row-view">
           <div className="user d-flex align-items-center justify-content-around">
            <div className="user-pic-view">
              <img src={users.avatar} className="img-fluid" alt="user-pic" />
            </div>
            <div className="user-info-single">
            <span>Name : <b>{users.name}</b></span>
                   <span>Qualification : <b>{users.groupId}</b></span>
                   <span>Email : <b>{users.email}</b></span>
                   <span>Title : <b>{users.title}</b></span>
                   <span>Mobile : <b>{users.mobile}</b></span>
            </div>
           </div>
          </div> 
        </div>
        <div id="Back-button-view">
            <button onClick={()=>navigate(-1)}  style={{fontWeight:"bold"}}>
            <i className=" fas fa-fw fa-caret-left "></i>Back
        </button> 
        </div>
       </div>
       }
    </section>
  )
}

export default ViewUser