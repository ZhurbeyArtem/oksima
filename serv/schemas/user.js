import Joi from "joi";

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
  }),
});

export const registerSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
  }),
  firstName: Joi.string()
    .required()
    .messages({ "any.required": "firstName is required" }),
  lastName: Joi.string()
    .required()
    .messages({ "any.required": "lastName is required" }),
  role: Joi.string().required().valid("manager", "blogger", "brand").messages({
    "any.required": "role is required",
    "any.only": "Invalid role, choose one of them manager, blogger, brand",
  }),
});

export const forgotPasswordSchema = Joi.object({
  email: Joi.string()
    .email()
    .required()
    .messages({ "any.required": "Email is required" }),
});

export const resetPasswordSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "any.required": "Email is required",
  }),
  password: Joi.string().min(8).required().messages({
    "any.required": "Password is required",
  }),
  code: Joi.number().required().min(1000).max(9999).messages({
    "any.required": "Code is required",
    "any.length": "required length 4 symbols",
  }),
});

export const changeBalanceSchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required",
  }),
  value: Joi.number().required().messages({
    "any.required": "Value is required",
  }),
});
