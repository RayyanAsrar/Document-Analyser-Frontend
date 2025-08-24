import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api, { getApiMessage } from "../lib/apiClient";
import { toast } from "sonner";
import {
  FilesIcon,
  Send,
  Loader2,
  Bot,
  User,
  MessagesSquareIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Cookie from "js-cookie";
import ReactMarkdown from "react-markdown";

// Utility to format file size
const formatFileSize = (bytes) => {
  if (!bytes && bytes !== 0) return "-";
  const mb = bytes / (1024 * 1024);
  return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
};

// Typing indicator component (animated dots)
const TypingIndicator = ({ isStreaming }) => (
  <div className="flex items-center gap-1 text-muted-foreground">
    {isStreaming ? <span className="text-sm">AI is typing</span> : null}
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></span>
  </div>
);

const ChatPage = () => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const token = Cookie.get("token");
  const navigate = useNavigate();

  // 🔹 Fetch chat history
  const fetchChat = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/chat/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { chat, questions } = data.data || {};
      setChat(chat || null);
      setQuestions(questions || []);
    } catch (error) {
      const message = getApiMessage(error, "Error fetching chat");
      toast.error(message);
      console.error("Error fetching chat:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions, messagesEndRef]);

  // 🔹 Ask Question with streaming

  const controllerRef = useRef(null);

  const askQuestion = async () => {
    const text = newQuestion?.trim();
    if (!text) return;

    setSubmitting(true);

    const tempId = Date.now();
    const tempQuestion = {
      _id: tempId,
      question: text,
      answer: "",
      optimistic: true,
      questionTime: new Date().toISOString(),
    };

    // Optimistic add
    setQuestions((prev) => [...prev, tempQuestion]);
    setNewQuestion("");

    controllerRef.current = new AbortController(); // For cleanup

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/question/${id}/ask`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ question: text }),
          signal: controllerRef.current.signal, // Add abort signal
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body for streaming");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let fullAnswer = "";
      let buffer = ""; // Buffer for incomplete chunks

      try {
        while (true) {
          const { done, value } = await reader.read();

          if (done) {
            console.log("Stream completed");
            break;
          }

          // Decode the chunk and add to buffer
          const chunk = decoder.decode(value, { stream: true });
          buffer += chunk;

          // Process complete lines from buffer
          const lines = buffer.split("\n");
          buffer = lines.pop() || ""; // Keep incomplete line in buffer

          for (const line of lines) {
            const trimmed = line.trim();

            // Skip empty lines and event headers
            if (
              !trimmed ||
              trimmed === "event: message" ||
              trimmed === "event: end"
            ) {
              continue;
            }

            // Handle data lines
            if (trimmed.startsWith("data:")) {
              const dataContent = trimmed.substring(5).trim();

              // Check for stream end markers
              if (dataContent === "[DONE]" || dataContent === "DONE") {
                console.log("Stream ended with DONE marker");
                break;
              }

              // Skip empty data
              if (!dataContent) continue;

              try {
                const payload = JSON.parse(dataContent);

                // Handle different response formats
                let piece = "";
                if (payload.answer) {
                  piece = payload.answer;
                } else if (payload.text) {
                  piece = payload.text;
                } else if (payload.content) {
                  piece = payload.content;
                } else if (payload.delta && payload.delta.content) {
                  piece = payload.delta.content;
                } else if (typeof payload === "string") {
                  piece = payload;
                }

                if (piece) {
                  fullAnswer += piece;

                  // Update UI progressively
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q._id === tempId
                        ? { ...q, answer: fullAnswer, streaming: true }
                        : q
                    )
                  );
                }
              } catch (parseError) {
                console.warn(
                  "Failed to parse JSON chunk:",
                  dataContent,
                  parseError
                );
                // Sometimes the stream sends plain text, try adding it directly
                if (dataContent && !dataContent.startsWith("{")) {
                  fullAnswer += dataContent;
                  setQuestions((prev) =>
                    prev.map((q) =>
                      q._id === tempId
                        ? { ...q, answer: fullAnswer, streaming: true }
                        : q
                    )
                  );
                }
              }
            }
          }
        }
      } finally {
        // Always close the reader
        reader.releaseLock();
      }

      // Mark as completed
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === tempId
            ? {
                ...q,
                optimistic: false,
                streaming: false,
                answer: fullAnswer,
                answerTime: new Date().toISOString(),
              }
            : q
        )
      );
    } catch (error) {
      console.error("Streaming error:", error);

      // Remove optimistic question on error
      setQuestions((prev) => prev.filter((q) => q._id !== tempId));

      // Show appropriate error message
      if (error.name === "AbortError") {
        toast.error("Question was cancelled");
      } else if (error.message.includes("fetch")) {
        toast.error("Connection error. Please check your internet connection.");
      } else {
        toast.error(getApiMessage(error, "Failed to get answer"));
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (!submitting && newQuestion.trim()) askQuestion();
    }
  };
  useEffect(() => {
    return () => {
      // Cleanup any ongoing streams when component unmounts
      controllerRef.current?.abort();
    };
  }, []);

  // 🔹 Skeleton Loading UI
  if (loading) {
    return (
      <section className="flex flex-col h-full min-h-[calc(100vh-85px)] p-4 gap-6">
        {/* File Info Skeleton */}
        <div className="flex justify-end">
          <div className="flex items-center gap-3 rounded-lg p-3 w-[280px] bg-muted">
            <Skeleton className="w-5 h-5 rounded" />
            <div className="flex flex-col flex-1 min-w-0">
              <Skeleton className="h-4 w-40 mb-2" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </div>

        {/* Summary Skeleton */}
        <div>
          <Skeleton className="h-5 w-32 mb-3" />
          <Skeleton className="h-4 w-full mb-2" />
          <Skeleton className="h-4 w-2/3" />
        </div>

        {/* Chat bubbles skeleton */}
        <div className="flex flex-col gap-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col gap-3 max-w-full">
              {/* User message */}
              <div className="flex items-end justify-end gap-2">
                <div className="flex flex-col items-end max-w-[80%]">
                  <Skeleton className="h-5 w-48 mb-1 rounded-lg" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="w-8 h-8 rounded-full" />
              </div>
              {/* Bot reply */}
              <div className="flex items-start gap-2">
                <Skeleton className="w-8 h-8 rounded-full" />
                <div className="flex flex-col items-start max-w-[80%]">
                  <Skeleton className="h-5 w-64 mb-1 rounded-lg" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!chat) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 text-center bg-gradient-to-b from-background to-muted/40 rounded-xl shadow-lg">
        <div className="rounded-full bg-primary/10 p-5 mb-6 border border-primary/20">
          <MessagesSquareIcon className="w-10 h-10 text-primary" />
        </div>
        <h2 className="text-3xl font-bold text-foreground mb-2">
          Chat Unavailable
        </h2>
        <Button
          variant="default"
          onClick={() => navigate("/upload")}
          className="mt-2 px-6 py-2"
        >
          Go Back to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col h-full min-h-[calc(100vh-85px)] bg-transparent">
      <div className="flex-1 p-4 gap-6 overflow-y-auto mobile-scrollbar">
        {/* File info */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-3 rounded-lg p-3 w-[280px] bg-primary">
            <FilesIcon className="text-primary-foreground w-5 h-5" />
            <div className="flex flex-col flex-1 min-w-0">
              <span
                title={chat?.file?.name || "Untitled"}
                className="font-medium text-primary-foreground truncate"
              >
                {chat?.file?.name || "Untitled"}
              </span>
              <span className="text-sm text-primary-foreground/80">
                {formatFileSize(chat?.file?.size)}
              </span>
            </div>
          </div>
        </div>

        {/* Summary with Markdown and Read More */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-1">Summary</h2>
          {chat?.file?.summary ? (
            <div className="text-muted-foreground">
              <ReactMarkdown>
                {showFullSummary
                  ? chat.file.summary
                  : chat.file.summary.length > 400
                  ? chat.file.summary.slice(0, 400) + "..."
                  : chat.file.summary}
              </ReactMarkdown>
              {chat.file.summary.length > 400 && (
                <Button
                  variant="link"
                  size="sm"
                  className="mt-1 px-0"
                  onClick={() => setShowFullSummary((v) => !v)}
                >
                  {showFullSummary ? "Show Less" : "Read More"}
                </Button>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">No summary available.</p>
          )}
        </div>

        {/* Q&A Flow */}
        <div className="flex flex-col gap-4">
          {questions.length > 0 ? (
            questions.map((q) => (
              <div key={q._id} className="flex flex-col gap-2 max-w-full">
                {/* User question */}
                <div className="flex items-end justify-end gap-2">
                  <div className="flex flex-col items-end max-w-[80%]">
                    <div className="bg-white text-black px-3 py-2 rounded-lg shadow-md break-words">
                      {q.question}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {q.questionTime
                        ? new Date(q.questionTime).toLocaleTimeString()
                        : ""}
                    </span>
                  </div>
                  <div className="bg-primary rounded-full p-2">
                    <User className="w-5 h-5 text-primary-foreground" />
                  </div>
                </div>

                {/* AI answer */}
                <div className="flex items-start gap-2">
                  <div className="bg-primary rounded-full p-2">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-muted px-3 py-2 rounded-lg break-words whitespace-pre-wrap">
                      {q.answer ? (
                        <ReactMarkdown>{q.answer}</ReactMarkdown>
                      ) : q.optimistic || q.streaming ? (
                        <TypingIndicator isStreaming={q.streaming} />
                      ) : (
                        <span className="text-muted-foreground italic">
                          No answer yet
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {q.answerTime
                        ? new Date(q.answerTime).toLocaleTimeString()
                        : ""}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-muted-foreground">
              No questions yet. Start by asking one below.
            </p>
          )}
        </div>

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-border bg-background p-3 sticky bottom-0 left-0 w-full">
        <div className="max-w-[1200px] mx-auto flex items-center gap-2">
          <Textarea
            placeholder="Ask a question... (Shift+Enter for newline)"
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 resize-none"
            rows={2}
          />
          <Button
            onClick={askQuestion}
            disabled={submitting || !newQuestion.trim()}
            className="shrink-0"
          >
            {submitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ChatPage;
