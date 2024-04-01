import Joi from "joi";

export const createCategorySchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Name is required",
  }),
});
export const deleteCategorySchema = Joi.object({
  id: Joi.number().required().messages({
    "any.required": "Id is required",
  }),
});
