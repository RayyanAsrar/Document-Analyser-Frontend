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
          return;
        }

        const { data } = await api.get("/user/current", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Current user data:", data);
        login(data.data);
      } catch (error) {
        console.error("Error fetching current user:", error);
        if (error.response?.status === 401) logout();
      } finally {
        setLoading(false);
      }
    };

    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // only run once on mount

  return loading ? <Loader /> : <AppRouter />;
}

export default App;
