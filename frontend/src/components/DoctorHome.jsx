import React, { useEffect } from 'react'
import DoctorDashboard from './DoctorDashboard'
import { appointmentStore } from '../stores/appointmentsStore'
import { Link } from 'react-router-dom'


export default function DoctorHome() {
  const {doctorAppointment}=appointmentStore()
  const {doctorsAppointmentsss}=appointmentStore() || [];
  // console.log("Appointment",doctorsAppointmentsss);
  useEffect(()=>{
         doctorAppointment();
  },[]);
  return (
    <div>
     <div>
       <h4 className='mt-4 mb-2 text-center fw-bold'>Welcome Back Doctor !😊</h4>
      <DoctorDashboard appointment={doctorsAppointmentsss?.length} todays={0}/>
     </div>
      <div className='d-flex container gap-5 text-center mt-5'>
       <div className='shadow-lg glass-effect p-4 rounded-3'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem cum explicabo voluptates non consequuntur cumque quas odit, sint deserunt tempora praesentium iure debitis rerum optio totam veniam, repellendus quos!</p>
      
        
        <Link to="/doctor/appointments"><button className='btn btn-primary'>Check Appointments </button></Link>
       </div>
       <div className='p-4 shadow-lg glass-effect rounded-3' >
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique fugit asperiores distinctio culpa blanditiis sunt, cum tempora quod, illum consectetur sit odit optio autem fugiat assumenda cupiditate magnam impedit possimus!</p>
        <Link to="/profile"><button className='btn btn-primary'>My Profile </button></Link>
       </div>
       <div className='p-4 shadow-lg glass-effect rounded-3'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, animi unde! Corporis maiores dolor sit non ipsum adipisci unde exercitationem? Itaque vel possimus cumque eum voluptate nam? Illum, impedit ea.</p>
       <Link to="/myAppointments"> <button className='btn btn-primary'>Todays Appointment </button></Link>
       </div>
     
   
    </div>
    </div>
  )
}
