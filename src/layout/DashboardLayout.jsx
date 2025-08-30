import Cookie from "js-cookie";
import { Archive, FilesIcon, Moon, PenBoxIcon, Sun, Trash } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import AppSidebar from "../components/AppSidebar";
import { Button } from "../components/ui/button";
import { Separator } from "../components/ui/separator";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuSubButton,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Skeleton } from "../components/ui/skeleton";
import { useChats } from "../context/ChatContext";
import { useTheme } from "../context/ThemeProvider";
import api from "../lib/apiClient";
import { toast } from "sonner";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const [loadingChats, setLoadingChats] = useState(true);
  const token = Cookie.get("token");
  const { setChats, chats } = useChats();
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const fetchChats = useCallback(async () => {
    try {
      setLoadingChats(true);
      const { data } = await api.get("/chat", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setChats(data.data || []);
    } catch (error) {
      console.error("Error fetching chats:", error);
    } finally {
      setLoadingChats(false);
    }
  }, [token, setChats]);

  const handleDelete = async (chatId, isDeleted) => {
    try {
      await api.put(
        `/chat/${chatId}`,
        {
          isDeleted: !isDeleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setChats((prevChats) => prevChats.filter((chat) => chat._id !== chatId));
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Error deleting chat");
    }
  };
  const handleArchive = async (chatId, isArchived) => {
    try {
      await api.put(
        `/chat/archive/${chatId}`,
        {
          isArchived: !isArchived,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchChats(); 
      toast.success("Chat archived successfully");
    } catch (error) {
      console.error("Error archiving chat:", error);
      toast.error("Error archiving chat");
    }
  };

  useEffect(() => {
    fetchChats();
  }, [fetchChats]);

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar>
        <SidebarContent>
          <SidebarHeader className="sticky top-0 z-30 bg-background pb-2">
            <div className="flex justify-center items-center">
              <Link to="/">
                <img
                  className="hidden dark:block w-40 text-center"
                  src="/OmniView AI-Dark.png"
                />
                <img
                  className="dark:hidden block w-40 text-center"
                  src="/OmniView AI-Light.png"
                />
              </Link>
            </div>
          </SidebarHeader>
          <Separator />

          <SidebarGroup>
            <SidebarGroupContent className="flex flex-col gap-2">
              <Link to="/upload">
                <SidebarMenuButton
                  tooltip="Start a new chat"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/80 transition-colors"
                >
                  <PenBoxIcon className="w-4 h-4" /> New Chat
                </SidebarMenuButton>
              </Link>

              <Link to="/collection">
                <SidebarMenuButton
                  tooltip="Collection of Uploaded Files"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-semibold hover:bg-muted transition-colors"
                >
                  <FilesIcon className="w-4 h-4" /> Collection
                </SidebarMenuButton>
              </Link>
            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel className="text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Chats
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu className="overflow-y-auto mobile-scrollbar">
                <div className="flex flex-col gap-1">
                  {loadingChats ? (
                    // Skeleton UI while loading
                    <>
                      {[...Array(5)].map((_, i) => (
                        <div key={i} className="px-2 py-2">
                          <Skeleton className="h-5 w-full rounded-md" />
                        </div>
                      ))}
                    </>
                  ) : chats.length === 0 ? (
                    <span className="text-sm text-muted-foreground px-2">
                      No chats yet
                    </span>
                  ) : (
                    chats.map((chat) => (
                      <div
                        key={chat._id}
                        className="flex items-center justify-between rounded-lg px-2 py-2 hover:bg-muted/50 transition-colors group/chat"
                      >
                        {/* Chat NavLink */}
                        <NavLink
                          to={`/chat/${chat._id}`}
                          className={({ isActive }) =>
                            `flex-1 truncate rounded-md px-2 py-1 ${
                              isActive ? "bg-muted font-medium" : ""
                            }`
                          }
                        >
                          {chat?.file?.name?.slice(0, 30) || "Untitled Chat"}
                        </NavLink>

                        {/* Dropdown Actions */}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              className="opacity-0 group-hover/chat:opacity-100 transition-opacity p-1 rounded-md hover:bg-muted"
                              aria-label="Chat actions"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-32">
                            <DropdownMenuItem
                              className="cursor-pointer"
                              onClick={() =>
                                handleArchive(chat._id, chat.isArchived)
                              }
                            >
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600 cursor-pointer"
                              onClick={() =>
                                handleDelete(chat._id, chat.isDeleted)
                              }
                            >
                              <Trash className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))
                  )}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </AppSidebar>

      <SidebarInset>
        <div className="flex justify-between items-center p-3 border-b border-border/50">
          <SidebarTrigger
            aria-label="Toggle sidebar"
            onClick={() => setOpen(!open)}
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className=""
          >
            {theme === "dark" ? (
              <Sun className="h-5 w-5 text-yellow-400" />
            ) : (
              <Moon className="h-5 w-5 text-blue-600" />
            )}
          </Button>
        </div>
        <div className="flex flex-1 max-h-[calc(100vh-5rem)] flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
