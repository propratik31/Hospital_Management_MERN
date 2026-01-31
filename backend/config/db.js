const { Sequelize } = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Database connection established");
  })
  .catch((err) => {
    console.log("Unable to connect with DB", err);
  });

//   const bcrypt = require("bcrypt");

// (async () => {
//   const hash = await bcrypt.hash("admin11@gmail.com", 10);
//   console.log(hash);
// })();



  module.exports=sequelize;