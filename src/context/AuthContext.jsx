// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import {
  api,
  setAuthCookies,
  getAuthCookies,
  clearAuthCookies,
} from "@/lib/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getCurrentUser = async () => {
      const token = getAuthCookies();
      try {
        if (!token) {
          logout();
          clearAuthCookies();
          return;
        }

        const { data } = await api.get("/user/current");
        setUser(data.data);
      } catch (error) {
        console.error("Error fetching current user:", error, loading);
        if (error.response?.status === 401) {
          logout();
          clearAuthCookies();
        }
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [loading]);

  const login = async ({ email, password }) => {
    const { data } = await api.post("/auth/login", { email, password });
    const { token, user } = data.data; // ✅ backend returns data.data.{token,user}
    setAuthCookies(token);
    setUser(user);
    return user;
  };

  const register = async ({ username, email, password, name }) => {
    const res = await api.post("/auth/register", {
      username,
      email,
      password,
      name,
    });
    // returns { success, message, data: { user } }
    return res.data;
  };

  const logout = () => {
    clearAuthCookies();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
