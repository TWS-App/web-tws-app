import api from "../../context/config";
import { notifySuccess } from "@/utils/notification/notifications";

export interface ShipmentMaster {
  id?: number;
  shipment_name: string | undefined | null;
  description?: string | undefined | null;
}

export const masterShipmentServices = {
  async getAll() {
    try {
      const response = await api.get("/master/shipment-list");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/master/shipment-list/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: any) {
    try {
      const response = await api.post("/master/shipment-list", data);

      notifySuccess("Master Shipment created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: any, data: any) {
    try {
      const response = await api.put(`/master/shipment-list/${id}`, data);

      notifySuccess("Master Shipment updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/master/payment-list/${id}`);
      notifySuccess("Master Shipment deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
