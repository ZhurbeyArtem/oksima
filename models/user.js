import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const User = sequelize.define("user", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
  },
  balance: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM,
    values: ["manager", "blogger", "brand"],
  },
  resetCode: {
    type: DataTypes.STRING,
  },
});
