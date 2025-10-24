// REACTS
import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";
import { ApiParams } from "@/utils/routes/routes";

// Interface
export interface Images {
  id?: number | undefined | null;
  file_name: string | undefined | null;
  file_path: string | undefined | null;
  mime_type: string | undefined | null;
  product_id: number | undefined | null;
  uploaded_at: string | undefined | null;
  url: string | undefined | null;
}

// CODE
export const imageServices = {
  async getAll() {
    try {
      const response = await api.get("/image");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/image/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async upload(file: File, product_id: number) {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("product_id", String(product_id));

      const response = await api.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      notifySuccess("Image uploaded successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async uploadService(file: File, product_id: number) {
    try {
      const formData = new FormData();

      formData.append("file", file);
      formData.append("service_id", String(product_id));

      const response = await api.post("/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      });

      notifySuccess("Image uploaded successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/image/${id}`, data);

      notifySuccess("Images updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/image/${id}`);
      notifySuccess("Images deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
