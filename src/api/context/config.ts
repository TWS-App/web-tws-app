import axios, { CreateAxiosDefaults } from "axios";
import { notifyError } from "@/utils/notification/notifications";
import React, { createContext } from "react";

const _api =  process.env.NEXT_PUBLIC_API_URL

export const API_CONFIG: CreateAxiosDefaults = {
  baseURL: _api || "http://localhost:5000/api",
  timeout: Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000,
};

console.log("Alamat: ", _api)

interface ApiContextType {
  api: ReturnType<typeof axios.create>;
}

const retryDelay = Number(process.env.NEXT_PUBLIC_API_RETRY_DELAY) || 1500;
// interface FetchOptions extends RequestInit {
//   retries?: number;
// }

const ApiContext = createContext<ApiContextType | undefined>(undefined);

// CODE
const config = axios.create(API_CONFIG);

let isRefreshing = false;
let subscribers: any[] = [];

const subscribeTokenRefresh = (callback: any) => {
  subscribers.push(callback);
};

const onRefreshed = (newToken: any) => {
  subscribers.forEach((callback) => callback(newToken));
  subscribers = [];
};

// Interceptors
config.interceptors.request.use((request) => {
  request.timeout = Number(process.env.NEXT_PUBLIC_API_TIMEOUT) || 30000;

  //   const token = localStorage.getItem("access-token");
  const token =
    typeof window !== "undefined" ? localStorage.getItem("access-token") : null;

  if (token) {
    request.headers["Authorization"] = `Bearer ${token}`;
  }
  (request as any).metadata = { startTime: new Date() };

  return request;
});

config.interceptors.response.use(
  async (response) => {
    const startTime = (response.config as any).metadata.startTime;
    const endTime = new Date();
    const duration = endTime.getTime() - startTime.getTime();

    return response;
  },

  async function (error) {
    const originalRequest = error.config;

    if (error.code === "ERR_CANCELED") {
      setTimeout(() => {
        return config(error.config);
      }, retryDelay);
    }

    if (error?.response?.status === 400) {
      const datas = error?.response?.data;
      let message = "";

      console.log(datas);

      Object.keys(datas).forEach((key) => {
        if (!datas?.error) {
          message += `${key} ${datas[key].join(", ")} `;
        } else {
          message = datas?.error;
        }
      });

      notifyError("Error", message);
    }

    const isLoginRequest =
      originalRequest.url?.includes("authLogin") ||
      originalRequest.url?.includes("login") ||
      originalRequest.url?.includes("auth/login");

    // UNAUTHORIZED
    if (error?.response?.status === 401) {
      notifyError("Error", error);
    }

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry &&
      !isLoginRequest
    ) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken: any) => {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            resolve(config(originalRequest));
          });
        });
      }

      if (
        error.response.data?.detail ===
        "No active account found with the given credentials"
      ) {
        return Promise.reject(error);
      } else {
        isRefreshing = true;
        originalRequest._retry = true;
        try {
          const refreshToken = localStorage.getItem("refresh-token");

          const response = await axios.post(`${API_CONFIG.baseURL}/refresh/`, {
            refresh: refreshToken,
          });

          const newToken = response.data.access;
          localStorage.setItem("access-token", newToken);
          //   localStorage.removeItem("refresh-token");

          originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

          onRefreshed(newToken);
          isRefreshing = false;
          return config(originalRequest);
        } catch (refreshError) {
          isRefreshing = false;
          if (typeof window !== "undefined") {
            window.location.href = "/login";
            localStorage.removeItem("access-token");
            localStorage.removeItem("refresh-token");
          }

          return Promise.reject(refreshError);
        } finally {
          subscribers = [];
        }
      }
    }

    // UNAUTHORIZED
    if (error?.response?.status === 403) {
      notifyError("Error", error);
    }

    if (error?.response?.status === 404) {
      const datas = error?.response.data;
      notifyError("Error", datas);
    }

    if (error.response?.status >= 500) {
      notifyError("Server Error", "Internal server error");
    }

    if (!error.response) {
      // Retry mekanisme untuk masalah jaringan selain timeout
      const shouldRetry = error.config?.retry || 0;
      if (shouldRetry < 3) {
        error.config.retry = shouldRetry + 1;

        return new Promise((resolve) => {
          setTimeout(() => resolve(config(error.config)), 5000);
        });
      }
    }

    return Promise.reject(error);
  }
);

// instance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default config;
