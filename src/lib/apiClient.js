// src/lib/apiClient.js
import axios from "axios";
import Cookies from "js-cookie";

export const COOKIE_OPTIONS = {
  expires: 7,
  secure: import.meta.env.PROD,
  sameSite: "strict",
  path: "/",
};

export const setAuthCookies = (token, user) => {
  Cookies.set("token", token, COOKIE_OPTIONS);
  Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
};

export const getAuthCookies = () => {
  const token = Cookies.get("token");
  const userStr = Cookies.get("user");
  return { token, user: userStr ? JSON.parse(userStr) : null };
};

export const clearAuthCookies = () => {
  Cookies.remove("token", { path: "/" });
  Cookies.remove("user", { path: "/" });
};

export const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    "https://document-analyser-backend.vercel.app/api",
  headers: { "Content-Type": "application/json" },
});

// Attach token automatically
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Optional: auto-clear on 401
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error?.response?.status === 401) {
      clearAuthCookies();
    }
    return Promise.reject(error);
  }
);

// Helper for readable error messages
export const getApiMessage = (err, fallback = "Something went wrong") =>
  err?.response?.data?.message || err?.message || fallback;
