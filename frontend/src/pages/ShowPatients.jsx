import React, { useEffect, useState } from "react";
import { adminStore } from "../stores/adminStore";
import { BsThreeDotsVertical } from "react-icons/bs";
import { patientStore } from "../stores/patientStore";
import { FaHospitalUser, FaProcedures } from "react-icons/fa";

export default function ShowPatients() {
  const patients = adminStore((state) => state.patients) || [];
  const getPatients=adminStore((state)=>state.getPatients)
  const deletePatient=patientStore((state)=>state.deletePatient);
  const editPatient=patientStore((state)=>state.editPatient)
  const [show,setShow]=useState(false);

  const [patient,setPatient]=useState({id:"",name:"",age:"",gender:"",contact:"",address:""});
  // console.log("patients of ",patient)

  const deleteOperation=(id)=>{
    deletePatient(id)
  };

  const onChnages=(e)=>{
     setPatient({...patient,[e.target.name]:e.target.value})
  }
  const onUpdate=(patient)=>{
setPatient(patient);
  }

  const onClickSubmitUpdate=()=>{
     editPatient(patient);
     setShow(false);
  }

  useEffect(()=>{
   getPatients();
  },[])
  // console.log("patients from", patients);
  return (
    <div>
      <h2
        className="text-center fw-bold text-base-300"
        style={{ color: "rgba(31, 119, 219, 1)" }}
      >
        
        🧑‍🦼‍➡️Our Patients 
      </h2>
        {patients.length===0 && <h2 className="text-center mt-5 fw-bold">No Patients Here...</h2>}
{show && 
  <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Update : {patient.name}</h5>
            <button type="button" className="btn-close" onClick={()=>setShow(false)}></button>
          </div>
          <div className="modal-body">
         
         <div className="d-flex gap-3">
          <div className="form-group flex-fill">
             
             <label htmlFor="name">Enter Name</label>
             <input type="text" name="name"  className="form-control" value={patient.name} onChange={onChnages}/>
          </div>

          <div className="form-group flex-fill">
             
             <label htmlFor="address">Enter Address</label>
             <input type="text" name="address"  className="form-control" value={patient.address} onChange={onChnages}/>
          </div>

         </div>

                  <div className="d-flex gap-3 mt-4">
          <div className="form-group flex-fill">
             
             <label htmlFor="contact">Enter Contact</label>
             <input type="text" name="contact"  className="form-control" value={patient.contact} onChange={onChnages}/>
          </div>

          <div className="form-group flex-fill">
             
             <label htmlFor="age">Enter age</label>
             <input type="text" name="age"  className="form-control" value={patient.age} onChange={onChnages}/>
          </div>

         </div>

         <div className="fw-bold mt-2">
            <label htmlFor="gender">Select Gender:</label>
         </div>

         <div className="d-flex gap-2 ">
           <div className="d-flex gap-2 p-2">
            <input type="radio" name="gender" id="male" value="male" checked={patient.gender==="male"}  onChange={onChnages}/>
            <label htmlFor="male">Male</label>
           </div>
           <div className="p-2 d-flex gap-2">
            <input type="radio" name="gender" id="female" value="female" checked={patient.gender==="female"} onChange={onChnages}/>
            <label htmlFor="female">Female</label>
           </div>
           <div className="p-2 d-flex gap-2">
            <input type="radio" name="gender" id="other" value="other" checked={patient.gender==="other"} onChange={onChnages} />
            <label htmlFor="other">Other</label>
           </div>

         </div>
         <div className="container d-flex gap-5 flex-fill">  
          <button className="btn btn-primary flex-fill" onClick={onClickSubmitUpdate}>Submit</button>
          <button className="btn btn-danger flex-fill">Clear</button>
         </div>
         



          </div>
        </div>
      </div>
    </div>}



      <div className="container d-flex flex-wrap gap-5 justify-content-around mt-5 mb-5">
       {patients.map((patient,index)=>{
        return  <div className=" card border rounded-4 shadow-lg d-flex flex-column  h-100 text-center p-3 bg-light" style={{
                  transition: "0.3s ease-in-out",
                  backgroundColor: "#f8f9fa",
                  width:"25rem"
                }} key={index}>
          <div className="dropdown position-absolute top-0 end-0 m-2" >
            <button
              className="btn btn-light btn-sm border-0"
              type="button" 
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <BsThreeDotsVertical size={20} />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow-sm">
              <li>
                <button className="dropdown-item"onClick={()=>{setShow(true);onUpdate(patient)}}>✏️ Update</button>
              </li>
              <li>
                <button className="dropdown-item text-danger" onClick={()=>deleteOperation(patient.userId)}>🗑️ Delete</button>
              </li>
            </ul>
          </div>

          <p style={{ fontSize: "40px", color:"rgba(0, 127, 239, 1)"}}><i className="fa-solid fa-user"></i></p>

          <p className="fw-bold fs-5 mb-1">
           {patient.name}
          </p>

          <p className="text-muted mb-1">
            <i className="bi bi-geo-alt-fill me-2 text-danger"></i>
            {patient.address}
          </p>

          <p className="mb-1">
            <i className="bi bi-calendar2-heart me-2 text-primary"></i>
            {patient.age}
          </p>

          <p className="mb-1">
            <i className="bi bi-gender-male me-2 text-info"></i>
            {patient.gender}
          </p>

          <p className="mb-0">
            <i className="bi bi-telephone-fill me-2 text-success"></i>
            {patient.contact}
          </p>
        </div>
       })}
      </div>
      <style>
          {`
                .card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    background-color: #ffffff !important;
                }
                `}
      </style>
    </div>
  );
}
