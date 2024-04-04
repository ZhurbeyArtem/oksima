import { findUserById } from "../services/user.js";
import { Payout } from "../models/payout.js";

export const getPayouts = async ({ status = "waiting" }) => {
  try {
    const payouts = await Payout.findAll({
      where: {
        status,
      },
    });
    return payouts;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
};
export const createPayout = async ({ transferFromId, transferToId, sum }) => {
  try {
    if (transferFromId) {
      await findUserById(transferFromId);
    }
    await findUserById(transferToId);
    const payout = await Payout.create({
      transferFromId,
      transferToId,
      sum,
    });
    return payout;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
};

export const closePayout = async ({ id, newStatus }) => {
  try {
    const payout = await Payout.findByPk(id);
    if (newStatus === "finished") {
      if (payout.transferFromId === null) {
        console.log("++");
        const secondUser = await findUserById(payout.transferToId);
        console.log(secondUser);
        secondUser.balance += payout.sum;
        console.log(secondUser);
        secondUser.save();
      } else {
        const firstUser = await findUserById(payout.transferFromId);
        const secondUser = await findUserById(payout.transferToId);

        firstUser.balance -= payout.sum;
        secondUser.balance += payout.sum;

        firstUser.save();
        secondUser.save();
      }
    }
    payout.status = newStatus;
    payout.save();
    return "Success";
  } catch (error) {}
};
