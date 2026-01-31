const express=require("express");
const { authenticate } = require("../middlewares/auth.middleware");
const { checkAdmin } = require("../middlewares/authorization");
const { createStaff, deleteStaff, updateStaff, getAllStaff, createrFake } = require("../controllers/staff.Controller");

const router=express.Router();


router.post("/staff/create",authenticate,checkAdmin,createStaff);
router.delete("/deletes/:id",authenticate,checkAdmin,deleteStaff);
router.put("/updates/:id",authenticate,checkAdmin,updateStaff);
router.get("/staffs",authenticate,checkAdmin,getAllStaff);


//practice route 
// router.get("/quote",createrFake);


module.exports=router;