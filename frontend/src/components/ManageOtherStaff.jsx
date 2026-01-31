import React, { useEffect, useState } from "react";
import StaffForm from "./StaffForm";
import StaffCard from "./StaffCard";
import { adminStore } from "../stores/adminStore";
import { formToJSON } from "axios";
import { staffStore } from "../stores/staffStore";

export default function ManageOtherStaff() {
  const getOtherStaff=adminStore((state)=>state.getOtherStaff);
  const otherStaff=adminStore((state)=>state.otherStaff) || []
  const updateStaffs=staffStore((state)=>state.updateStaffs)
  
  const [udata,setUdata]=useState({name:"",address:"",contact:"",gender:"",role:""});
  const [show, setShow] = useState(false);
  const [uform,setUform]=useState(false)

  const OnUpdateChange=(e)=>{
    setUdata({...udata,[e.target.name]:e.target.value})
  }
  const clearAll=()=>{
    setUdata({ id:"",name:"",address:"",contact:"",gender:"",role:""})
  }

  const setValueOnUpdate=(data)=>{
    setUdata({
      id:data.id,name:data.name,address:data.address,contact:data.contact,gender:data.gender,role:data.role,age:data.age
    })
  }
  const updateStaff=(e)=>{
   e.preventDefault();
   setUform(false);
   updateStaffs(udata);

  }

  useEffect(()=>{
    getOtherStaff()
  },[]);
  return (
    <div>
      <div className="w-50 mt-5" style={{ margin: "auto" }}>
        <div className={`text-center shadow-lg glass-effect p-4 rounded-3 d-flex justify-content-center ${show || uform? "d-none":"d-flex"}`}>
          <button
            className={`btn btn-primary ${
              show ? "d-none" : "d-block"
            } `}
            onClick={() => setShow(true)}
          >
            Add Staff +
          </button>
        </div>
        {show && <StaffForm setShow={setShow}  />}
      </div>

     {uform && <form onSubmit={updateStaff}>
        <div className="d-flex flex-column conatiner w-50 m-auto shadow-lg glass-effect mt-4 pt-4 p-5 position-relative">
               <div>
                <button className="btn btn-outline-danger position-absolute" style={{top:"0",right:"0px"}} onClick={()=>setUform(false)}>×</button>
               </div>
                <h3 className="text-center">Updation Form</h3>
           <div className="d-flex gap-3">
               <div className="form-group flex-fill ">
                 <label htmlFor="name">Enter Name</label>
                 <input type="text" className="form-control" name="name" id="name" onChange={OnUpdateChange} value={udata.name} />
               </div>

               <div className="form-group flex-fill">
                 <label htmlFor="contact">Enter Contact</label>
                 <input type="number" className="form-control" name="contact" id="contact" onChange={OnUpdateChange} value={udata.contact} />
               </div>
           </div>

            <div className="d-flex gap-3">
               <div className="form-group flex-fill ">
                 <label htmlFor="age">Enter Age</label>
                 <input type="text" className="form-control" id="age" name="age" onChange={OnUpdateChange} value={udata.age}/>
               </div>

               <div className="form-group flex-fill">
                 <label htmlFor="role">Enter Role</label>
                 <input type="text" className="form-control" id="role" name="role" onChange={OnUpdateChange} value={udata.role}/>
               </div>
           </div>

            <div className="d-flex gap-3">
               <div className="form-group flex-fill ">
                 <label htmlFor="address">Enter Address</label>
                 <input type="text" className="form-control" id="address" name="address" onChange={OnUpdateChange}  value={udata.address}/>
               </div>
           </div>

            <div className='form-group flex-fill mt-2 w-50'>
                       <label htmlFor="gender" className='fw-bold'> Select Gender :</label>
                      <div className='d-flex justify-content-around'>
                        <div>
                        <input type="radio"name='gender' value="male" id='male' checked={udata.gender=="male"} onChange={OnUpdateChange}/>
                        <label htmlFor="male" className='p-2'>Male</label>
                       </div>
                       <div>
                        <input type="radio" name='gender'  value="female" id='female' checked={udata.gender=="female"} onChange={OnUpdateChange}/>
                        <label htmlFor="female" className='p-2'>Female</label>
                       </div>
                       <div>
                        <input type="radio" name='gender' value="other" id='other' checked={udata.gender=="other"} onChange={OnUpdateChange}/>
                        <label htmlFor="other" className='p-2'>Other</label>
                       </div>
                      </div>
                    </div>
                    <div className='d-flex gap-4 mt-4 container'>
                        <button className='btn btn-primary flex-fill' type='submit'>Submit</button>
                        <button className='btn btn-danger flex-fill' type='reset'onClick={clearAll}>Clear All</button>
                        </div>
      </div>
      </form>
     }
     
     

      <div>
        <div className="text-center mt-5 ">
          <h3 className="fw-bold mb-4">Our Staff</h3>
          <div className="d-flex flex-wrap container gap-3 justify-content-between mb-5 position-relative">
            {
              otherStaff.map((staff)=>{
                return <StaffCard staff={staff} setUform={setUform} setValueOnUpdate={setValueOnUpdate}/>
              })
            }

          </div>
        </div>
      </div>

    </div>
  );
}
