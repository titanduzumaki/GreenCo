import axios from "axios";

const BASE_URL = import.meta.env.DEV
  ? "http://localhost:3001/api"
  : import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
