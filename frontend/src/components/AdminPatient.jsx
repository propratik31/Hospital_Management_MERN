import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminPatient() {
  return (
    <div className='p-4 w-100'>
      <h4>👨‍👩‍👧 Our Patients</h4>
      <p>This section contains records of all patients in the hospital. You can check their details, view their appointments, and manage patient information securely.</p>
      <Link to="/patients"><button className='btn btn-primary'>Manage Patients</button></Link>
    </div>
  )
}
