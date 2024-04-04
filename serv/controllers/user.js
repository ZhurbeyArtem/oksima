import {
  changeBalance,
  changeName,
  findUsersByRole,
  forgotPassword,
  login,
  registration,
  resetPassword,
} from "../services/user.js";

export const registrationController = async (req, res) => {
  try {
    const user = await registration(req.body);
    res.json(user);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const loginController = async (req, res) => {
  try {
    const user = await login(req.body);
    res.json(user);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
export const forgotPasswordController = async (req, res) => {
  try {
    const result = await forgotPassword(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const resetPasswordController = async (req, res) => {
  try {
    const result = await resetPassword(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const changeBalanceController = async (req, res) => {
  try {
    const result = await changeBalance(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const findUsersByRoleController = async (req, res) => {
  try {
    const result = await findUsersByRole(req.body);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const changeNameController = async (req, res) => {
  try {
    const result = await changeName(req.user, req.body);

    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
