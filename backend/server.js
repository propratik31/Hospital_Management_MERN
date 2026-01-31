const express=require("express");
const app=express();
const cors=require("cors");


const sequelize=require("./config/db.js");
const authRoutes=require("./routes/auth.Route.js")
const patientRoute=require("./routes/patient.Route.js")
const DoctorRoute=require("./routes/doctor.Route.js");
const staffRoute=require("./routes/staff.Route.js");
const Appointment=require("./routes/appointment.route.js")
const cookie=require("cookie-parser");


app.use(express.json());
app.use(cookie());
app.use(cors());


app.use("/hsm",authRoutes);
app.use("/hsm",patientRoute);
app.use("/hsm",DoctorRoute);
app.use("/hsm",staffRoute);
app.use("/hsm",Appointment);


sequelize.sync({ alter: false })
  .then(() => {console.log("✅ All models synced with DB")})
  .catch(err => console.error("❌ Error syncing models:", err));


app.listen(process.env.PORT || 9090,()=>{
console.log("Server Listening on Port ",process.env.PORT);
})

app.get("/",(req,res)=>{
    res.send("Hospital Project Starting....")
})