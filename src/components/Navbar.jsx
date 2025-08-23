import {
  Upload,
  Settings,
  User as UserIcon,
  Moon,
  Sun,
  LogOut,
} from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "../context/ThemeProvider";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import CustomAvatar from "./CustomAvatar";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const { user, logout, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-top duration-500">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: App name/logo */}
        <div className="flex items-center justify-between h-[65px] md:h-[60px] max-w-7xl mx-auto w-full px-4 md:px-10">
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img
                className="hidden dark:block w-32"
                src="/OmniView AI-Dark.png"
                alt="OmniView AI"
              />
              <img
                className="dark:hidden block w-32"
                src="/OmniView AI-Light.png"
                alt="OmniView AI"
              />
            </Link>
          </div>
        </div>

        {/* Right side controls */}
        <div className="flex items-center space-x-2 animate-in slide-in-from-right duration-500">
          {/* Theme toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="hover:scale-110 transition-all duration-200 hover:bg-accent hover:shadow-md"
          >
            {theme === "dark" ? (
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-300" />
            ) : (
              <Moon className="h-4 w-4 rotate-0 scale-100 transition-all duration-300" />
            )}
          </Button>

          {user && isLoggedIn ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 transition-all duration-200 hover:bg-accent hover:shadow-md"
                  aria-label="Open profile menu"
                >
                  <CustomAvatar src={user?.profileImage} alt={user?.name} name={user?.name}  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="animate-in slide-in-from-top-2 duration-200"
              >
                <DropdownMenuItem className="hover:bg-accent transition-colors duration-150">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem className="hover:bg-accent transition-colors duration-150">
                  <UserIcon className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>

                {user && (
                  <DropdownMenuItem
                    onClick={handleLogout}
                    className="hover:bg-accent transition-colors duration-150 text-red-600"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <h1>Login</h1>
          )}
        </div>
      </div>
    </nav>
  );
}
