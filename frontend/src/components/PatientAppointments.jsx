import React, { useEffect } from "react";
import { appointmentStore } from "../stores/appointmentsStore";

export default function PatientAppointments() {
  const myappointment = appointmentStore((state) => state.myappointment);
  const myAppointments = appointmentStore((state) => state.myAppointments);

  useEffect(() => {
    myAppointments();
  }, []);
  return (
    <div className="container b-2">
      <h4 className="text-center mt-4 fw-bold">My Appointments</h4>
      <table className="w-100  text-center mt-4 table-light"  style={{ borderCollapse: 'separate', borderSpacing: '0 10px' }}>
       <tbody>
            <tr style={{height:"50px", backgroundColor:"rgba(101, 173, 255, 1)"}}>
          <th>Doctor Name</th>
          <th>Date <p> YY-MM-DD</p></th>
          <th>Appointments Time</th>
          <th>Status</th>
        </tr>
        {myappointment?.map((appointment) => {
          return (
           <tr className="table-light text-dark shadow-sm glass-effect custom-row rounded-3" style={{height:"50px"}}>
  <td className="fw-bold text-info">Dr. {appointment.Doctor.name}</td>
  <td>{appointment.appointmentDate}</td>
  <td>{appointment.appointmentTime}</td>
  <td className={
        appointment.status === "Completed" ? "text-success fw-bold" :
        appointment.status === "Cancelled" ? "text-warning fw-bold" :
        "text-secondary fw-bold"
      }>
    {appointment.status}
  </td>
</tr>

          );
        })}
     
        </tbody>
         </table>

    </div>
  );
}
