import api from "../../context/config";
import { notifyError, notifySuccess } from "@/utils/notification/notifications";

export const categoryProductServices = {
  async getAll() {
    try {
      const response = await api.get("/category/product-list");

      return response.data;
    } catch (error: any) {
      notifyError(
        "Failed to load categories",
        error?.message || "Unknown error"
      );
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/category/product-list/${id}`);

      return response.data;
    } catch (error: any) {
      notifyError("Error fetching category", error?.message);
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/category/product-list", data);

      notifySuccess("Category created successfully");
      return response.data;
    } catch (error: any) {
      notifyError("Error creating category", error.message);
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/category/product-list/${id}`, data);

      notifySuccess("Category updated successfully");
      return response.data;
    } catch (error: any) {
      notifyError("Error updating category", error.message);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/category/product-list/${id}`);
      notifySuccess("Category deleted successfully");
    } catch (error: any) {
      notifyError("Error deleting category", error.message);
      throw error;
    }
  },
};

export interface Category {
  id?: number;
  name: string;
  description?: string;
}

// ✅ Get all categories
export const getCategories = async () => {
  try {
    const response = await api.get("/category/product-list/");
    return response.data;
  } catch (error: any) {
    notifyError("Failed to load categories", error.message || "Unknown error");
    throw error;
  }
};

// ✅ Get category by ID
export const getCategoryById = async (id: number) => {
  try {
    const response = await api.get(`/category/product-list/${id}/`);
    return response.data;
  } catch (error: any) {
    notifyError("Error fetching category", error.message);
    throw error;
  }
};

// ✅ Create new category
export const createCategory = async (data: Category) => {
  try {
    const response = await api.post("/category/product-list/", data);
    notifySuccess("Category created successfully");
    return response.data;
  } catch (error: any) {
    notifyError("Error creating category", error.message);
    throw error;
  }
};

// ✅ Update category
export const updateCategory = async (id: number, data: Category) => {
  try {
    const response = await api.put(`/category/product-list/${id}/`, data);
    notifySuccess("Category updated successfully");
    return response.data;
  } catch (error: any) {
    notifyError("Error updating category", error.message);
    throw error;
  }
};

// ✅ Delete category
export const deleteCategory = async (id: number) => {
  try {
    await api.delete(`/category/product-list/${id}/`);
    notifySuccess("Category deleted successfully");
  } catch (error: any) {
    notifyError("Error deleting category", error.message);
    throw error;
  }
};
