import React, { useEffect, useState } from "react";
import { adminStore } from "../stores/adminStore";
import {
  FaUserMd,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaStethoscope,
} from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
// import UpdateModal from "./UpdateModal";
// import { toast } from "react-toastify";

export default function ShowDoctors() {
  const [show, setShow] = useState(false);
  const [showmodal,setShowModal]=useState(false);
  const [upDoctor,setupDoctor]=useState({id:"",uname:"",uspecialization:"",ucontact:"",uaddress:"",ugender:""});
  const [doctor,setDoctor]=useState({name:"",email:"",password:"",specialization:"",contact:"",address:"",gender:""})
  const doctors = adminStore((state) => state.doctors || []);
  const createDoctor=adminStore((state)=>state.createDoctor);
  const getDoctors=adminStore((state)=>state.getDoctors);
  const deleteDoctor=adminStore((state)=>state.deleteDoctor)
  const editDoctor=adminStore((state)=>state.editDoctor)
  // console.log("checking for shoDoctors", doctors);

const clearform=()=>{
  setDoctor({name:"",email:"",password:"",specialization:"",contact:"",address:"",gender:""})
}

  const FormShow = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
  };

const showData=(e)=>{
  e.preventDefault();
  // console.log("data of doctor",doctor);
  createDoctor(doctor);
  clearform();
}

const onchanges=(e)=>{
  setDoctor({...doctor,[e.target.name]:e.target.value})
}
const clearUpdateForm=()=>{
  setupDoctor({uaddress:"",uname:"",uspecialization:"",ugender:"",ucontact:""})
}

const updateOnchange=(e)=>{
setupDoctor({...upDoctor,[e.target.name]:e.target.value});
}

