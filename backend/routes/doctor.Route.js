const express=require("express");
const router=express.Router()
const {authenticate}=require("../middlewares/auth.middleware")
const {checkAdmin}=require("../middlewares/authorization");
const {getAllDoctors, createDoctor, getDoctorById, updateDoctor, deleteDoctor}=require("../controllers/doctor.controller")

router.get("/doctors",authenticate,getAllDoctors);
router.post("/doctorc",authenticate,createDoctor);
router.get("/doctors/:id",authenticate,checkAdmin,getDoctorById);
router.put("/doctoru/:id",authenticate,updateDoctor);
router.delete("/delete/:id",authenticate,deleteDoctor);

// router.delete()
module.exports=router;