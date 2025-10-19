import api from "../../context/config";
import { notifySuccess } from "@/utils/notification/notifications";

export interface PaymentMaster {
  id?: number;
  payment_name: string | undefined | null;
  payment_number: string | undefined | null;
  description?: string | undefined | null;
}

export const masterPaymentServices = {
  async getAll() {
    try {
      const response = await api.get("/master/payment-list");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/master/payment-list/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/master/payment-list", data);

      notifySuccess("Master Payment created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/master/payment-list/${id}`, data);

      notifySuccess("Master Payment updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/master/payment-list/${id}`);
      notifySuccess("Master Payment deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
