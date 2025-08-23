import { useEffect } from "react";
import AppRouter from "./routes/AppRouter.jsx";
import Cookie from "js-cookie";
import { useAuth } from "./context/AuthContext.jsx";
import api from "./lib/apiClient.js";
import Loader from "./components/Laoder.jsx";

function App() {
  const { logout, login, loading, setLoading } = useAuth();
  useEffect(() => {
    const getCurrentUser = async () => {
      const token = Cookie.get("token");
      try {
        if (!token) {
          logout();
          Cookie.remove("token");
          return;
        }

        const { data } = await api.get("/user/current", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        login(data.data);
      } catch (error) {
        console.error("Error fetching current user:", error, loading);
        if (error.response?.status === 401) {
          logout();
          Cookie.remove("token");
        }
      } finally {
        setLoading(false);
      }
    };
    getCurrentUser();
  }, [loading, login, logout, setLoading]);

  return loading ? <Loader /> : <AppRouter />;
}

export default App;
