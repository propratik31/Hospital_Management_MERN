import React, { useState } from 'react'
import { userAuthStore } from '../stores/userAuthStore'
import doctor from "/images/doctor.png"
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const login = userAuthStore((state) => state.login);

  const [data,setData]=useState({email:"",password:""});

  const onchange=(e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }
  const submission=async()=>{
   await login(data);
    console.log(data);
  }

  return (
    <div className="container-fluid  d-flex align-items-center justify-content-center pt-5" style={{ backgroundColor: "#f0f8ff", height:"90%" }}>
      <div className="row shadow-lg rounded-4 overflow-hidden bg-white" style={{ maxWidth: "1000px", width: "100%" }}>
        
        {/* Left Section - Hospital Info */}
        <div className="col-md-6 p-4 d-flex flex-column justify-content-between" style={{ backgroundColor: "#fef9e7" }}>
          <div>
            <h3 className="text-center fw-bold text-dark bg-warning rounded py-2 mb-3">
              City Hospital Pune 🏥
            </h3>
            <div className="d-flex justify-content-center">
              <img src={doctor} alt="Doctor" className="img-fluid rounded" style={{ maxHeight: "350px" }} />
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center bg-primary text-white rounded p-2 mt-3">
            <div>
              <p className="mb-0 fw-semibold">📍 Address:</p>
              <small>Warje, Pune</small>
            </div>
            <div>
              <p className="mb-0 fw-semibold">📞 Contact:</p>
              <small>+91 45454554</small>
            </div>
          </div>
        </div>

        {/* Right Section - Login Form */}
        <div className="col-md-6 p-5 d-flex flex-column justify-content-center">
          <h3 className="text-center fw-bold mb-4 text-primary">Login to Continue</h3>
          <form 
            onSubmit={(e) => { 
              e.preventDefault(); 
            }} 
          >
            <div className="mb-3">
              <label className="form-label fw-semibold">Email</label>
              <input type="email" className="form-control" placeholder="Enter your email" name="email" value={data.email} onChange={onchange} required />
            </div>
            <div className="mb-3">
              <label className="form-label fw-semibold">Password</label>
              <input type="password" className="form-control" placeholder="Enter your password" name="password" value={data.password} onChange={onchange} required />
            </div>
            <button type="submit" className="btn btn-primary w-100 fw-semibold" onClick={()=>submission()}>
              Login
            </button>
            <div className="text-center mt-3">
              <Link to="/register">Signup As Patient</Link>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
}
