import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminOtherStaff() {
  return (
    <div className='p-4 w-100'>
     <h4>👨‍💼 Our Staff</h4>
      <p>Here you can manage hospital staff such as nurses, receptionists, and helpers. You can add, edit, and organize staff information for smooth hospital operations.</p>
      <Link to="/staff"><button className='btn btn-primary'>Manage Satff</button></Link>
    </div>
  )
}
