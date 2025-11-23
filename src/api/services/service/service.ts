// Reacts
import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";
import { ApiParams } from "@/utils/routes/routes";

// Interface
export interface Services {
  id?: number | undefined | null;
  category: number | undefined | null;
  code: string | undefined | null;
  description: string | undefined | null;
  details: string | undefined | null;
  discount?: number | undefined | null;
  is_ready: boolean | undefined | null;
  is_variants?: boolean | undefined | null;
  price: number | undefined | null;
  service_name: string | undefined | null;
}

// CODE
export const servicesService = {
  async getAll(params: ApiParams) {
    try {
      const response = await api.get("/services/paginated/", { params });

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/services/id/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: Services) {
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
      const response = await api.put(`/services/id/${id}`, data);

      notifySuccess("Services updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/services/id/${id}`);
      notifySuccess("Services deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
