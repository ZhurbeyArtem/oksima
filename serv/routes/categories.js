import express from "express";
import { validateBody } from "../helpers/validateBody.js";
import { createCategoryController, deleteCategoryController, getCategoriesController } from "../controllers/categories.js";
import { createCategorySchema, deleteCategorySchema } from "../schemas/categories.js";

const categoriesRouter = express.Router();

categoriesRouter.delete(
  "/:id",
  deleteCategoryController
);

categoriesRouter.post(
  "/",
  validateBody(createCategorySchema),
  createCategoryController
);

categoriesRouter.get("/", getCategoriesController);

export default categoriesRouter;
