import { createCategory, deleteCategory, getCategories } from "../services/categories.js";

export const getCategoriesController = async (req, res) => {
  try {
    const result = await getCategories(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const createCategoryController = async (req, res) => {
  try {
    const result = await createCategory(req.body);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};

export const deleteCategoryController = async (req, res) => {
  try {
    const result = await deleteCategory(req.params);
    res.json(result);
  } catch (error) {
    res.status(error.status).json({ message: error.message });
  }
};
