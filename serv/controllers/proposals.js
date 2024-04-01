import {
  getProposals,
  createProposal,
  finishProposal,
  applyProposal,
  acceptProposal,
} from "../services/proposals.js";

export const getProposalsController = async (req, res) => {
  try {
    const result = await getProposals(req.user);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const createProposalController = async (req, res) => {
  try {
    const result = await createProposal(req.user, req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const finishProposalController = async (req, res) => {
  try {
    const result = await finishProposal(req.user, req.params);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const applyProposalController = async (req, res) => {
  try {
    const result = await finishProposal(req.user, req.params);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const acceptProposalController = async (req, res) => {
  try {
    const result = await acceptProposal(req.params);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
