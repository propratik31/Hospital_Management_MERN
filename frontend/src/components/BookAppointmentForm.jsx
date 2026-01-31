import React, { useEffect, useState } from "react";
import { adminStore } from "../stores/adminStore";
import { appointmentStore } from "../stores/appointmentsStore";
import { toast } from "react-toastify";

export default function BookAppointmentForm() {
  const getDoctors = adminStore((state) => state.getDoctors);
  const doctors = adminStore((state) => state.doctors);
  const getAvailableSlots = appointmentStore(
    (state) => state.getAvailableSlots
  );
  const avilableSlot = appointmentStore((state) => state.avilableSlot || []);
  const bookAppointment = appointmentStore((state) => state.bookAppointment);
  const [open, setOpen] = useState(false);
  const [appointment, setAppointment] = useState({
    doctorId: "",
    date: "",
    time: "",
    name: "",
  });

  //function for set the name and doctorId
  const setDoctorIDAndName = (doctor) => {
    setAppointment((prev) => ({
      ...prev,
      doctorId: doctor.id,
      name: doctor.name,
    }));
  };

  // console.log( "Taking the slota",avilableSlot);

  //this is use for set slot time
  const onchanges = (e) => {
    const { name, value } = e.target;

    setAppointment((prev) => {
      const updated = { ...prev, [name]: value };

      // ✅ Only trigger slot fetching when doctor or date changes
      if (name === "doctorId" || name === "date") {
        getAvailableSlots(updated);
      }

      return updated;
    });
  };

  //if DoctorsId and Date are change the again get avilable slots
  const onChnagesTheValueDateAndDoctor = () => {
    getAvailableSlots(appointment);
    console.log(appointment)
  };

  const bookAppointmentOnSubmit = () => {
    console.log(appointment)
    if (!appointment.doctorId || !appointment.date) {
      return toast.warning("Please Fill All fields First");
    }
    bookAppointment(appointment);
    setAppointment({ doctorId: "", date: "", time: "", name: "" });
  };

  const clearAllFunc = () => {
    setAppointment({ doctorId: "", date: "", time: "", name: "" });
  };

  // console.log("printing from the bookAppointment",appointment)
  useEffect(() => {
    getDoctors();
  }, []);
  return (
    <div className="container border-2 w-50 mt-5 shadow-lg glass-effect p-5 mb-5">
      <div className="d-flex flex-column">
        <h4 className="text-center mb-5 mt-2 fw-bold">
          Book Your Appointment Here 👨‍💻
        </h4>
        <div className="d-flex">
          <button
            className="flex-fill btn btn-primary"
            onClick={() => setOpen(true)}
          >
            {appointment.name.length > 0 ? appointment.name : "Select Doctor ↡"}
          </button>
        </div>

        {doctors.map((doctor) => {
          console.log(doctor._id)
          return (
            open && (
              <div
                className="text-center  glass-effect shadow-lg d-flex flex-column rounded-3"
                onClick={() => {
                  setOpen(false);
                  setDoctorIDAndName(doctor);
                  onChnagesTheValueDateAndDoctor();
                }}
                key={doctor.id}
              >
                <div>
                 < p className="fw-bold pt-3">{doctor.name}  <span className="ps-4">✨✨✨✨✨</span></p>
                 
                </div>
                <p >
                  {doctor.specialization}
                </p>
              </div>
            )
          );
        })}

        {/* For Selecting Date */}
        <div className="mt-3">
          <div className="form-group ">
            <label htmlFor="date" className="fw-bold">
              Select Date
            </label>
            <input
              type="date"
              name="date"
              className="form-control mt-2"
              value={appointment.date}
              onChange={onchanges}
            />
          </div>
        </div>

        {/* For Selecting Time Slot */}
        <div className="mt-3">
          <div className="form-group">
            <label htmlFor="timeSlot" className="fw-bold">
              Select Appointment Slot
            </label>

            <select
              name="time"
              id="timeSlot"
              value={appointment.time}
              onChange={onchanges}
              className="form-control mt-2"
            >
              <option value="">Select Booking Time</option>
              {avilableSlot.map((slot, index) => {
                // console.log(slot)
                return (
                  <option value={slot} key={index}>
                    {slot}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        {/* Buttons OF submit and clearAll */}
        <div className="d-flex gap-4 mt-4">
          <button
            className="btn btn-success flex-fill"
            onClick={bookAppointmentOnSubmit}
          >
            Submit
          </button>
          <button className="btn btn-danger flex-fill" onClick={clearAllFunc}>
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
}
