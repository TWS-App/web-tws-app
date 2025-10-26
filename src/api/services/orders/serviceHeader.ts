// Reacts
import { notifySuccess } from "@/utils/notification/notifications";
import api from "../../context/config";
import { ApiParams } from "@/utils/routes/routes";
import { OrderDetails, orderDetailsService } from "./serviceDetails";

// Interface
export interface OrderHeader {
  id?: number | undefined | null;
  order_date?: string | undefined | null;
  order_number?: string | undefined | null;
  payment_date?: string | undefined | null;
  status_order?: string | undefined | null;
  shipment?: number | undefined | null;
  address: string | undefined | null;
  customer_name: string | undefined | null;
  email: string | undefined | null;
  payment_status: number | undefined | null;
  payment_type: number | undefined | null;
  phone_number: string | undefined | null;
  total_harga: number | undefined | null;
  total_order: number | undefined | null;
  //   address: "Bayongbong";
  //   customer_name: "Ujang";
  //   email: "ujang@gmail.com";
  //   payment_status: 0;
  //   payment_type: 1;
  //   phone_number: "62815638244";
  //   total_harga: 299000;
  //   total_order: 1;
}

// CODE
export const orderHeaderService = {
  async getAll() {
    try {
      const response = await api.get("/transaction/header");

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async getById(id: number) {
    try {
      const response = await api.get(`/transaction/header/${id}`);

      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async create(data: OrderHeader) {
    try {
      const response = await api.post("/transaction/header", data);

      notifySuccess("Order created successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async update(id: number, data: any) {
    try {
      const response = await api.put(`/transaction/header/${id}`, data);

      notifySuccess("Order updated successfully!");
      return response.data;
    } catch (error: any) {
      throw error;
    }
  },

  async delete(id: number) {
    try {
      await api.delete(`/transaction/header/${id}`);
      notifySuccess("Order deleted successfully!");
    } catch (error: any) {
      throw error;
    }
  },
};
