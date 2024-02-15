import React,{useState,useEffect} from 'react'
import {useNavigate} from "react-router-dom";
import Spinner from './Spinner';
function UserDirectory() {
  let [query,setQuery]=useState("");
  const navigate = useNavigate();
  let [data,setData]=useState({
    loading:false,
    users:[],
    fileredData:[],
    errormessage:""
  });

  useEffect(()=>{
      const loadUser=async ()=>{
        try{
            setData({...data, loading:true});
            let response = await fetch("https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails");
            let result = await response.json();
            setData({...data,
               loading:false,
               users:result,
               fileredData:result
            });

        }catch (err){
          setData({...data,
            loading:false,
            errormessage:err.message
          });

        }
      }
      loadUser();
  },[]);

  const DeleteUser=async (id)=>{
    try{
      let response= await fetch(`https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails/${id}`,{method:"DELETE"});
      if(response){
        try{
          setData({...data, loading:true});
          let response = await fetch("https://635ec2c0ed25a0b5fe4c8f78.mockapi.io/userdetails");
          let result = await response.json();
          setData({...data,
             loading:false,
             users:result,
             fileredData:result
          });

      }catch (err){
        setData({...data,
          loading:false,
          errormessage:err.message
        });

      }
      }
    }catch(err){

    }
  }

  let {loading,users,fileredData,errormessage} =data;

  const SearchFunc = (e)=>{
    setQuery(e.target.value);
    let theUser=users.filter((user)=>{
      return user.name.toLowerCase().includes(e.target.value.toLowerCase());
    })
    setData({...data,fileredData:theUser})
  }
  return (
    <>
    <section className="user-search p-3 mb-0">
      <div className="container">
        <div className="grid">
          <div className="row">
            <div className="col">
              <p className="h3" style={{color:"black",fontWeight:"900",fontSize:"30px"}}>  <i className="fa-solid fa-users mr-3" style={{color:"rgb(255, 102, 71)"}}></i>Users <span style={{color:"rgb(255, 102, 71)"}}>Page</span> </p>
              <p className="fst-italic">This page will show the whole details of users . You can search for particular user in the search box . Three buttons will allow You to do CRUD Operations on users </p>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
               <form className="row">
                <div className="col">
                <div className="mb-2">
                  <input type="text"
                  value={query}
                  onChange={SearchFunc}
                   className="form-control" placeholder="Search Users.."/>
                </div>
                </div>
                <div className='col'>
                </div>
               </form>
            </div>
          </div>
        </div>
      </div>
    </section>
    { loading ?< Spinner/> :
     <section className="users-list mt-0">
     <div className="container">
      <div className="row">
         {fileredData.length===0 && <div className="col-lg-12 mt-4" style={{display:"flex",justifyContent:"center",alignItems:"center",fontSize:"25px",fontWeight:"900",color:"tomato",marginTop:"20px"}}>No Match Found</div>}
       {fileredData.length>0 && 
        fileredData.map((data)=>{
             return (
        <div className="col-lg-6 mt-4" key={data.id}>
         <div className="user d-flex align-items-start">
          <div className="user-pic">
            <img src={data.avatar} /* className="img-fluid" */ alt="user-pic" id="user-prifile-pic"/>
          </div>
          <div className="user-info">
               <h4>{data.name}</h4>
               <span>{data.title}</span>
               <b>{data.groupId}</b>
               <p>{data.email}</p>
               <p>Ph : <strong>{data.mobile}</strong></p>
          <div className='action'>
              <button onClick={()=>navigate(`/view-user/${data.id}`)} className="view-button">
              <i className="fa-solid fa-eye"></i>
              </button>
              <button onClick={()=>navigate(`/add-user/${data.id}`)} className="Edit-button">
              <i className="fa-solid fa-pen-to-square"></i>
              </button>
              <button className="Delete-button" onClick={()=>DeleteUser(data.id)} >
              <i className="fa-solid fa-trash-can"></i>
              </button>
          </div>
          </div>
         </div>
        </div>
             )
        })}
        
      </div>
     </div>
  </section>
    }
    </>
  )
}

export default UserDirectory