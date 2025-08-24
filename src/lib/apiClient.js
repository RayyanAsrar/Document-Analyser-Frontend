// src/lib/apiClient.js
import axios from "axios";

const URL = "";
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || URL,
  headers: { "Content-Type": "application/json" },
});

// Helper for readable error messages
export const getApiMessage = (err, fallback = "Something went wrong") =>
  err?.response?.data?.message || err?.message || fallback;


export default api