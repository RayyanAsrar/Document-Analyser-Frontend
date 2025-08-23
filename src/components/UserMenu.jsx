import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown, LogOut, Settings, Sun, Moon } from "lucide-react";
import { Button } from "./ui/button";
import CustomAvatar from "./CustomAvatar";
import Cookie from "js-cookie";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeProvider";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const { theme, setTheme } = useTheme();

  const handleLogout = () => {
    logout();
  };
  const Buttons = [
    {
      classNames:
        "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left hover:bg-muted cursor-pointer",
      onclickFunc: () => {
        setTheme(theme === "dark" ? "light" : "dark");
        setOpen(false);
      },
      title: theme === "dark" ? "Light Mode" : "Dark Mode",
      icon: theme === "dark" ? Sun : Moon,
    },
    // {
    //   classNames:
    //     "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left hover:bg-muted cursor-pointer",
    //   onclickFunc: () => {
    //     navigate("/upload");
    //     setOpen(false);
    //   },
    //   title: "Settings",
    //   icon: Settings,
    // },
    {
      classNames:
        "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-red-600 cursor-pointer dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30",
      onclickFunc: handleLogout,
      title: "Logout",
      icon: LogOut,
    },
  ];

  const name = user?.name || user?.username;

  return (
    <div className="relative w-max">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-md transition"
      >
        <CustomAvatar src={user?.profileImage || ""} name={name || ""} />
        <div className="flex flex-col">
          <span className="text-sm font-semibold">{name || ""}</span>
          <span className="text-xs text-muted-foreground">{user?.email}</span>
        </div>
        <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-48 bg-white dark:bg-zinc-900 border border-border rounded-md shadow-lg z-50"
          >
            <div className="p-2 space-y-1 text-sm">
              {Buttons.map((button, index) => {
                const IconComponent = button.icon;
                return (
                  <Button
                    key={index}
                    variant="ghost"
                    className={button.classNames}
                    onClick={button.onclickFunc}
                  >
                    <IconComponent className="w-4 h-4" />
                    {button.title}
                  </Button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;
