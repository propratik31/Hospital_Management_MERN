// controllers/appointmentController.js
const Appointment = require("../models/Appointment");
const Doctor = require("../models/Doctor");
const Patient = require("../models/Patient");


exports.getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date, slotDurationMinutes = 30 } = req.body;




    //  Fixed slots (working hours 9 AM – 5 PM)
    const fixedSlots = [
      "09:00:00","09:30:00","10:00:00","10:30:00",
      "11:00:00","11:30:00","12:00:00","12:30:00",
      "13:00:00","13:30:00","14:00:00","14:30:00",
      "15:00:00","15:30:00","16:00:00","16:30:00"
    ];

    // 2. Fetch booked slots for this doctor + date
    const bookedAppointments = await Appointment.findAll({
      where: { doctorId, appointmentDate: date },
      attributes: ["appointmentTime"],
    });
   
   //here we store only appointment time 
    const bookedTimes = bookedAppointments.map(a => a.appointmentTime);
   

    // we check here which slots are booked and return empty solts
    const availableSlots = fixedSlots.filter(slot => !bookedTimes.includes(slot));

    // 4. Send response
    res.json({
      doctorId,
      date,
      slotDurationMinutes,
      availableSlots
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
};
// Controller: Book Appointment
exports.bookAppointment = async (req, res) => {
  try {
    const userId=req.payload.id;
   
    const {  doctorId, appointmentDate, appointmentTime, notes } = req.body;

    const patient=await Patient.findOne({where:{userId:userId}});

    const patientId=patient.id;

    // Step 1: Validate input
    if (!patientId || !doctorId || !appointmentDate || !appointmentTime) {
      return res.status(400).json({ message: "All fields are required" });

    }

     const today=new Date();
    today.setHours(0,0,0,0);
    const bookingDate=new Date(appointmentDate)
    console.log("booking date",bookingDate);

    if(bookingDate<today){
      return res.status(400).json({
        message:"You can not Book Appointment For yesterday"
      })
    }

    // Step 2: Check if slot already booked
    const existing = await Appointment.findOne({
      where: { doctorId, appointmentDate, appointmentTime, status: "Scheduled"}
    });

    if (existing) {
      return res.status(400).json({ message: "This slot is already booked!" });
    }

    // Step 3: Create appointment
    const appointment = await Appointment.create({
      patientId,
      doctorId,
      appointmentDate,
      appointmentTime,
      notes:"Follow-up visit"
    });

    // Step 4: Send success response
    res.status(201).json({
      message: "Appointment booked successfully",
      appointment
    });

  } catch (err) {
    console.error("Booking Error:", err);
    res.status(500).json({ error: err.message });
  }
};
//for Doctors
exports.getAppointments=async(req,res)=>{
  try {

    const userId=req.payload.id;

    const doctor=await Doctor.findOne({where:{userId:userId}});
    // console.log(doctor.id)
  
   const today = new Date().toISOString().split("T")[0];
console.log(today); // Example: "2025-08-19"

  
  //  const myAppointment=await Appointment.findAll({where:{doctorId:doctor.id,appointmentDate:today},include:[
  //   {
  //     model:Patient,
  //     attributes:["name"]
  //   }
  //  ]});

     const myAppointment=await Appointment.findAll({where:{doctorId:doctor.id},include:[
    {
      model:Patient,
      attributes:["name"]
    }
   ]});

   if(!myAppointment){
    return res.status(400).json({
      message:"No Appointments Now"
    })
   }
   return res.status(200).json({
    message:"Your Todays Appointment",
    data:myAppointment
   })


    
  } catch (err) {
    console.log("Error in getAppointments",err);
    return res.status(500).json({
      error:err.message
    })
  }
}
exports.getTodaysAppointment=async(req,res)=>{
try{
   const userId=req.payload.id;

    const doctor=await Doctor.findOne({where:{userId:userId}});
    // console.log(doctor.id)
  
   const today = new Date().toISOString().split("T")[0];
 // Example: "2025-08-19"

  
   const myAppointment=await Appointment.findAll({where:{doctorId:doctor.id,appointmentDate:today},include:[
    {
      model:Patient,
      attributes:["name"]
    }
   ]});

  //    const myAppointment=await Appointment.findAll({where:{doctorId:doctor.id},include:[
  //   {
  //     model:Patient,
  //     attributes:["name"]
  //   }
  //  ]});

   if(!myAppointment){
    return res.status(400).json({
      message:"No Appointments Now"
    })
   }
   return res.status(200).json({
    message:"Your Todays Appointment",
    data:myAppointment
   })

}

catch(error){
   return res.status(500).json({
    message:"Internal Server Error"
   })
}
}

// Its Only For patient to check 
exports.getAllAppointment=async(req,res)=>{
try {
    const userId=req.payload.id;
    
    const patient=await Patient.findOne({where:{userId:userId}});

    const myAppointment=await Appointment.findAll({where:{patientId:patient.id},
     include: [
        {
          model: Doctor,
          attributes: [ "name"] // select only what you need
        }
      ]}) || [];
    const CompletedAppointments=await Appointment.findAll({where:{patientId:patient.id,status:"Completed"}})||[];

    if(!myAppointment){
      return res.status(400).json({
        message:"No Appointments You Booked"
      })
    }

    return res.status(200).json({
      message:"Your Booked Appointments",
      data:{myAppointment , CompletedAppointments}  

    })

} catch (error) {
  console.log("Error in getAllAppointment",error);
  return res.status(500).json({
    err:error.message
  })
  
}
}
//its edit appointment controller
exports.EditAppointment=async(req,res)=>{
  try {
        const appointmentId=req.params.id;
        const {status,notes}=req.body;

        if(!status || !notes){
          return res.status(400).json({
            message:"Need Status And Notes For Updation"
          })
        }

        const appointment=await Appointment.findByPk(appointmentId);
        console.log(appointment);

        await appointment.update({status,notes}); 


        return res.status(200).json({
          message:"Appointment Updated",
          data:appointment
        })
  }
   catch (error) {
    console.log("error in editAppointment Controller",error);
    return res.status(500).json({
      err:error.message
    })
  }
}
exports.getAllAppointmentForAdmin=async(req,res)=>{
  try {
     const response=await Appointment.findAll({});
     return res.status(200).json({
      message:"Fetched all Appointment sucessfully",
      data:response
     })
  } catch (error) {
   return res.status(500).json({
    message:"Internal server Error"
   }) 
  }
}