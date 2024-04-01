import express from "express";
import dotenv from "dotenv";
import { sequelize } from "./db.js";
import model from "./models/index.js";
import cors from "cors";
import mainRouter from "./routes/index.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use("/api", mainRouter);


const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

start();
