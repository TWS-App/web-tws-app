// Reacts
import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";
import { ApiParams } from "@/utils/routes/routes";

// Interface
export interface Products {
  id?: number | undefined | null;
  category: number | undefined | null;
  code: string | undefined | null;
  colors?: string[];
  description: string | undefined | null;
  details: string | undefined | null;
  discount?: number | undefined | null;
  is_colors: boolean | undefined | null;
  is_ready: boolean | undefined | null;
  is_variants: boolean | undefined | null;
  price: number | undefined | null;
  product_name: string | undefined | null;
  variants: string[];
  versions: string[];
}

// CODE
export const productServices = {
  async getAll(params: ApiParams) {
    try {
      const response = await api.get("/products/paginated/", { params });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/products/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getImage(img: number) {
    try {
      const response = await api.get(`/image/${img}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: Products) {
    try {
      const response = await api.post("/products", data);

      notifySuccess("Products created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/products/${id}`, data);

      notifySuccess("Products updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/products/${id}`);
      notifySuccess("Products deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
