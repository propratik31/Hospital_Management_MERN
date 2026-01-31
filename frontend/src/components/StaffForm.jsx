import React from 'react'
import { useState } from 'react';
import {staffStore} from "../stores/staffStore"
export default function StaffForm({setShow}) {
const AddStaff=staffStore((state)=>state.AddStaff);


  const [data,setData]=useState({name:"",contact:"",address:"",age:"",role:"",gender:""});
 

  const onChnages=(e)=>{
    e.preventDefault();
    setData({...data,[e.target.name]:e.target.value});
  }
   const clearAll=()=>{
    setData({name:"",contact:"",address:"",age:"",role:"",gender:""});
  }
  const SubmitingForm=(e)=>{
    e.preventDefault();
    AddStaff(data);
    clearAll();
  }
 
  return (
    <div className='container  rounded-3   shadow-lg glass-effect p-4 position-relative' >
            <div style={{position:"absolute",top:"2px",right:"0px"}}>
            <button className='btn btn-outline-danger'onClick={()=>setShow(false)}>×</button>

            </div>
          <form className='d-flex flex-column'onSubmit={SubmitingForm} >
              <h4 className='text-center mb-4 fw-bold'>Staff Registeration</h4>
            {/* Name && Address */}
               <div className='d-flex gap-5  mt-2'>
                    <div className='form-group flex-fill'>
                        <label htmlFor="name">Enter Name</label>
                        <input type="text"  id="name" name='name' className='form-control' value={data.name} onChange={onChnages}/>
                    </div>
                    <div className='form-group flex-fill'>
                        <label htmlFor="contact">Enter Contact</label>
                        <input type="text" id='contact' name='contact' className='form-control' value={data.contact} onChange={onChnages}/>
                    </div>
               </div>

              {/* Age and role */}
                <div className='d-flex gap-5 mt-2 '>
                    <div className='form-group flex-fill'>
                        <label htmlFor="age">Enter Age</label>
                        <input type="text"  id="age" name='age' className='form-control' value={data.age} onChange={onChnages}/>
                    </div>
                    <div className='form-group flex-fill'>
                        <label htmlFor="role">Enter Role</label>
                        <input type="text" id='role' name='role' className='form-control' value={data.role} onChange={onChnages}/>
                    </div>
               </div>

              {/* contact and gender */}
                <div className='d-flex gap-5'>
                    <div className='form-group flex-fill mt-2'>
                        <label htmlFor="address">Enter Address</label>
                        <input type="text"  id="address" name='address' className='form-control' value={data.address} onChange={onChnages}/>
                    </div>
                   
               </div>
                <div className='form-group flex-fill mt-2 w-50'>
                       <label htmlFor="gender" className='fw-bold'> Select Gender :</label>
                      <div className='d-flex justify-content-around'>
                        <div>
                        <input type="radio"name='gender' value="male" id='male' checked={data.gender=="male"} onChange={onChnages}/>
                        <label htmlFor="male" className='p-2'>Male</label>
                       </div>
                       <div>
                        <input type="radio" name='gender'  value="female" id='female' checked={data.gender=="female"} onChange={onChnages}/>
                        <label htmlFor="female" className='p-2'>Female</label>
                       </div>
                       <div>
                        <input type="radio" name='gender' value="other" id='other' checked={data.gender=="other"} onChange={onChnages}/>
                        <label htmlFor="other" className='p-2'>Other</label>
                       </div>
                      </div>
                    </div>
                    <div className='d-flex gap-4 mt-4 container'>
                        <button className='btn btn-primary flex-fill' type='submit'>Submit</button>
                        <button className='btn btn-danger flex-fill' type='reset'onClick={clearAll}>Clear All</button>
                        </div>
          </form>
    </div>
  )
}
