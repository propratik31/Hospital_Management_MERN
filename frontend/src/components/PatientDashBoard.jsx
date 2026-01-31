import React from 'react'

export default function PatientDashBoard({appointment,completedAppointment}) {
  return (
     <div className='container w-100 h-50 d-flex text-center gap-4 mt-3 '>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>My Appointments</p>
        <h4>{appointment}</h4>
      </div>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>My Completed Appointments</p>
        <h4>{completedAppointment}</h4>
        </div>
      <div className='flex-fill border rounded p-4 w-100 shadow-lg glass-effect'>
        <p>Total Prsecriptions</p>
        <h4>{0}</h4>
      </div>
    </div>
  )
}
