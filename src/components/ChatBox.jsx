import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ScrollArea } from "./ui/scroll-area";
import { Send, Bot, User, Loader2 } from "lucide-react";
import { cn } from "../lib/utils";
import { api, getApiMessage } from "@/lib/apiClient";
import { toast } from "sonner";

export function ChatBox() {
  const { chatId } = useParams();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // 🛠️ Normalize messages no matter the format
  const normalizeMessage = (msg) => ({
    id: msg.id || Date.now(),
    type: msg.type
      ? msg.type // already "user" | "bot"
      : msg.role === "assistant"
      ? "bot"
      : "user",
    content: msg.content,
    timestamp: msg.timestamp
      ? msg.timestamp
      : new Date(msg.createdAt || Date.now()).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
  });

  // 📥 Fetch chat history
  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await api.get(`/chat/${chatId}`);
        const formatted = (res.data.data.chat.messages || []).map(normalizeMessage);
        setMessages(formatted);
      } catch (err) {
        toast.error(getApiMessage(err, "Failed to load chat"));
      }
    }
    if (chatId) fetchChat();
  }, [chatId]);

  // Always scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // 📨 Handle sending
  const handleSendMessage = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg = normalizeMessage({
      id: Date.now(),
      role: "user",
      content: trimmed,
      createdAt: new Date(),
    });

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await api.post(`/questions/${chatId}/ask`, {
        question: trimmed,
      });

      const botMsg = normalizeMessage({
        id: Date.now() + 1,
        role: "assistant",
        content: res.data.data.answer,
        createdAt: new Date(),
      });

      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      toast.error(getApiMessage(err, "Failed to get answer"));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-96 h-full border-l border-border bg-card flex flex-col animate-in slide-in-from-right duration-500">
      {/* Header */}
      <div className="p-4 border-b border-border flex-shrink-0">
        <h3 className="font-semibold flex items-center space-x-2">
          <Bot className="h-4 w-4 text-primary" />
          <span>AI Assistant</span>
          <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse" />
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          Online and ready to help
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full p-4">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
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
                      msg.type === "user"
                        ? "text-primary-foreground"
                        : "text-muted-foreground"
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
                    <span className="text-xs text-muted-foreground ml-2">
                      AI is typing...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
      </div>

      {/* Input */}
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
            {isTyping ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Press Enter to send, Shift+Enter for new line
        </p>
      </div>
    </div>
  );
}
