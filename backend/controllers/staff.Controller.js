const Staff = require("../models/Staff");

exports.createStaff = async (req, res) => {
  try {
    const { name, age, address, role, contact, gender } = req.body;
    if (!name || !age || !address || !role || !contact || !gender) {
      return res.status(400).json({
        message: "Please Provide All details",
      });
    }

    const newStaff = await Staff.create({
      name,
      age,
      address,
      role,
      contact,
      gender,
    });

    if (!newStaff) {
      return res.status(401).json({
        message: "Please Try Again",
      });
    }

    return res.status(200).json({
      message: "Staff Added to Database",
      data: newStaff,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.deleteStaff = async (req, res) => {
  try {
    const { id } = req.params;

    const findUser = await Staff.findByPk(id);
    if (!findUser) {
      return res.status(400).json({
        message: "No User Found For this Id",
      });
    }

    await findUser.destroy();

    return res.status(200).json({
      message: "Employee Deleted Sucessfully",
      data: findUser,
    });
  } catch (error) {
    console.log("Eror in deleteStaff", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

exports.updateStaff = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, address, role, contact, gender } = req.body;
    if (!name || !age || !address || !role || !contact || !gender) {
      return res.status(400).json({
        message: "Please Provide All details",
      });
    }
    const findUser = await Staff.findByPk(id);

    if (!findUser) {
      return res.status(400).json({
        message: "No User Found",
      });
    }

    const updateUser = await findUser.update({name,age,address,gender,role,contact});

    if(!updateUser){
        return res.status(400).json({
            message:"User Not Update Please Try Again"
        })
    }

    return res.status(200).json({
        message:"User updated sucessfully",
        data:updateUser
    })


  } catch (error) {
    console.log("Update STaff Error", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error,
    });
  }
};

exports.getAllStaff=async(req,res)=>{
try {
    const AllStaff=await Staff.findAll({});

    if(!AllStaff){
        return res.status(400).json({
            message:"Error Occur Please Try Again"
        })
    }

    return res.status(200).json({
        message:"All Staff records Fetched",
        data:AllStaff
    })
} catch (error) {
    console.log("Error in getAllStaff Controller",error);
    return res.status(500).json({
        message:'Internal server Error'
    })
}
};

