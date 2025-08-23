import { FilesIcon, LogOut, PenBoxIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import { Skeleton } from "../components/ui/skeleton";
import AppSidebar from "../components/AppSidebar";
import {
  SidebarContent,
  SidebarFooter,
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
import UserMenu from "../components/UserMenu";
import { Separator } from "../components/ui/separator";
import { useAuth } from "../context/AuthContext";
import api from "../lib/apiClient";
import Cookie from "js-cookie";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();
  const [chats, setChats] = useState([]);
  const [loadingChats, setLoadingChats] = useState(true);
  const token = Cookie.get("token");

  useEffect(() => {
    const fetchChats = async () => {
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
    };
    fetchChats();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  return (
    <SidebarProvider open={open} onOpenChange={setOpen}>
      <AppSidebar>
        <SidebarContent>
          <SidebarHeader className="sticky top-0 z-30 bg-background pb-2">
            {/* <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-500">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">
                  DA
                </span>
              </div>
              <span className="font-semibold text-lg truncate">
                Document Analyzer
              </span>
            </div> */}

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
                      <NavLink
                        key={chat._id}
                        to={`/chat/${chat._id}`}
                        className={({ isActive }) =>
                          `rounded-lg py-2 px-2 truncate transition-colors ${
                            isActive
                              ? "bg-muted font-medium"
                              : "hover:bg-muted/50"
                          }`
                        }
                      >
                        <SidebarMenuSubButton className="w-full bg-none text-left truncate">
                          {chat?.file?.name?.slice(0, 30) || "Untitled Chat"}
                        </SidebarMenuSubButton>
                      </NavLink>
                    ))
                  )}
                </div>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter className="sticky bottom-0 z-20 p-4">
          <Separator />
          <SidebarMenuButton
            tooltip="Logout"
            onClick={handleLogout}
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-destructive/60 text-red-600"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </AppSidebar>

      <SidebarInset>
        <div className="flex justify-between items-center p-3 border-b border-border/50">
          <SidebarTrigger
            aria-label="Toggle sidebar"
            onClick={() => setOpen(!open)}
          />
          <UserMenu />
        </div>
        <div className="flex flex-1 max-h-[calc(100vh-5rem)] flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
