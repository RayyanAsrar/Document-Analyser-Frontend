import React, { useState } from "react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";
import { ChevronLeft, ChevronRight, FileImage, Clock } from "lucide-react";
import { cn } from "../lib/utils";

const dummyHistory = [
  { id: 1, name: "Invoice_2024.pdf", date: "2 hours ago", type: "pdf" },
  { id: 2, name: "Receipt_scan.jpg", date: "1 day ago", type: "image" },
  { id: 3, name: "Contract_draft.pdf", date: "3 days ago", type: "pdf" },
  { id: 4, name: "Business_card.png", date: "1 week ago", type: "image" },
  { id: 5, name: "Report_final.pdf", date: "2 weeks ago", type: "pdf" },
];

export function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

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
          {!isCollapsed && <h2 className="text-lg font-semibold animate-in fade-in duration-300">History</h2>}
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
            {dummyHistory.map((item, index) => (
              <button
                key={item.id}
                type="button"
                aria-label={`Open ${item.name}`}
                className={cn(
                  "flex items-center space-x-3 p-3 rounded-lg hover:bg-accent cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-sm animate-in slide-in-from-left"
                )}
                style={{
                  animationDelay: `${index * 100 + 200}ms`,
                  animationDuration: "400ms",
                }}
              >
                <FileImage className="h-4 w-4 text-muted-foreground flex-shrink-0 transition-colors duration-200" />
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate transition-colors duration-200">{item.name}</p>
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{item.date}</span>
                    </div>
                  </div>
                )}
              </button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
