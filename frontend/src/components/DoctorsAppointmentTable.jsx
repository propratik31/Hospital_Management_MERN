import React, { useEffect, useRef, useState } from "react";
import { appointmentStore } from "../stores/appointmentsStore";
import ToggleSwitch from "./ToggleSwitch";


//problem in setting a state

export default function DoctorsAppointmentTable() {

  // all functions and values
  const { doctorAppointment } = appointmentStore();
  const { doctorsAppointmentsss } = appointmentStore() || [];
  const {gettodayAppointment}=appointmentStore();
  const {editAppointment}=appointmentStore();
  const {todaysAppointment}=appointmentStore() || [];
  const [appointment,setAppointment]=useState([]);
  const [today,setToday]=useState(false);
  const [dappointment, setDappointment] = useState({
    id: "",
    name: "",
    status: "",
    notes: ""
  });
  const [dropdown, setDropdown] = useState(false);
  let close=useRef();



   // This function for change the state of today 
  const toggleSwitch = () => setToday(!today);


//useEffect Only For Trigger setAppointment function
  useEffect(()=>{
   SetAppointment();
  //  gettodayAppointment();
   
  },[toggleSwitch]);


  // here we set status when we update
  const setDropValue=(status)=>{

      setDappointment((prev)=>({
          ...prev,status:status
      }));
      setDropdown(false);
      
  }

  // our set appointment function its set todays appointment and all appointment
  const SetAppointment=()=>{
    if(today){
      setAppointment(todaysAppointment);
    }
    else{
      setAppointment(doctorsAppointmentsss);
    }
  }

 // Its only onchnage for chnaging a notes value
  const onchange=(e)=>{
       setDappointment({...dappointment,[e.target.name]:e.target.value})
  }

  //when user click on update we set value to the modal
  const updateChange = (data) => {
    setDappointment({
      id: data.id,
      name: data.Patient.name,
      status: data.status,
      notes: data.notes
    });
  };


  //actual submit function after the user save 
  const submitValues=()=>{
    editAppointment(dappointment);
    close.current.click();
  }
  

  //useEffect for getting all functions and values
  useEffect(() => {
    doctorAppointment();
    gettodayAppointment();
    SetAppointment();
   
  }, []);

  return (
    <div className="container">
      <h4 className="text-center mt-4">My Appointments</h4>
      {/* logic of toggle button */}
      <div>
           <div
      className={`w-25 h-25 rounded-4 d-flex p-1 shadow-lg glass-effect`}
      style={{ cursor: "pointer" }}
      onClick={toggleSwitch} // click anywhere to toggle
    >
      <div
        className={`rounded-4 text-bg-primary px-3 py-2`}
        style={{
          width: "50%",
          textAlign: "center",
          transition: "all 0.3s ease",
          marginLeft: today ? "0" : "50%",
          fontSize:"10px"
        }}
      >
        {today ? "Today Appointment" : "All Appointment"}
      </div>
    </div>
      </div>
        
        {/* Logic of table */}
      <div className="container">
        <table
          className="w-100"
          style={{ borderCollapse: "separate", borderSpacing: "0 10px" }}
        >
          <thead>
            <tr
              className="rounded-4 text-center"
              style={{
                backgroundColor: "rgba(115, 204, 245, 1)",
                height: "60px"
              }}
            >
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
              <th>Status</th>
              <th>Notes</th>
              <th>O/p</th>
            </tr>
          </thead>
          <tbody className="text-center">
           {appointment.length === 0 && (
      <tr>
        <td colSpan={6} className="text-center fw-bold  text-decoration-line-through fs-5">
          No Appointments !
        </td>
      </tr>
    )}
            {appointment.map((app, index) => (
              <tr
                key={index}
                className="shadow-lg galss-effect rounded-3"
                style={{ height: "60px" }}
              >
                <td className="fw-bold text-primary">{app.Patient.name}</td>
                <td>{app.appointmentDate}</td>
                <td>{app.appointmentTime}</td>
                <td
                  className={
                    app.status === "Completed"
                      ? "text-success fw-bold"
                      : app.status === "Cancelled"
                      ? "text-danger fw-bold"
                      : "text-secondary fw-bold"
                  }
                >
                  {app.status}
                </td>
                <td style={{maxWidth:"300px",padding:"0px 5px"}}>{app.notes}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    data-bs-target="#formModal"
                    data-bs-toggle="modal"
                    onClick={() => updateChange(app)}
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Always keep modal in DOM */}
      <div
        className="modal fade"
        id="formModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Update Appointment</h5>
              <button ref={close}
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form className="d-flex flex-column gap-3">
                {/* Row 1 */}
                <div className="d-flex gap-3">
                  <div className="form-group flex-fill">
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      readOnly
                      value={dappointment.name}
                    />
                  </div>

                  <div className="form-group flex-fill">
                    <label htmlFor="id">ID</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      value={dappointment.id}
                      readOnly
                    />
                  </div>
                </div>

                {/* Row 2 - Dropdown */}
                <div className="d-flex gap-3">
                  <div className="form-group flex-fill">
                    <div
                      className="text-bg-primary mt-4 text-center pt-2 pb-2 rounded-3"
                      onClick={() => setDropdown(!dropdown)}
                      style={{ cursor: "pointer" }}
                    >
                      {dappointment.status || "Select Status"}
                    </div>

                    {dropdown && (
                      <div>
                        <div
                          className="text-center mt-2 text-bg-success p-2"
                          onClick={() =>
                            {setDropValue("Completed")}
                          }
                        >
                          Completed
                        </div>
                        <div
                          className="text-center mt-2 text-bg-danger p-2"
                          onClick={() =>
                           setDropValue("Cancelled")
                          }
                        >
                          Cancelled
                        </div>
                        <div
                          className="text-center mt-2 text-bg-secondary p-2"
                          onClick={() =>
                            setDropValue("Completed")
                          }
                        >
                          Scheduled
                        </div>

                      </div>
                    )}
                       <div className="d-flex form-group mt-3">
                          <div className="flex-fill">
                               <label htmlFor="notes">Notes</label>
                               <input type="text" name="notes" id="notes"className="form-control" value={dappointment.notes || ""}  onChange={onchange}/>
                          </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>

            <div className="d-flex container gap-5 ">
              <button
                type="button"
                className="btn btn-danger flex-fill m-5 mb-4 mt-2 fw-bold"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary fw-bold flex-fill m-5 mb-4 mt-2" onClick={submitValues}>
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

