import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronLeft, ChevronRight, FileIcon, Clock } from "lucide-react";
import { cn } from "../lib/utils";
import { api, getApiMessage } from "@/lib/apiClient";
import { toast } from "sonner";

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchChats() {
      try {
        const res = await api.get("/chat");
        // API returns { success, message, data: { chats: [...] } }
        setChats(res.data.data.chats || []);
      } catch (err) {
        toast.error(getApiMessage(err, "Failed to load history"));
      }
    }
    fetchChats();
  }, []);

  return (
    <div
      className={cn(
        "border-r border-border bg-card transition-all duration-300 ease-in-out animate-in slide-in-from-left",
        isCollapsed ? "w-16" : "w-80"
      )}
      style={{ animationDuration: "500ms" }}
    >
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          {!isCollapsed && (
            <h2 className="text-lg font-semibold animate-in fade-in duration-300">
              History
            </h2>
          )}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hover:scale-110 transition-all duration-200 hover:bg-accent hover:shadow-md"
            aria-label={isCollapsed ? "Expand history" : "Collapse history"}
          >
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4 transition-transform duration-200" />
            ) : (
              <ChevronLeft className="h-4 w-4 transition-transform duration-200" />
            )}
          </Button>
        </div>

        {/* History List */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-2">
            {chats.length > 0 ? (
              chats.map((chat, index) => (
                <button
                  key={chat._id}
                  type="button"
                  onClick={() => navigate(`/chat/${chat._id}`)}
                  aria-label={`Open ${chat.fileName || "Chat"}`}
                  className={cn(
                    "flex items-center space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-sm animate-in slide-in-from-left"
                  )}
                  style={{
                    animationDelay: `${index * 100 + 200}ms`,
                    animationDuration: "400ms",
                  }}
                >
                  <FileIcon className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-colors duration-200" />
                  {!isCollapsed && (
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate transition-colors duration-200">
                        {chat.file?.name || "Untitled Document"}
                      </p>
                      <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>
                          {new Date(chat.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  )}
                </button>
              ))
            ) : (
              <p className="text-sm text-muted-foreground p-3">
                No history yet
              </p>
            )}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
