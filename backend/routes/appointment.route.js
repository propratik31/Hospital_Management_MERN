const express=require("express");
const { checkAdmin, checkPatientORAdmin, checkDoctorORAdmin } = require("../middlewares/authorization");
const { authenticate } = require("../middlewares/auth.middleware");
const { getAvailableSlots, bookAppointment, getAppointments, getAllAppointment, EditAppointment, getAllAppointmentForAdmin, getTodaysAppointment } = require("../controllers/appointment.controller");
const router=express.Router();


router.post("/avilable",authenticate,getAvailableSlots);
router.post("/appointment/book",authenticate,checkPatientORAdmin,bookAppointment);
router.get("/doctor/appointments",authenticate,checkDoctorORAdmin,getAppointments);
router.get("/patient/appointments",authenticate,checkPatientORAdmin,getAllAppointment);
router.put("/appointment/:id",authenticate,checkDoctorORAdmin,EditAppointment);
router.get("/all",authenticate,checkAdmin,getAllAppointmentForAdmin);
router.get("/appointment/today",authenticate,checkDoctorORAdmin,getTodaysAppointment);


module.exports=router;