// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react";
import { api, setAuthCookies, getAuthCookies, clearAuthCookies } from "@/lib/apiClient";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const { user } = getAuthCookies();
    if (user) setUser(user);
  }, []);

  const login = async ({ email, password }) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data.data; // ✅ backend returns data.data.{token,user}
    setAuthCookies(token, user);
    setUser(user);
    return user;
  };

  const register = async ({ username, email, password, name }) => {
    const res = await api.post("/auth/register", { username, email, password, name });
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
