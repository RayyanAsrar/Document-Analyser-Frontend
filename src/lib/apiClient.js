import axios from "axios";
import Cookies from "js-cookie";

const COOKIE_OPTIONS = {
  expires: 7,
  secure: import.meta.env.MODE === "production",
  sameSite: "strict",
  path: "/",
};

export const setAuthCookies = (token, user) => {
  Cookies.set("token", token, COOKIE_OPTIONS);
  Cookies.set("user", JSON.stringify(user), COOKIE_OPTIONS);
};

export const getAuthCookies = () => {
  const token = Cookies.get("token");
  const user = Cookies.get("user");
  return {
    token,
    user: user ? JSON.parse(user) : null,
  };
};

export const clearAuthCookies = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

export const api = axios.create({
  baseURL: "https://document-analyser-backend.vercel.app/api", // <-- change later if deployed elsewhere
  headers: { "Content-Type": "application/json" },
});

// Add token to every request
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
