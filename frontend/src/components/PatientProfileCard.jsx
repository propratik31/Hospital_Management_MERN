import React from 'react'
import "/public/css/profileCard.css"
import { userAuthStore } from '../stores/userAuthStore'
export default function PatientProfileCard() {
    const user=userAuthStore((state)=>state.user)
    console.log(user);
  return (
    <div className='profileCard d-flex justify-content-center rounded-3'>
      <div className='h-75 w-25 border mt-5 p-4 glass-effect shadow-lg d-flex flex-column rounded-4' style={{backgroundColor:'white'}}>
        <h4 className='text-center fw-bold'>🏥City Hospital</h4>
        <p className="p-2 ps-4 glass-effect shadow-sm rounded-3 mt-4 flex-fill" style={{border:"1px solid black"}}> <span>Name: </span>  {user.name}</p>
        <p className="p-2 ps-4 glass-effect shadow-sm rounded-3 flex-fill" style={{border:"1px solid black"}}><span>Email: </span>   {user.email}</p>
        <p className="p-2 ps-4 glass-effect shadow-sm rounded-3 flex-fill" style={{border:"1px solid black"}}> <span>Profile Created At: </span> {user.createdAt}</p>
        <p className="p-2 ps-4 glass-effect shadow-sm rounded-3 flex-fill" style={{border:"1px solid black"}}> <span>LastProfileUpdate:</span>    {user.updatedAt}</p>
      
      <button className='btn btn-primary flex-fill'>Edit Profile</button>

      </div>
    </div>
  )
}
