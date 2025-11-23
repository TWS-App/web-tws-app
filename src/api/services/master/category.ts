import api from "../../context/config";
import { notifyError, notifySuccess } from "@/utils/notification/notifications";

export interface Category {
  id?: number;
  category_name: string | undefined | null;
  code: string | undefined | null;
  description?: string | undefined | null;
}

export interface CategoryService {
  id?: number;
  category_name: string | undefined | null;
  code: string | undefined | null;
  description?: string | undefined | null;
}

export const categoryProductServices = {
  async getAll() {
    try {
      const response = await api.get("/category/product-list");

      return response.data;
    } catch (error: any) {
      // notifyError(
      //   "Failed to load Data!",
      //   error?.message || "Unknown error"
      // );
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/category/product-list/id/${id}`);

      return response.data;
    } catch (error: any) {
      // notifyError("Failed to GET Data!", error?.message);
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/category/product-list", data);

      notifySuccess("Category created successfully!");
      return response.data;
    } catch (error: any) {
      // notifyError("Error creating category", error.message);
      throw error;
    }
  },

  async update(id: any, data: any) {
    try {
      const response = await api.put(`/category/product-list/id/${id}`, data);

      notifySuccess("Category updated successfully!");
      return response.data;
    } catch (error: any) {
      // notifyError("Error updating category", error.message);
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/category/product-list/id/${id}`);
      notifySuccess("Category deleted successfully!");
    } catch (error: any) {
      // notifyError("Error deleting category", error.message);
      throw error;
    }
  },
};

export const categoryServiceServices = {
  async getAll() {
    try {
      const response = await api.get("/category/service-list");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/category/service-list/id/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/category/service-list", data);

      notifySuccess("Category created successfully!");
      return response.data;
    } catch (error: any) {
      // notifyError("Error creating category", error.message);
      throw error;
    }
  },

  async update(id: any, data: any) {
    try {
      const response = await api.put(`/category/service-list/id/${id}`, data);

      notifySuccess("Category updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/category/service-list/id/${id}`);
      notifySuccess("Category deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
