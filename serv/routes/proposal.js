import express from "express";

import { acceptProposalController, createProposalController, finishProposalController, getProposalsController } from "../controllers/proposals.js";

const proposalRouter = express.Router();

proposalRouter.get("/", getProposalsController);

proposalRouter.post(
  "/",
  createProposalController
);

proposalRouter.post(
  "/finish",
  finishProposalController
);

proposalRouter.post(
  "/accept",
  acceptProposalController
);

export default proposalRouter;
