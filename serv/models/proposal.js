import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Proposal = sequelize.define("proposal", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  brandId: {
    type: DataTypes.INTEGER,
  },
  bloggerId: {
    type: DataTypes.INTEGER,
  },
  description: {
    type: DataTypes.STRING,
  },
  title: {
    type: DataTypes.STRING,
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  sum: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["finished", "inProcess", "notStarted"],
    defaultValue: "notStarted",
  },
  bloggerConfirm: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  brandConfirm: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
});
