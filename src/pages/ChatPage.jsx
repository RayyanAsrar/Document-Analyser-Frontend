import React, { useCallback, useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/apiClient";
import { toast } from "sonner";
import { FilesIcon, Send, Loader2, Bot, User, ChartAreaIcon, MessagesSquareIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Cookie from "js-cookie";

// Utility to format file size
const formatFileSize = (bytes) => {
  if (!bytes && bytes !== 0) return "-";
  const mb = bytes / (1024 * 1024);
  return mb < 1 ? `${(bytes / 1024).toFixed(1)} KB` : `${mb.toFixed(2)} MB`;
};

// Typing indicator component (animated dots)
const TypingIndicator = () => (
  <div className="flex items-center gap-1 text-muted-foreground">
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></span>
  </div>
);

const ChatPage = () => {
  const { id } = useParams();
  const [questions, setQuestions] = useState([]);
  const [chat, setChat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const token = Cookie.get("token");
  const navigate = useNavigate();

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
      toast.error("Error fetching chat");
      console.error("Error fetching chat:", error);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);

  // Auto-scroll on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions]);

  // Submit new question
  // When asking a question
  const askQuestion = async () => {
    const text = newQuestion?.trim();
    if (!text) return;

    setSubmitting(true);

    const tempId = Date.now();
    const tempQuestion = {
      _id: tempId,
      question: text,
      answer: null,
      optimistic: true,
      createdAt: new Date().toISOString(), // ensure timestamp is there
    };

    setQuestions((prev) => [...prev, tempQuestion]);
    setNewQuestion("");

    try {
      const { data } = await api.post(
        `/question/${id}/ask`,
        {
          question: text,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const serverItem = data?.data;

      // merge server data with optimistic one, keeping createdAt if missing
      setQuestions((prev) =>
        prev.map((q) =>
          q._id === tempId
            ? { ...serverItem, createdAt: serverItem.createdAt || q.createdAt }
            : q
        )
      );
    } catch (error) {
      setQuestions((prev) => prev.filter((q) => q._id !== tempId));
      toast.error("Failed to submit question");
      console.error("askQuestion error:", error);
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

  if (loading) {
    return (
      <section className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Loading chat...</p>
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
      <p className="text-base text-muted-foreground mb-4 max-w-md">
        The requested chat could not be found.<br />
        It may have been deleted or you lack permission to view it.
      </p>
      <Button
        variant="default"
        onClick={() => navigate("/upload")}
        className="mt-2 px-6 py-2 text-base cursor-pointer font-semibold rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition"
      >
        Go Back to Dashboard
      </Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col bg-transparent max-h-[calc(100vh-85px)] overflow-hidden">
      {/* Scrollable messages area */}
      <div className="flex-1 p-4 gap-6 overflow-y-auto mobile-scrollbar max-h-[calc(100vh-50px)]">
        {/* File info (separate block) */}
        <div className="flex items-center justify-end mb-4">
          <div className="flex items-center gap-3 rounded-lg p-3 w-[280px] bg-primary">
            <FilesIcon className="text-primary-foreground flex-shrink-0 w-5 h-5" />
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

        {/* File Summary (separate block) */}
        <div className="mb-6">
          <h2 className="font-semibold text-lg mb-1">Summary</h2>
          <p className="text-muted-foreground">
            {chat?.file?.summary || "No summary available."}
          </p>
        </div>

        {/* Q&A Chat Flow */}
        <div className="flex flex-col gap-4">
          {questions.length > 0 ? (
            questions.map((q) => (
              <div key={q._id} className="flex flex-col gap-2 max-w-full">
                {/* User Question */}
                <div className="flex items-end justify-end gap-2">
                  <div className="flex flex-col items-end max-w-[80%]">
                    <div className="bg-primary/20 px-3 py-2 rounded-lg break-words">
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

                {/* AI Answer */}
                <div className="flex items-start gap-2">
                  <div className="bg-primary rounded-full p-2">
                    <Bot className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div className="bg-muted px-3 py-2 rounded-lg break-words">
                      {q.answer ? (
                        q.answer
                      ) : q.optimistic ? (
                        <TypingIndicator />
                      ) : (
                        <span className="text-muted-foreground italic">
                          No answer yet
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      <span className="text-xs text-muted-foreground mt-1">
                        {q.answerTime
                          ? new Date(q.answerTime).toLocaleTimeString()
                          : ""}
                      </span>
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

        {/* Scroll anchor */}
        <div ref={messagesEndRef} />
      </div>

      {/* Fixed chatbox overlay */}
      <div className="border-t border-border bg-background p-3">
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
