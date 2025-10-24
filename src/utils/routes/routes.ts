export interface ApiParams {
  page?: number;
  page_size?: number;
  search?: string;
  [key: string]: any;
}

export const buildURL = (params: Record<string, any>) =>
  Object.entries(params)
    .filter(([_, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
    .join("&");

// Contoh:
const query = buildURL({ page: 2, page_size: 10, search: "ear" });
// -> "page=2&page_size=10&search=ear"
