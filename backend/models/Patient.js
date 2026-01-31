const { DataTypes, STRING } = require("sequelize");
const sequalize = require("../config/db");
const User = require("./User");

const Patient = sequalize.define(
  "Patient",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: { model: User, key: "id" },
    },
    name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    gender: { type: DataTypes.STRING, allowNull: false },
    contact: { type: DataTypes.BIGINT, allowNull: false },
    address: { type: DataTypes.STRING },
  },
  {
    timestamps: true,
  }
);

// Relationship
User.hasOne(Patient, { foreignKey: 'userId' });
Patient.belongsTo(User, { foreignKey: 'userId' });

module.exports = Patient;
