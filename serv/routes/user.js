import express from "express";
import {
  registrationController,
  loginController,
  forgotPasswordController,
  resetPasswordController,
  changeBalanceController,
  findUsersByRoleController,
  changeNameController,
} from "../controllers/user.js";
import { validateBody } from "../helpers/validateBody.js";
import {
  changeBalanceSchema,
  findUsersByRoleSchema,
  forgotPasswordSchema,
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schemas/user.js";
import { authMiddleware } from "../middlewares/auth.js";

const usersRouter = express.Router();

usersRouter.post(
  "/registration",
  validateBody(registerSchema),
  registrationController
);
usersRouter.post("/login", validateBody(loginSchema), loginController);

usersRouter.post(
  "/password/forgot",
  validateBody(forgotPasswordSchema),
  forgotPasswordController
);
usersRouter.post(
  "/password/reset",
  validateBody(resetPasswordSchema),
  resetPasswordController
);

usersRouter.post(
  "/balance",
  validateBody(changeBalanceSchema),
  changeBalanceController
);

usersRouter.put("/", authMiddleware, changeNameController);

usersRouter.get(
  "/",
  validateBody(findUsersByRoleSchema),
  findUsersByRoleController
);

export default usersRouter;
