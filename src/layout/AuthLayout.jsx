import React from "react";
import { Outlet, Link } from "react-router-dom";
import { useTheme } from "../context/ThemeProvider";
import { Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";

const AuthLayout = () => {
  const { setTheme, theme } = useTheme();
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center">
          <Link to="/" className="mb-2">
            <img
              className="hidden dark:block w-36 drop-shadow-lg"
              src="/OmniView AI-Dark.png"
              alt="OmniView AI"
            />
            <img
              className="dark:hidden block w-36 drop-shadow-lg"
              src="/OmniView AI-Light.png"
              alt="OmniView AI"
            />
          </Link>
        </div>
        <div className="absolute top-6 right-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="border border-border shadow-sm"
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </Button>
        </div>
        <div className="mt-2">
          <Outlet />
        </div>
      </div>
      <footer className="mt-8 text-xs text-muted-foreground text-center opacity-80">
        &copy; {new Date().getFullYear()} OmniView AI. All rights reserved.
      </footer>
    </div>
  );
};

export default AuthLayout;