const onUpdate=(doctor)=>{
setupDoctor({uname:doctor.name,uspecialization:doctor.specialization,ugender:doctor.gender,ucontact:doctor.contact,uaddress:doctor.address,id:doctor.id})
}
const handleUpdate=()=>{
     editDoctor(upDoctor);
     setShowModal(false)
}



  return (
    <>
      <div 
  className="container my-5 p-4 rounded-4 shadow-lg glass-effect w-50 position-relative"
//   style={{
//     maxWidth: "600px"
//   }}
>
       <div className={`${show? "text-end":"text-center"}`}>
         <button className={`${!show?"btn btn-primary":"btn btn-outline-danger position-absolute top-0 end-0"}`} onClick={FormShow}>
          {show ? "×" : "Add Doctor"}
        </button>
        <h4 className={`${show?" d-block text-center fw-bold":"d-none"}`}>Doctor Registeration</h4>
       </div>
        <div className={`${show ? "d-block" : "d-none"}`}>
         <div>
  <form className="d-flex flex-column gap-3 mt-3" onSubmit={showData}>

    {/* Name & Email side by side */}
    <div className="d-flex gap-3">
      <div className="form-group flex-fill">
        <label htmlFor="name">Enter Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Doctor Name…"
          id="name"
          name="name"
          value={doctor.name}
          onChange={onchanges}
        />
      </div>

      <div className="form-group flex-fill">
        <label htmlFor="exampleInputEmail1">Enter Email</label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          placeholder="Enter email"
          value={doctor.email}
          name="email"
          onChange={onchanges}

        />
      </div>
    </div>

    {/* Password & Specialization side by side */}
    <div className="d-flex gap-3">
      <div className="form-group flex-fill">
        <label htmlFor="exampleInputPassword1">Password</label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
          name="password"
          value={doctor.password}
          onChange={onchanges}

        />
      </div>

      <div className="form-group flex-fill">
        <label htmlFor="specialization">Specialization</label>
        <input
          className="form-control"
          type="text"
          placeholder="Specialization"
          id="specialization"
          name="specialization"
          value={doctor.specialization}
          onChange={onchanges}

        />
      </div>
    </div>
    <div className="d-flex gap-3">
           <div className="form-group flex-fill">
        <label htmlFor="contact">Enter Contact</label>
        <input
          className="form-control"
          type="text"
          placeholder="Contact No"
          id="contact"
          name="contact"
          value={doctor.contact}
          onChange={onchanges}

        />
      </div>
      <div className="form-group flex-fill">
        <label htmlFor="address">Enter Address</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Address"
          id="address"
          name="address"
          value={doctor.address}
          onChange={onchanges}

        />
      </div>
    </div>

   <div className="d-flex flex-column">
 
      <div className="fs-6 fw-bold">
        <label htmlFor="gender">Select Gender :</label>
      </div>

     <div className="d-flex gap-5">
     <div className="d-flex gap-2">
         <input type="radio" name="gender" id="male" value="male" checked={doctor.gender==="male"} onChange={onchanges}/>
      <label htmlFor="male"> Male</label>
     </div>

      <div className="d-flex gap-2">
        <input type="radio" name="gender" id="female" value="female" checked={doctor.gender==="female"} onChange={onchanges}/>
      <label htmlFor="female"> Female</label></div>

      
      <div className="d-flex gap-2">
        <input type="radio" name="gender" id="other" value="other" checked={doctor.gender==="other"} onChange={onchanges} />
      <label htmlFor="other"> Other</label>
      </div>
     </div>
   </div>

    <div className="d-flex gap-5">
      <button type="submit" className="btn btn-primary flex-fill" >
        Submit
      </button>
      <button className="btn btn-danger flex-fill" type="reset" onClick={clearform}>Clear Form</button>
    </div>
  </form>
</div>

        </div>
      </div>
      <div className="container mt-4">
        <h3 className="mb-4 text-center fw-bold text-primary">
          👨‍⚕️ Our Doctors
        </h3>
        <div className="row g-4">
          {doctors.map((doctor, index) => (
            <div className="col-md-4 col-sm-6" key={index}>
              <div
                className="card shadow-lg h-100 border-0 rounded-4 doctor-card position-relative"
                style={{
                  transition: "0.3s ease-in-out",
                  backgroundColor: "#f8f9fa",
                }}
              >
                {/* 3-dot menu */}
                <div className="dropdown position-absolute top-0 end-0 m-2">
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
                      <button className="dropdown-item"onClick={()=>{setShowModal(true);onUpdate(doctor)}}>✏️ Update</button>
                    </li>
                    <li>
                      <button className="dropdown-item text-danger"onClick={()=>deleteDoctor(doctor.id)}>
                        🗑️ Delete
                      </button>
                    </li>
                  </ul>
                </div>

                <div className="card-body text-center p-4">
                  <div className="doctor-icon mb-3">
                    <FaUserMd size={40} className="text-primary" />
                  </div>
                  <h5 className="card-title fw-bold text-dark">
                    {doctor.name}
                  </h5>
                  <p className="text-secondary mb-2">
                    <FaStethoscope className="me-2 text-success" />{" "}
                    {doctor.specialization}
                  </p>
                  <p className="mb-2">
                    <FaPhoneAlt className="me-2 text-info" /> {doctor.contact}
                  </p>
                  <p className="mb-0">
                    <FaMapMarkerAlt className="me-2 text-danger" />{" "}
                    {doctor.address}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CSS for hover and card style */}
        <style>
          {`
                .doctor-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 8px 20px rgba(0,0,0,0.2);
                    background-color: #ffffff !important;
                }
                `}
        </style>
      </div>
        {showmodal && <div
      className="modal show d-block"
      tabIndex="-1"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{upDoctor.uname}</h5>
            <button type="button" className="btn-close" onClick={()=>setShowModal(false)}></button>
          </div>
          <div className="modal-body">






         {/* Update Records */}
              <div className="d-flex gap-3">
           <div className="form-group flex-fill">
        <label htmlFor="ucontact">Enter Name</label>
        <input
          className="form-control"
          type="text"
          placeholder="Full Name"
          id="uname"
          name="uname"
          value={upDoctor.uname}
          onChange={updateOnchange}

        />
      </div>
      <div className="form-group flex-fill">
        <label htmlFor="uaddress">Enter Address</label>
        <input
          className="form-control"
          type="text"
          placeholder="Enter Address"
          id="uaddress"
          name="uaddress"
          value={upDoctor.uaddress}
          onChange={updateOnchange}

        />
      </div>
    </div>

      <div className="d-flex gap-3 mt-3">
           <div className="form-group flex-fill">
        <label htmlFor="contact">Enter Contact</label>
        <input
          className="form-control"
          type="text"
          placeholder="Contact No"
          id="ucontact"
          name="ucontact"
          value={upDoctor.ucontact}
          onChange={updateOnchange}

        />
      </div>
      <div className="form-group flex-fill mt-2">
        <label htmlFor="address">Enter Specialization</label>
        <input
          className="form-control"
          type="text"
          placeholder="Specialization"
          id="uspecialization"
          name="uspecialization"
          value={upDoctor.uspecialization}
          onChange={updateOnchange}

        />
      </div>
    </div>
      <div className="d-flex flex-column mb-4">
 
      <div className="fs-6 fw-bold">
        <label htmlFor="gender">Select Gender :</label>
      </div>

     <div className="d-flex gap-5">
     <div className="d-flex gap-2">
         <input type="radio" name="ugender" id="male" value="male" checked={upDoctor.ugender==="male"} onChange={updateOnchange}/>
      <label htmlFor="male"> Male</label>
     </div>

      <div className="d-flex gap-2">
        <input type="radio" name="ugender" id="female" value="female" checked={upDoctor.ugender==="female"} onChange={updateOnchange}/>
      <label htmlFor="female"> Female</label></div>

      
      <div className="d-flex gap-2">
        <input type="radio" name="ugender" id="other" value="other" checked={upDoctor.ugender==="other"} onChange={updateOnchange} />
      <label htmlFor="other"> Other</label>
      </div>
     </div>
   </div>

    <div className="d-flex gap-5">
      <button type="submit" className="btn btn-primary flex-fill" onClick={handleUpdate} >
        Submit
      </button>
      <button className="btn btn-danger flex-fill" type="reset" onClick={clearUpdateForm}>Clear Form</button>
    </div>



          </div>
        </div>
      </div>
    </div>}
    </>
  );
}
