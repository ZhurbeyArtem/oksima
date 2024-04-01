import HttpError from "../helpers/httpError.js";
import { Proposal } from "../models/proposal.js";

export async function getProposals({ role }) {
  try {
    let proposals;
    switch (role) {
      case "manager":
        proposals = await Proposal.findAll();
        break;
      case "blogger":
        proposals = await Proposal.findAll({
          where: { bloggerId: null },
        });
        break;
      case "brand":
        proposals = await Proposal.findAll({
          where: { brandId: null },
        });
        break;
    }
    return proposals;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function createProposal({ id, role }, data) {
  try {
    let proposal;
    switch (role) {
      case "manager" || "brand":
        proposal = await Proposal.create({ ...data, brandId: id });
        break;
      case "blogger":
        proposal = await Proposal.create({ ...data, bloggerId: id });
        break;
    }
    return proposal;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}
async function checkProposal(proposal) {
  try {
    if (proposal.brandId && proposal.bloggerId) proposal.status = "inProcess";
    if (proposal.bloggerConfirm && proposal.brandConfirm)
      proposal.status = "finished";

    await proposal.save();
    return proposal;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function finishProposal({ id, role }, proposalId) {
  const proposal = await Proposal.findByPk(proposalId);
  if (
    (role === "manager" && proposal.brandId === id) ||
    (role === "brand" && proposal.brandId === id)
  )
    proposal.brandConfirm = true;
  if (role === "blogger" && proposal.bloggerId === id)
    proposal.bloggerConfirm = true;
  checkProposal(proposal);
  try {
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function applyProposal({ id, role }, proposalId) {
  try {
    const proposal = await Proposal.findByPk(proposalId);
    if (role === "manager" || role === "brand") proposal.brandId = id;
    if (role === 'blogger') proposal.bloggerId = id
  
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function acceptProposal({ id, role }, proposalId) {
  try {
    const proposal = await Proposal.findByPk(proposalId);

    if (role === "manager" || role === "brand") proposal.brandId = id;
    if (role === "blogger") proposal.bloggerId = id;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}
