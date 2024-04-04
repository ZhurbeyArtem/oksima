import { Router } from "express";
import usersRouter from "./user.js";
import categoriesRouter from "./categories.js";
import { authMiddleware } from "../middlewares/auth.js";
import proposalRouter from "./proposal.js";
import payoutRouter from "./payout.js";

const mainRouter = Router();


mainRouter.use("/users", usersRouter);
mainRouter.use("/categories", authMiddleware, categoriesRouter);
mainRouter.use("/proposals", authMiddleware, proposalRouter);
mainRouter.use("/payouts", authMiddleware, payoutRouter);

export default mainRouter;