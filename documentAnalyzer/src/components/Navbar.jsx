import { Upload, Settings, User as UserIcon, Moon, Sun } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { useTheme } from "../context/ThemeProvider";

export function Navbar() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };


  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 animate-in slide-in-from-top duration-500">
      <div className="flex h-16 items-center justify-between px-6">
        {/* Left: App name/logo */}
        <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-500">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-200">
            <span className="text-primary-foreground font-bold text-sm">DA</span>
          </div>
          <span className="font-semibold text-lg">Document Analyzer</span>
        </div>

   
        <div className="flex items-center space-x-2 animate-in slide-in-from-right duration-500">
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

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="hover:scale-110 transition-all duration-200 hover:bg-accent hover:shadow-md"
                aria-label="Open profile menu"
              >
                <UserIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="animate-in slide-in-from-top-2 duration-200">
              <DropdownMenuItem className="hover:bg-accent transition-colors duration-150">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="hover:bg-accent transition-colors duration-150">
                <UserIcon className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}
