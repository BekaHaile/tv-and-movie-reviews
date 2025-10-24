import axios from "axios";

const baseURL = process.env.VITE_API_BASE_URL;

export const apiClient = axios.create({
  baseURL: baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
