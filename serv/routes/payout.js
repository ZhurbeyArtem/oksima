import express from "express";

import {
  closePayoutController,
  createPayoutController,
  getPayoutsController,
} from "../controllers/payout.js";

const payoutRouter = express.Router();

payoutRouter.post(
  "/create",
  createPayoutController
);

payoutRouter.post(
  "/close",
  closePayoutController
);

payoutRouter.get("/", getPayoutsController);

export default payoutRouter;
