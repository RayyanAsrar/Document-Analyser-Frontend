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
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef(null);

  // Fetch chat details
  useEffect(() => {
    async function fetchChat() {
      try {
        const res = await api.get(`/chat/${id}`);
        const chat = res.data.data.chat;
        setFile(chat.file);

        // Build initial conversation
        const initialMessages = [
          {
            id: "file-info",
            role: "user",
            type: "file",
            name: chat.file?.name,
            size: chat.file?.size,
          },
          {
            id: "summary",
            role: "assistant",
            type: "summary",
            answer: chat.file?.summary || "No summary available",
          },
          ...(chat.questions || []),
        ];

        setMessages(initialMessages);
      } catch (err) {
        toast.error(getApiMessage(err, "Failed to load chat"));
      } finally {
        setLoading(false);
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

      setMessages((prev) => [
        ...prev.filter((m) => m.id !== userMsg.id),
        botMsg,
      ]);
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
        {/* Chat Area */}
        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-6">
            {loading ? (
              <>
                <div className="animate-pulse h-6 w-1/3 bg-muted rounded-md" />
                <div className="animate-pulse h-6 w-2/3 bg-muted rounded-md" />
              </>
            ) : (
              messages.map((msg, index) => {
                if (msg.type === "file") {
                  return (
                    <div
                      key={msg.id}
                      className="flex justify-end animate-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="max-w-[70%] rounded-xl p-4 bg-primary text-primary-foreground shadow-md">
                        <div className="flex items-center space-x-3">
                          <FileIcon className="h-5 w-5" />
                          <div>
                            <p className="font-medium truncate">
                              {msg.name || "Untitled Document"}
                            </p>
                            <p className="text-xs opacity-80">
                              {msg.size
                                ? (msg.size / 1024 / 1024).toFixed(2) + " MB"
                                : "—"}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                }

                if (msg.type === "summary") {
                  return (
                    <div
                      key={msg.id}
                      className="flex justify-start animate-in slide-in-from-bottom"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="max-w-[70%] rounded-xl p-4 bg-card border border-border shadow-sm">
                        <h3 className="font-semibold mb-2">Summary</h3>
                        <p className="text-sm text-muted-foreground whitespace-pre-wrap">
                          {msg.answer}
                        </p>
                      </div>
                    </div>
                  );
                }

                // Normal chat bubbles
                return (
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
                        "max-w-[70%] rounded-xl p-4 text-sm shadow-md",
                        msg.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-sm"
                          : "bg-card border border-border rounded-bl-sm"
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
                );
              })
            )}

            {isTyping && (
              <div className="flex space-x-2 justify-start animate-in slide-in-from-bottom duration-300">
                <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                  <Bot className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="bg-muted rounded-lg rounded-bl-sm p-3 text-sm shadow-sm">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "150ms" }}
                    />
                    <div
                      className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"
                      style={{ animationDelay: "300ms" }}
                    />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t border-border bg-background/80 backdrop-blur-md shadow-lg">
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
