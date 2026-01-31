import React, { useEffect } from 'react'
import PatientHome from "../components/PatientHome"
import DoctorHome from '../components/DoctorHome'
import AdminHome from '../components/AdminHome'
import {userAuthStore} from "../stores/userAuthStore"
import LoginPage from './LoginPage'
export default function HomePage() {
  const user=userAuthStore((state)=>state.user)
// console.log(user);


if(!user) return <LoginPage/>

if (user.role=="Admin") return <AdminHome/>
if (user.role=="Doctor") return <DoctorHome/>
if (user.role=="Patient") return <PatientHome/>
 return <div>Unknown Role</div>
}
