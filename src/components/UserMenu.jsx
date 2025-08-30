import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Archive, ChevronsUpDown, LogOut, Settings } from "lucide-react";
import { Button } from "./ui/button";
import CustomAvatar from "./CustomAvatar";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const UserMenu = () => {
  const [open, setOpen] = useState(false);
  const { logout, user } = useAuth();
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  const Buttons = [
    {
      classNames:
        "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left  cursor-pointer ",
      onclickFunc: () => navigate("/archive"),
      title: "Archived",
      icon: Archive,
    },
    {
      classNames:
        "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left  cursor-pointer ",
      onclickFunc: () => navigate("/preferences"),
      title: "Preferences",
      icon: Settings,
    },
    {
      classNames:
        "w-full flex items-center gap-2 px-4 py-2 rounded-lg text-left text-red-600 cursor-pointer dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30",
      onclickFunc: handleLogout,
      title: "Logout",
      icon: LogOut,
    },
  ];

  const name = user?.name || user?.username;

  // 🔹 Close on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div ref={menuRef} className="relative w-full">
      <div
        onClick={() => setOpen((prev) => !prev)}
        className="flex items-center justify-between gap-3 cursor-pointer hover:bg-muted px-3 py-2 rounded-md transition"
      >
        <div className="flex items-center gap-3">
          <CustomAvatar size={32} />
          <div className="flex flex-col">
            <span className="text-sm font-semibold">{name || ""}</span>
            <span className="text-xs text-muted-foreground">{user?.email}</span>
          </div>
        </div>
        <div className="flex justify-between items-center gap-3">
          <div className="flex flex-col"></div>
          <ChevronsUpDown className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full left-0 mb-2 w-full bg-white dark:bg-zinc-900 border border-border rounded-md shadow-lg z-50"
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
