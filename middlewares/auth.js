import jwt from "jsonwebtoken";
import { findUserById } from "../services/user.js";

export const authMiddleware = async (req, res, next) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const auth = req.headers.authorization.split(" ");
    if (auth[0] !== "Bearer") throw Error;
    const token = auth[1];
    if (!token) {
      throw Error;
    }
    const decoded = jwt.verify(token, process.env.SECRET);


    const user = await findUserById(decoded.id);
    if (!user) {
      throw Error;
    }
    req.user = decoded;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ message: "User doesn`t auth" });
  }
};
