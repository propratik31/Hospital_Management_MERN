import React from 'react'

export default function DashBoardCount(props) {
  // console.log(props.doctorCount)
  return (
    <div className='container w-100 h-50 d-flex text-center gap-4 mt-3 border p-3'>
      <div className='flex-fill border rounded p-4 w-100'>
        <p>Total Doctors</p>
        <h4>{props.doctorCount}</h4>
      </div>
      <div className='flex-fill border rounded p-4 w-100'>
        <p>Total Patients</p>
        <h4>{props.patients}</h4>
        </div>
      <div className='flex-fill border rounded p-4 w-100'>
        <p>Total Appointments</p>
        <h4>{props.appointments}</h4>
      </div>
       <div className='flex-fill border rounded p-4 w-100'>
        <p>Other Staff</p>
        <h4>{props.otherStaff}</h4>
      </div>
    </div>
  )
}
