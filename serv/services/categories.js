import HttpError from "../helpers/httpError.js";
import { Category } from "../models/categories.js";

export async function getCategories() {
  try {
    const categories = await Category.findAll();
    return categories;
  } catch (error) {
    throw {
      message: error.message || "Ops something happened wrong",
      status: error.status || 500,
    };
  }
}

export async function createCategory({ name }) {
  try {
    const category = await Category.findOne({ where: { name: name } });
    if (category) {
      throw HttpError({
        status: "error",
        code: 400,
        message: "Category with same name has already exist ",
      });
    }
    const newCategory = await Category.create({ name });
    return newCategory;
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}

export async function deleteCategory({ id }) {
  try {
    const category = await Category.findByPk(id);
    if (!category) {
      throw HttpError({
        status: "error",
        code: 404,
        message: "Category not found",
      });
    }

    await category.destroy();
    return category;
  } catch (error) {
    throw {
      message: error.status.message || "Ops something happened wrong",
      status: error.status.code || 500,
    };
  }
}
