import React from 'react'
import PatientDashBoard from './PatientDashBoard'
import { appointmentStore } from '../stores/appointmentsStore'
import { useEffect } from 'react'
import BookAppointmentForm from './BookAppointmentForm';
import { Link } from 'react-router-dom';
import { userAuthStore } from '../stores/userAuthStore';

export default function PatientHome() {
  const myAppointments=appointmentStore((state)=>state.myAppointments);
  const myappointment=appointmentStore((state)=>state.myappointment);
  const completedAPpointments=appointmentStore((state)=>state.completedAPpointments)
   const {user}=userAuthStore();
  
  useEffect(()=>{
         myAppointments();
  },[])
  return (
    <div>

      {/* dashoboard Code Here */}
     <div>
       <h3 className='text-center fw-bold mt-3 mb-2'>Welcome  {user.name} !😊 </h3>
     <PatientDashBoard appointment={myappointment.length} completedAppointment={completedAPpointments.length}/>
     </div>

     <div className='d-flex container gap-5 text-center mt-5'>
       <div className='shadow-lg glass-effect p-4 rounded-3'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo autem cum explicabo voluptates non consequuntur cumque quas odit, sint deserunt tempora praesentium iure debitis rerum optio totam veniam, repellendus quos!</p>
      
        
        <Link to="/bookAppointment"><button className='btn btn-primary'>Book Your Appointment </button></Link>
       </div>
       <div className='p-4 shadow-lg glass-effect rounded-3' >
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique fugit asperiores distinctio culpa blanditiis sunt, cum tempora quod, illum consectetur sit odit optio autem fugiat assumenda cupiditate magnam impedit possimus!</p>
        <Link to="/profile"><button className='btn btn-primary'>My Profile </button></Link>
       </div>
       <div className='p-4 shadow-lg glass-effect rounded-3'>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor, animi unde! Corporis maiores dolor sit non ipsum adipisci unde exercitationem? Itaque vel possimus cumque eum voluptate nam? Illum, impedit ea.</p>
       <Link to="/myAppointments"> <button className='btn btn-primary'>Show My Appointments </button></Link>
       </div>
     </div>
   
    </div>
  )
}
