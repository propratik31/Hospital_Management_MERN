import React from 'react'

export default function DoctorDashboard({appointment,todays}) {
  return (
         <div className='container w-100 h-50 d-flex text-center gap-4 mt-3 '>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>My Appointments</p>
        <h4>{appointment}</h4>
      </div>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>My Todays Appointment</p>
        <h4>{todays}</h4>
        </div>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>Total Prsecriptions</p>
        <h4>{0}</h4>
      </div>
       {/* <div className='flex-fill border rounded p-4 w-100'>
        <p>Other Staff</p>
        <h4>{0}</h4>
      </div> */}
    </div>
  )
}
