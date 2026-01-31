const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken");
const User=require("../models/User");
const Patient=require("../models/Patient");



exports.register=async(req,res)=>{
    try {
        const {name,email,password,age,gender,contact,address}=req.body;
        if(!name || !email || !password  || !age || !contact ||!gender){
            return res.status(400).json({
                message:"Please Fill All Details"
            })
        }

        //existing user checking 

        const oldUser= await User.findOne({where:{email:email}});
        if(oldUser){
            return res.status(400).json({
                message:"User is Alredy exist Please Login"
            })
        }

        const hashPass=await bcrypt.hash(password,10);

        const newUser=await User.create({name,email,password:hashPass,role:"Patient"})
        console.log(newUser)
        const patient=await Patient.create({userId:newUser.id,name,age,gender,contact,address})

     return res.status(200).json({
        message:"User has Been Registered",
        user:newUser,
        patient:patient
     })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message:"Internal Server Error",
            
        })
    }
}

exports.Login=async(req,res)=>{
try {
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            message:"Please Fill All Details"
        })
    }

    const authUser=await User.findOne({where:{email:email}});

    if(!authUser){
        return res.status(400).json({
            message:"Please Signup User Not Found"
        })
    }

    console.log(authUser);

    
   if(await bcrypt.compare(password,authUser.password)){
    const token=jwt.sign({id:authUser.id,email},process.env.TOKEN_PASSKEY);
    

    return res.status(200).cookie("token",token,{maxAge: 24 * 60 * 60 * 1000}).json({
        message:"Login Succesfully Welcome to the Happy Nation 👨‍💻 ",
        authUser,token
    })
   }
   else{
    return res.status(401).json({
        message:'Incorrect Password'
    })
   }

} catch (error) {
    // console.log("Error in Login Controller",error);
    return res.status(500).json({
        message:"Internal Server Error"
    })
}
}

exports.Logout=async(req,res)=>{
    try {
        const {id,email}=req.payload;
        console.log("UserID is ",id,email)
        return res.cookie("token","",{expires:0}).json({
            message:"LogOut SucessFull Thank You For Visit 😒"
        })
        
    } catch (error) {
        console.log(error)
       return res.status(200).json({
           message:"Internal Server Error"
       })  
    }
}
