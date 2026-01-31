import  { useEffect } from 'react'
import DashBoardCount from './DashBoardCount'
import { adminStore } from "../stores/adminStore"
// import ShowDoctors from './ShowDoctors';
import AdminDoctors from './AdminDoctors';
import AdminPatient from './AdminPatient';
import AdminOtherStaff from './AdminOtherStaff';

export default function AdminHome() {
  const getDoctors = adminStore((state) => state.getDoctors);
  const getPatients=adminStore((state)=>state.getPatients);
  const getOtherStaff=adminStore((state)=>state.getOtherStaff);
  const getAppointments=adminStore((state)=>state.getAppointments)
  const doctors = adminStore((state) => state.doctors) || [];
  const patients=adminStore((state)=>state.patients) || [];
  const otherStaff=adminStore((state)=>state.otherStaff) || [];
  const appointments=adminStore((state)=>state.appointments) || []

  // console.log("printing from home",otherStaff);
  
  useEffect(() => {
    getDoctors();
    getPatients();
    getOtherStaff();
    getAppointments();
  },[getDoctors]);

  return (
    <div className='container'>
      <DashBoardCount doctorCount={doctors.length || 0} patients={patients.length ||0} otherStaff={otherStaff.length || 0} appointments={appointments.length}/>
      {/* <ShowDoctors /> */}
      <div className='d-flex gap-4 justify-content-between  mt-2 '>
        <div className='border p-4 w-100'>{<AdminDoctors/>}</div>
        <div className='border p-4 w-100'>{<AdminPatient/>}</div>
        <div className='border p-4 w-100'>{<AdminOtherStaff/>}</div>
      </div>
    </div>
  )
}
