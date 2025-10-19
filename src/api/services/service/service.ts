import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";

export const servicesService = {
  async getAll() {
    try {
      const response = await api.get("/services");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/services/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/services", data);

      notifySuccess("Services created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/services/${id}`, data);

      notifySuccess("Services updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/services/${id}`);
      notifySuccess("Services deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
