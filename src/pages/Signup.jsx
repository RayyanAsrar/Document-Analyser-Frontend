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
import { LoaderCircle } from "lucide-react";
import api, { getApiMessage } from "../lib/apiClient";
import GoogleAuth from "../components/GoogleAuth";

export default function SignUpPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    try {
      const finalUsername =
        username.trim() ||
        name.trim().replace(/\s+/g, "_").toLowerCase() ||
        email.split("@")[0];

      const user = {
        username: finalUsername,
        name,
        email,
        password,
      };

      const { data: res } = await api.post("/auth/register", user);

      const { message } = res;

      toast.success(message);
      navigate("/login");
    } catch (error) {
      const message = getApiMessage(error, "Signup failed");
      toast.error(message);
      console.error("Signup error:", message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-2xl shadow-lg border border-border bg-card/80 backdrop-blur-md">
        <CardHeader className="space-y-2 pb-0">
          <CardTitle className="text-2xl font-bold text-center tracking-tight">
            Create account
          </CardTitle>
          <CardDescription className="text-center text-base text-muted-foreground">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-5 pt-2 pb-3">
            <div className="space-y-2">
              <Label htmlFor="name" className="font-medium">
                Full Name
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="rounded-lg border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username" className="font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value.slice(0, 16))}
                required
                className="rounded-lg border-border focus:ring-2 focus:ring-primary/30"
              />
              <p className="text-xs text-muted-foreground">3-16 characters.</p>
            </div>
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
                placeholder="Create a password (6-16 characters)"
                value={password}
                onChange={(e) => setPassword(e.target.value.slice(0, 16))}
                required
                minLength={6}
                maxLength={16}
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
                "Create Account"
              )}
            </Button>
            <div className="w-full">
              <GoogleAuth />
            </div>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline font-medium"
              >
                Sign in
              </Link>
            </p>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
