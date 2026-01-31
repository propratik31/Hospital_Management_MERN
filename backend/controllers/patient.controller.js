const Patient = require("../models/Patient");
const User = require("../models/User");

exports.updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, contact,address } = req.body;

    const patient = await Patient.findByPk(id);
    if (!patient) {
      return res.status(400).json({
        message: "Patient Not Found",
      });
    }
    await patient.update({ name, age, gender, contact , address});

    return res.status(200).json({
      message: "Patient Updated Sucessfully",
      patient,
    });
  } catch (error) {
    console.log("Error In create patient", error);
    return res.status(500).json({
      message: "Internal Server error",
    });
  }
};

exports.getAllPatient = async (req, res) => {
  try {
    const AllPatients = await Patient.findAll({});

    console.log(AllPatients);
    return res.status(200).json({
      message: "All patient fetch",
      patients: AllPatients,
    });
  } catch (error) {
    console.log("Error in  GetAll Patient", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

exports.getPatientById = async (req, res) => {
  try {
    const { id } = req.params;

    const getpatient = await Patient.findOne({ where: { id: id } });
    if (!getpatient) {
      return res.status(400).json({
        message: "User Not Found For this Id ",
      });
    }
    return res.status(200).json({
      message: "User Found",
      data: getpatient,
    });
  } catch (error) {
    console.log("Error in Patient Controller", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

exports.deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const findUser = await User.findOne({where:{id:id}});
    console.log(findUser);

    if (!findUser) {
      return res.status(400).json({
        message: "User Not Found",
      });
    }

    const response=await findUser.destroy()
    console.log(response);
    return res.status(200).json({
        message:"Record Delete Sucessfull"
    })

  } catch (error) {
    console.log("Error in P delete Controller", error);
    return res.status(500).json({
      message: "Internal server Error",
    });
  }
};

 