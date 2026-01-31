const express=require("express");
const router=express.Router();
const {register,Login, Logout}=require("../controllers/auth.Controller");
const {authenticate}=require("../middlewares/auth.middleware");
const {checkAdmin}=require("../middlewares/authorization")


router.post("/signup",register);
router.post("/login",Login);
router.post("/logout",authenticate,Logout);


module.exports=router;