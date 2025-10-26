import { addToast } from "@heroui/toast";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export type CustomRequestConfig = AxiosRequestConfig & {
  ignoreResponseError?: boolean | ((response: AxiosResponse) => boolean);
  _retry?: boolean; // Flag to prevent infinite retry loops
};

export const apiClient = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
  // Default config for all requests, can be overridden per request
  // whenever toast suppression is needed
  ignoreResponseError: false,
} as CustomRequestConfig);

apiClient.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error),
);

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error;

    // Show error toast (except for ignored errors)
    if (
      !originalRequest.config.ignoreResponseError ||
      (typeof originalRequest.config.ignoreResponseError === "function" &&
        !originalRequest.config.ignoreResponseError(error.response))
    ) {
      const statusMessage =
        statusCodes[error.response?.status as keyof typeof statusCodes];

      addToast({
        title: statusMessage,
        description: "An error occurred. Please try again later.",
        color: "danger",
      });
    }

    return Promise.reject(error);
  },
);

const statusCodes = {
  401: "Unauthorized",
  403: "Forbidden",
  404: "Not Found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
  502: "Bad Gateway",
  503: "Service Unavailable",
  504: "Gateway Timeout",
};
