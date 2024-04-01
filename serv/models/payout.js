import { DataTypes } from "sequelize";
import { sequelize } from "../db.js";

export const Payout = sequelize.define("payout", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  bloggerId: {
    type: DataTypes.INTEGER,
  },
  brandId: {
    type: DataTypes.INTEGER,
  },
  sum: {
    type: DataTypes.INTEGER,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["finished", "rejected", "inProcess"],
  },
});
