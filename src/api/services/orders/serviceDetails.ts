// Reacts
import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";
import { ApiParams } from "@/utils/routes/routes";

// Interface
export interface OrderDetails {
  id?: number | undefined | null;
  product_id?: number | undefined | null;
  service_id?: number | undefined | null;
  header_id: number | undefined | null;
  colors: string | undefined | null;
  discount: number | undefined | null;
  price: number | undefined | null;
  qty: number | undefined | null;
  total: number | undefined | null;
  variants?: string | undefined | null;

  // "colors": "White",
  // "discount": 0,
  // "header_id": 2,
  // "price": 299000,
  // "product_id": 1,
  // "qty": 1,
  // "total": 1,
  // "variants": "White"
}

// CODE
export const orderDetailsService = {
  async getAll() {
    try {
      const response = await api.get("/transaction/details");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/transaction/details/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: OrderDetails) {
    try {
      const response = await api.post("/transaction/details", data);

      notifySuccess("Detail's Order created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/transaction/details/${id}`, data);

      notifySuccess("Detail's Order updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/transaction/details/${id}`);
      notifySuccess("Detail's Order deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
