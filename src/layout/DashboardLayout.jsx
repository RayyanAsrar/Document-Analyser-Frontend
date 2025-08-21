import { Link, Outlet } from "react-router";
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
import {api} from "../lib/apiClient"

import React, { useEffect, useState } from "react";
import { FilesIcon, LogOut, PenBoxIcon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { toast } from "sonner";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);
  const { logout } = useAuth();
  const [chats, setChats] = useState([]);


  useEffect(() => {
    const fetchChats = async () => {
      try {
        // Fetch chats from the API
        const {data} = await api.get("/chat")
        console.log("Fetched chats:", data);
        setChats(data.data)
      } catch (error) {
        toast.error("Failed to fetch chats");
        console.log(error)
      }
    }

    fetchChats()
  }, [])



  return (
    <SidebarProvider open={open} onOpenChange={setOpen} className="" style={{}}>
      <AppSidebar>
        <SidebarContent className="">
          <SidebarHeader className={""}>
            <div className="flex items-center space-x-2 animate-in slide-in-from-left duration-500">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center hover:scale-110 transition-transform duration-200">
                <span className="text-primary-foreground font-bold text-sm">
                  DA
                </span>
              </div>
              <span className="font-semibold text-lg">Document Analyzer</span>
            </div>
          </SidebarHeader>

          <SidebarGroup className={""}>
            <SidebarGroupContent className={" flex flex-col gap-2"}>
              <Link to={"/upload"}>
                <SidebarMenuButton
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer bg-primary text-primary-foreground font-semibold shadow hover:bg-primary/70 hover:text-gray-900 transition-colors"
                  tooltip="Start a new chat"
                >
                  <PenBoxIcon /> New Chat
                </SidebarMenuButton>
              </Link>
              <Link to={"/upload"}>
                <SidebarMenuButton
                  className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg cursor-pointer font-semibold transition-colors"
                  tooltip="Collection for the Uploaded Files"
                >
                  <FilesIcon /> Collection
                </SidebarMenuButton>
              </Link>

            </SidebarGroupContent>
          </SidebarGroup>

          <SidebarGroup className={""}>
            <SidebarGroupLabel className="mb-2 text-sm font-semibold tracking-wide uppercase text-muted-foreground">
              Chats
            </SidebarGroupLabel>
            <SidebarGroupContent className={""}>
              <SidebarMenu className="max-h-[calc(100vh-20rem)] overflow-y-auto mobile-scrollbar pr-1">

                {chats.map((chat) => (
                  <Link key={chat._id} to={`/chat/${chat._id}`}>
                    <SidebarMenuSubButton className="w-full text-left">
                      {chat?.file.summary.slice(0,14) || "no Name provided"}
                    </SidebarMenuSubButton>
                  </Link>
                ))}

              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className={""}>
          <SidebarMenuButton
            tooltip={"Logout"}
            onClick={() => logout()}
            variant="ghost"
            className="w-full flex items-center justify-center gap-2 cursor-pointer hover:bg-destructive/60 text-shadow-black"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </AppSidebar>

      {/* Main Content */}
      <SidebarInset className={""}>
        <div className="flex justify-between items-center p-3 border-b border-border/50">
          <SidebarTrigger className={""} onClick={() => setOpen(!open)} />
          {/* <UserMenu /> */}
        </div>
        <div className="flex flex-1 flex-col gap-4 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
