import { AxiosError, AxiosResponse } from "axios";
import { notifySuccess, notifyError } from "@/utils/notification/notifications";

export const responseInterceptor = (response: AxiosResponse) => {
  // ✅ Jika kamu ingin notifikasi global untuk POST/PUT/DELETE:
  if (["post", "put", "delete"].includes(response.config.method || "")) {
    notifySuccess("Success", "Operation completed successfully");
  }

  return response;
};

export const errorInterceptor = (error: AxiosError) => {
  const message =
    (error.response?.data as any)?.message ||
    error.message ||
    "An unexpected error occurred.";

  notifyError("Error", message);

  return Promise.reject(error);
};
