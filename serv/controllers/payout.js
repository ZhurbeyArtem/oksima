import {
  getPayouts,
  createPayout,
  closePayout,
} from "../services/payout.js";

export const getPayoutsController = async (req, res) => {
  try {
    const result = await getPayouts(req.query);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const createPayoutController = async (req, res) => {
  try {
    const result = await createPayout(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const closePayoutController = async (req, res) => {
  try {
    const result = await closePayout(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};


