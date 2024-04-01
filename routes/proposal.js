import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { acceptProposalController, applyProposalController, createProposalController, finishProposalController, getProposalsController } from "../controllers/proposals.js";

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
  "/apply",
  applyProposalController
);
proposalRouter.post(
  "/apply/accept",
  acceptProposalController
);

export default proposalRouter;
