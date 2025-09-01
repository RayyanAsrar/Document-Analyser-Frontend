import { useGoogleLogin } from "@react-oauth/google";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuth } from "../context/AuthContext";
import api from "../lib/apiClient";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";

const GoogleAuth = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false)

  const googleResponse = async (authResponse) => {
    setLoading(true);
    const code = authResponse.code;
    try {
      const { data: response } = await api.post("/auth/google", {
        code,
      });

      const message = response.message || "Google login successful";
      const { token, user } = response.data;

      Cookie.set("token", token);
      login(user);
      toast.success(message, {
        className: "bg-success text-popover-foreground border border-border",
      });
      navigate("/upload");
    } catch (error) {
      const message =
        error?.response?.data.message ||
        "Failed to login with Google. Please try again.";
      toast.error(message, {
        className:
          "bg-destructive text-popover-foreground border border-border",
      });
    } finally {
      setLoading(false);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: googleResponse,
    onError: googleResponse,
    flow: "auth-code",
  });

  return (
    <section className="w-full space-y-4">
      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
        <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:border-t after:border-border after:z-0">
          <span className="relative z-10 px-2 text-muted-foreground bg-background">
            Or continue with
          </span>
        </div>
      </motion.div>

      <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}>
        <Button
          onClick={googleLogin}
          type="button"
          variant="outline"
          className="w-full"
          disabled={loading}
        >
          {loading ? (
            <LoaderCircle className="animate-spin w-5 h-5" />
          ) : (
            <img src="/google.svg" alt="Google Icon" className="h-5 w-5 mr-2" />
          )}
          Continue with Google
        </Button>
      </motion.div>
    </section>
  );
};

export default GoogleAuth;
