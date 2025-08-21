import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileIcon, Send, Bot, User, Loader2 } from "lucide-react";
import { api, getApiMessage } from "@/lib/apiClient";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function ChatPage() {
  const { id } = useParams();
  const [file, setFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Fetch chat details
  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await api.get(`/chat/${id}`);
        const chat = res.data.data.chat;
        setFile(chat.file);
        setSummary(chat.file?.summary || "No summary available");
        setMessages(chat.questions || []);
      } catch (err) {
        toast.error(getApiMessage(err, "Failed to load chat"));
      }
    }
    if (id) fetchChat();
  }, [id]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Send new message
  const handleSend = async () => {
    const trimmed = message.trim();
    if (!trimmed) return;

    const userMsg = {
      id: Date.now(),
      question: trimmed,
      answer: null,
      role: "user",
    };

    setMessages((prev) => [...prev, userMsg]);
    setMessage("");
    setIsTyping(true);

    try {
      const res = await api.post(`/questions/${id}/ask`, { question: trimmed });
      const botMsg = {
        id: Date.now() + 1,
        question: trimmed,
        answer: res.data.data.answer,
        role: "assistant",
      };

      setMessages((prev) => [...prev.filter((m) => m.id !== userMsg.id), botMsg]);
    } catch (err) {
      toast.error(getApiMessage(err, "Failed to get answer"));
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Chat Section */}
      <div className="flex-1 flex flex-col">
        {/* File Header */}
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileIcon className="h-6 w-6 text-primary" />
            <div>
              <p className="font-medium">{file?.name || "Untitled Document"}</p>
              <p className="text-xs text-muted-foreground">
                {(file?.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="p-4 border-b border-border bg-muted/30">
          <h3 className="font-semibold mb-2">Summary</h3>
          <p className="text-sm text-muted-foreground">{summary}</p>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-6">
            {messages.map((msg, index) => (
              <div
                key={msg.id || index}
                className={cn(
                  "flex space-x-2 animate-in slide-in-from-bottom duration-500",
                  msg.role === "user" ? "justify-end" : "justify-start"
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {msg.role === "assistant" && (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <Bot className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}

                <div
                  className={cn(
                    "max-w-[70%] rounded-lg p-3 text-sm shadow-sm",
                    msg.role === "user"
                      ? "bg-primary text-primary-foreground rounded-br-sm"
                      : "bg-muted rounded-bl-sm"
                  )}
                >
                  {msg.role === "user" ? (
                    <p>{msg.question}</p>
                  ) : (
                    <p>{msg.answer}</p>
                  )}
                </div>

                {msg.role === "user" && (
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
                  <p className="text-muted-foreground">AI is typing...</p>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background/50">
          <div className="flex space-x-2">
            <Input
              placeholder="Ask about your document..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              disabled={isTyping}
              className="flex-1 focus:ring-2 focus:ring-primary/20 transition-all"
            />
            <Button
              size="icon"
              onClick={handleSend}
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
    </div>
  );
}
