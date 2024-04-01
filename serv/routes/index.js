import { Router } from "express";
import usersRouter from "./user.js";
import categoriesRouter from "./categories.js";
import { authMiddleware } from "../middlewares/auth.js";
import proposalRouter from "./proposal.js";

const mainRouter = Router();


mainRouter.use("/users", usersRouter);
mainRouter.use("/categories", authMiddleware, categoriesRouter);
mainRouter.use("/proposals", authMiddleware, proposalRouter);

export default mainRouter;