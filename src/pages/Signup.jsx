import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { toast } from "sonner";
import { Toaster } from "../components/ui/sonner"; 


export default function SignUpPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      // backend expects: { username, email, password, name }
      const username =
        name.trim().replace(/\s+/g, "_").toLowerCase() || email.split("@")[0];

      await register({ username, email, password, name });

      toast.success("✅ Signup successful! Redirecting to login...");
      navigate("/login");
    } catch (err) {
      const errorMsg =
        err?.response?.data?.message || err?.message || "Signup failed";
      toast.error(`❌ ${errorMsg}`);
      console.error("Signup error:", errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-in fade-in duration-700">
      <Card className="w-full max-w-md animate-in slide-in-from-bottom duration-500 delay-200 ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create account</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create your account
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02]"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="transition-all duration-200 focus:scale-[1.02] mb-4"
                required
              />
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={loading}
              className="w-full hover:scale-105 transition-all duration-200 hover:shadow-lg"
            >
              {loading ? "Creating..." : "Create Account"}
            </Button>
            <p className="text-sm text-muted-foreground text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-primary hover:underline transition-all duration-200 hover:scale-105 inline-block"
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
