import { useAuth } from "@/context/AuthContext";
import { LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import api from "../lib/apiClient";
import Cookie from "js-cookie";
import GoogleAuth from "../components/GoogleAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: res } = await api.post("/auth/login", { email, password });

      const { data, message } = res;

      const { token, user } = data;

      Cookie.set("token", token);
      login(user);

      toast.success(message);
      navigate("/upload");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err?.message || "Login failed";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-border bg-card/80 backdrop-blur-md">
        <CardHeader className="space-y-2 pb-0">
          <CardTitle className="text-2xl font-bold text-center tracking-tight">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center text-base text-muted-foreground">
            Sign in to your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-2 pb-3">
            <div className="space-y-2">
              <Label htmlFor="email" className="font-medium">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="rounded-lg border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="font-medium">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="rounded-lg border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pt-0">
            <Button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg font-semibold text-base"
            >
              {loading ? (
                <LoaderCircle className="w-5 h-5 animate-spin" />
              ) : (
                "Sign In"
              )}
            </Button>

            <div className="w-full">
              <GoogleAuth />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Don&apos;t have an account?{" "}
              <Link
                to="/signup"
                className="text-primary hover:underline font-medium"
              >
                Sign up
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
