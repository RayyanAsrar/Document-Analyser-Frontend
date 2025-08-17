import React, { useState, useRef, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";

const dummyMessages = [
  {
    id: 1,
    type: "bot",
    content:
      "Hello! I'm ready to help you analyze your documents. Please upload an image to get started.",
    timestamp: "10:30 AM",
  },
  { id: 2, type: "user", content: "I want to extract text from this invoice", timestamp: "10:32 AM" },
  {
    id: 3,
    type: "bot",
    content:
      "I can help you extract text from invoices! Please upload the image and I'll analyze it for you.",
    timestamp: "10:32 AM",
  },
];

export function ChatBox() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(dummyMessages);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    // Functional update to avoid race conditions
    setMessages((prev) => [
      ...prev,
      {
        id: prev.length + 1,
        type: "user",
        content: trimmed,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);

    setMessage("");
    setIsTyping(true);

    // Simulate bot response with typing indicator
    setTimeout(() => {
      const botResponses = [
        "I can see your message. Please upload an image so I can analyze it for you.",
        "That's interesting! Once you upload a document image, I'll be able to help you with that.",
        "I'm ready to help! Just drag and drop an image into the upload area and I'll analyze it.",
        "Great question! Upload your document image and I'll provide detailed analysis.",
      ];
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];

      // Functional update to keep IDs correct even with rapid sends
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          type: "bot",
          content: randomResponse,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);

      setIsTyping(false);
    }, 1500);
  };

  // Prefer onKeyDown over deprecated onKeyPress
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    
    <div className="w-96 h-full border-l border-border bg-card flex flex-col animate-in slide-in-from-right duration-500">
      {/* Header - Fixed height */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h3 className="font-semibold flex items-center space-x-2">
          <Bot className="h-4 w-4 text-primary" />
          <span>AI Assistant</span>
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        </h3>
        <p className="text-xs text-muted-foreground mt-1">Online and ready to help</p>
      </div>

      {/* ✅ FIXED: Messages area - Takes remaining space and scrolls internally */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id}
                className={cn(
                  "flex space-x-2 animate-in slide-in-from-bottom duration-500",
                  msg.type === "user" ? "justify-end" : "justify-start"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {msg.type === "bot" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 text-sm shadow-sm",
                    msg.type === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  )}
                >
                  <p className="leading-relaxed">{msg.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-2 opacity-70",
                      msg.type === "user" ? "text-primary-foreground" : "text-muted-foreground"
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>

                {msg.type === "user" && (
                  <div className="h-8 w-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <User className="h-4 w-4 text-secondary-foreground" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex space-x-2 justify-start animate-in slide-in-from-bottom duration-300">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg rounded-bl-sm p-3 text-sm shadow-sm">
                  <div className="flex items-center space-x-1">
                    <div className="flex space-x-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                    <span className="text-xs text-muted-foreground ml-2">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input - Fixed height */}
      <div className="p-4 border-t border-border bg-background/50 flex-shrink-0">
        <div className="flex space-x-2">
          <Input
            placeholder="Ask about your document..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 focus:ring-2 focus:ring-primary/20 transition-all"
            disabled={isTyping}
          />
          <Button
            size="icon"
            onClick={handleSendMessage}
            disabled={!message.trim() || isTyping}
            className="hover:scale-110 transition-transform disabled:hover:scale-100"
          >
            {isTyping ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}