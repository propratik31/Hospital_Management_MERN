const express=require("express");
const router=express.Router();
const {updatePatient, getAllPatient, getPatientById, deletePatient}=require("../controllers/patient.controller")
const {authenticate}=require("../middlewares/auth.middleware");
const {checkPatientORAdmin, checkAdmin}=require("../middlewares/authorization")


router.put("/update/:id",authenticate,checkPatientORAdmin,updatePatient);
router.get("/patients",authenticate,checkAdmin,getAllPatient);
router.get("/search/:id",authenticate,checkAdmin,getPatientById);
router.delete("/deletep/:id",authenticate,checkAdmin,deletePatient)




module.exports=router;