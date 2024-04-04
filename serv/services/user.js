import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { User } from "../models/user.js";
import HttpError from "../helpers/httpError.js";
import { transporter } from "../helpers/mailer.js";

export async function registration(data) {
  try {
    const { password, role, email } = data;
    await findUser(email, "registration");
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    const newUser = new User({
      ...data,
      password: hashedPassword,
    });
    await newUser.save();

    return {
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
    };
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function login({ email, password }) {
  try {
    const data = await findUser(email, "login");
    const comparePassword = bcrypt.compareSync(password, data.password);
    if (!comparePassword) {
      throw HttpError({
        status: "error",
        code: 401,
        message: "Password is wrong",
      });
    }
    const token = jwt.sign(
      { id: data.id, email: data.email, role: data.role },
      process.env.SECRET,
      {
        expiresIn: "24h",
      }
    );
    data.token = token;
    await data.save();
    return {
      token,
      user: {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        balance: data.balance,
        role: data.role,
        id: data.id,
      },
    };
  } catch (error) {
    console.log(error);
    throw {
      message:
        error.status.message || error.message || "Ops something happened wrong",
      status: error.status.code || error.status || 500,
    };
  }
}

async function findUser(email, method) {
  try {
    const user = await User.findOne({ where: { email: email } });
    if (user && method === "registration") {
      throw HttpError({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    if (!user && method === "login") {
      throw HttpError({
        status: "error",
        code: 401,
        message: "Email is wrong",
      });
    }
    if (!user && method === "reset") {
      throw HttpError({
        status: "error",
        code: 404,
        message: "Email not found",
      });
    }
    return user;
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}

export async function forgotPassword({ email }) {
  try {
    const user = await findUser(email, "reset");
    const minCeiled = Math.ceil(1000);
    const maxFloored = Math.floor(9999);
    const code = Math.floor(
      Math.random() * (maxFloored - minCeiled + 1) + minCeiled
    );

    user.resetCode = code;

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Reset your password code",
      html: `<h2 style="color:red;font-size:46px;">${code}</h2>`,
    };
    await transporter.sendMail(mailOptions);
    await user.save();
    return "Success";
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.code || 500,
    };
  }
}

export async function resetPassword({ code, password, email }) {
  try {
    const user = await findUser(email, "reset");
    if (user.resetCode != code) {
      throw HttpError({
        status: "error",
        code: 400,
        message: "Incorrect code",
      });
    }
    const hashedPassword = await bcrypt.hash(
      password,
      Number(process.env.SALT)
    );
    user.password = hashedPassword;
    user.resetCode = null;
    await user.save();
    return "Success";
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}

export async function findUserById(id) {
  try {
    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError({
        status: "error",
        code: 404,
        message: "User not found",
      });
    }
    return user;
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}

export async function changeBalance({ id, value }) {
  try {
    const user = await findUserById(id);
    user.balance += value;
    await user.save();
    return "Success";
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}

export async function findUsersByRole({ role, page = 1, limit = 10 }) {
  try {
    const offset = (page - 1) * limit;

    const users = await User.findAll({
      where: { role: role },
      offset: offset,
      limit: limit,
    });

    const totalUsersCount = await User.count({ where: { role: role } });
    const totalPages = Math.ceil(totalUsersCount / limit);

    return {
      users: users,
      totalPages: totalPages,
    };
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.code || 500,
    };
  }
}

export async function changeName({ id }, { firstName, lastName }) {
  try {
    const user = await User.findByPk(id);
    user.firstName = firstName;
    user.lastName = lastName;
    await user.save();
    return {
      firstName,
      lastName,
    };
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.code || 500,
    };
  }
}
