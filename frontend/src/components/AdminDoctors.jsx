import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminDoctors() {
  return (
    <div className='w-100 p-4'>
      <h4>👨‍⚕️ Our Doctors</h4>
      <p>Here you can view the list of all registered doctors. As an admin, you can add new doctors, update their details, or remove doctors if needed. This section helps in keeping the hospital’s doctor directory up to date.</p>
      <Link to="/doctors"><button className="btn btn-primary">Manage Doctors</button> </Link>
      
    </div>
  )
}
