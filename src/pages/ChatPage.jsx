import { useEffect, useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import api, { getApiMessage } from "../lib/apiClient";
import { toast } from "sonner";
import Cookie from "js-cookie";
import ChatHeader from "../components/chat/ChatHeader";
import ChatSummary from "../components/chat/ChatSummary";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import ChatSkeleton from "../components/chat/ChatSkeleton";
import ChatError from "../components/chat/ChatError";

export default function ChatPage() {
  const { id } = useParams();
  const [chat, setChat] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newQuestion, setNewQuestion] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const messagesEndRef = useRef(null);
  const token = Cookie.get("token");
  const [errorMessage, setErrorMessage] = useState(null);

  const fetchChat = useCallback(async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`/chat/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setChat(data.data?.chat || null);
      setQuestions(data.data?.questions || []);
    } catch (err) {
      const message = getApiMessage(err, "Error fetching chat");
      toast.error(message);
      setErrorMessage(message);
    } finally {
      setLoading(false);
    }
  }, [id, token]);

  useEffect(() => {
    fetchChat();
  }, [fetchChat]);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [questions]);

  const askQuestion = async () => {
    const text = newQuestion.trim();
    if (!text) return;
    setSubmitting(true);
    const tempId = Date.now();
    setQuestions((prev) => [
      ...prev,
      { _id: tempId, question: text, answer: "", optimistic: true },
    ]);
    setNewQuestion("");

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
        }
      );
      if (!response.body) throw new Error("No stream body");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let fullAnswer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        fullAnswer += chunk;
        setQuestions((prev) =>
          prev.map((q) =>
            q._id === tempId ? { ...q, answer: fullAnswer, streaming: true } : q
          )
        );
      }

      setQuestions((prev) =>
        prev.map((q) =>
          q._id === tempId
            ? { ...q, answer: fullAnswer, streaming: false, optimistic: false }
            : q
        )
      );
    } catch (error) {
      toast.error("Failed to fetch answer");
      console.error(error);
      setQuestions((prev) => prev.filter((q) => q._id !== tempId));
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

  if (loading) return <ChatSkeleton />;
  if (!chat) return <ChatError msg={errorMessage} />;

  return (
    <section className="flex flex-col h-full min-h-[calc(100vh-85px)]">
      <div className="flex-1 p-4 gap-6 overflow-y-auto">
        <ChatHeader file={chat.file} />
        <ChatSummary summary={chat.file?.summary} />
        <ChatMessages questions={questions} />
        <div ref={messagesEndRef} />
      </div>
      <ChatInput
        newQuestion={newQuestion}
        setNewQuestion={setNewQuestion}
        submitting={submitting}
        onSubmit={askQuestion}
        onKeyDown={handleKeyDown}
      />
    </section>
  );
}
