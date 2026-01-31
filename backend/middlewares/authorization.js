const User=require("../models/User");

exports.checkAdmin=async(req,res,next)=>{
    try {
        // const payloder=req.payload;
        const id=req.payload.id;
        
        const user=await User.findOne({where:{id:id}})
        // console.log(user)
        if(user.role==="Admin"){
           return  next();
        }
        return res.status(401).json({
            message:"Unauthorised Access 👨‍💻"
        })
    } catch (error) {
        console.log("Error in Authorization checkAdmin",error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

exports.checkPatientORAdmin=async(req,res,next)=>{
    try {
        const id=req.payload.id;
        const user=await User.findByPk(id);
        if(user.role==="Patient" || user.role==="Admin"){
           return  next();
        }
        return res.status(401).json({
            message:"Unauthorised Access 👨‍💻"
        })
        
    } catch (error) {
        console.log("Error in Authorization admin or patient",error);
        return res.status(500).json({
            message:"Internal Server Error",
            error:error
        })
    }
}

exports.checkDoctorORAdmin=async(req,res,next)=>{
    try {
        const {id}=req.payload;
        const user=await  User.findOne({where:{id:id}})
        if(user.role==="Doctor" || user.role==="Admin"){
           return  next();
        }
        return res.status(401).json({
            message:"Unauthorised Access 👨‍💻"
        })
    } catch (error) {
        console.log("Error in Authorization checkAdmin",error);
        return res.status(500).json({
            message:"Internal Server Error"
        })
    }
}

