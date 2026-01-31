const Doctor=require("../models/Doctor")
const User=require("../models/User");
const bcrypt=require("bcrypt");


exports.getAllDoctors=async(req,res)=>{
  try {
    const AllDoctor = await Doctor.findAll({});

    console.log(AllDoctor);
    return res.status(200).json({
      message: "All Doctors fetch",
      doctors: AllDoctor,
    });

    
  } catch (error) {
    console.log("Error in  GetAll Patient", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

exports.getDoctorById=async(req,res)=>{
  try {
    const { id } = req.params;

    const getDoctor = await Doctor.findOne({ where: { id: id } });
    if (!getDoctor) {
      return res.status(400).json({
        message: "User Not Found For this Id ",
      });
    }
    return res.status(200).json({
      message: "User Found",
      data: getDoctor,
    });
  } catch (error) {
    console.log("Error in Doctor Controller", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
}

exports.createDoctor=async(req,res)=>{
  try {
    
    const {name,email,password,specialization,contact,address,gender}=req.body;

    if(!name || !email || !password || !specialization || !contact || !address || !gender){
      return res.status(400).json({
        message:"All Details are mandatory"
      })
    }
    console.log(email)

    const oldUser=await User.findOne({where:{email:email}});
    if(oldUser){
     console.log("execute ")
      return res.status(401).json({
        message:"User Already exist"
      })
    }
    const hashPass=await bcrypt.hash(password,10)

    const newUser=await User.create({name,email,password:hashPass,role:"Doctor"});

    if(!newUser){
      return res.status(400).json({
        message:"Employee creation failed"
      })
    }

    const newDoctor=await Doctor.create({userId:newUser.id,name,specialization,gender,contact,address})

    if(!newDoctor){
      await newUser.destroy();
      return res.status(400).json({
        message:"Doctor Not registered please try again"
      })
    }

    return res.status(200).json({
      message:"Doctor Added In Our System",
      data:newDoctor
    })

  } catch (error) {
    console.log("Error in Create Doctor",error);
    return res.status(500).json({
      message:"Internal server Error"
    })
  }
}

exports.updateDoctor=async(req,res)=>{
  try {
    const {id}=req.params;
   const {name,specialization,contact,address,gender}=req.body;

    if(!name || !specialization || !contact || !address || !gender){
      return res.status(400).json({
        message:"All Details are mandatory"
      })
    }

    const findDoctor=await Doctor.findByPk(id);
    const findUser=await User.findByPk(findDoctor.userId);


    if(!findUser || !findUser){
      return res.status(400).json({
        message:"No User Found for This Id"
      })
    }

    await findUser.update({name});
    await findDoctor.update({name,specialization,contact,address,gender})

    return res.status(200).json({
      message:"updated SUcess",
      findUser,
      findDoctor
    })
    
  } catch (error) {
    console.log("Error in updateDoctor",error);
    return res.status(500).json({
      message:'Internal Server Error'
    })
    
  }

}
exports.deleteDoctor=async(req,res)=>{
  try {
    const doid=req.params.id;
    const doctor=await Doctor.findOne({where:{id:doid}});
    const user=await User.findOne({where:{id:doctor.userId}});
    if(!doctor || !user){
      return res.status(400).json({
        message:"Error To delete Doctor"
      })
    }

    if(doctor && user){
      console.log("execute")
      await doctor.destroy();
      await user.destroy();
      return res.status(200).json({
        message:"Doctor Deleted Sucessfully"
      })
    }
    return res.status(200).json({
      message:"Error to delete Doctor"
    })
  } catch (error) {
    console.log("Error in Delete Doctor",error);
    return res.status(500).json({
      message:"Internal server Error"
    })
  }
}