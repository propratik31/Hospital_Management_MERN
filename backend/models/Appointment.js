  const {DataTypes}=require("sequelize");
const sequalize=require("../config/db");
const Doctor=require("./Doctor");
const  Patient=require("./Patient");



const Appointment=sequalize.define("Appointment",{
    patientId:{
        type:DataTypes.INTEGER,allowNull:false,
        references:{model:Patient,key:"id"}
    },
    doctorId:{
        type:DataTypes.INTEGER,allowNull:false,references:{model:Doctor,key:"id"},
    },
    appointmentDate:{
        type:DataTypes.DATEONLY,allowNull:false
    },
    appointmentTime:{
        type:DataTypes.TIME,
        allowNull:false
    },
    status:{
        type:DataTypes.ENUM("Scheduled","Completed","Cancelled"),
        defaultValue:"Scheduled"
    },
    notes:{type:DataTypes.TEXT,allowNull:true},
},{timestamps:true});

// Relationships
Appointment.belongsTo(Patient, { foreignKey: "patientId", onDelete: "CASCADE" });
Appointment.belongsTo(Doctor, { foreignKey: "doctorId", onDelete: "CASCADE" });

Patient.hasMany(Appointment, { foreignKey: "patientId" });
Doctor.hasMany(Appointment, { foreignKey: "doctorId" });

module.exports=Appointment;