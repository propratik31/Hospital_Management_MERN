const { DataTypes } = require("sequelize");
const sequalize = require("../config/db");

const Staff = sequalize.define(
  "Staff",
  { 
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.BIGINT, allowNull: false },
    address: { type: DataTypes.STRING },
    role:{type:DataTypes.STRING,allowNull:false}
  },
  {
    timestamps: true,
  }
);


module.exports = Staff;
