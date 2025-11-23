import api from "../../context/config";
import { notifyError, notifySuccess } from "@/utils/notification/notifications";

export interface OrderStatus {
  id?: number;
  status_name: string | undefined | null;
  description?: string | undefined | null;
}

export const orderStatusServices = {
  async getAll() {
    try {
      const response = await api.get("/master/order-status");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/master/order-status/id/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/master/order-status", data);

      notifySuccess("Order Status created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/master/order-status/id/${id}`, data);

      notifySuccess("Order Status updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/master/order-status/id/${id}`);
      notifySuccess("Order Status deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
