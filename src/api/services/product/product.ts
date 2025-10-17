import api from "../../context/config";

export const productService = {
  async getAll() {
    const res = await api.get("/products");
    return res.data;
  },

  async getById(id: number) {
    const res = await api.get(`/products/${id}`);
    return res.data;
  },
};
