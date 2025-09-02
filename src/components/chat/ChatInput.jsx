import { useState, useRef } from "react";
import { Send, Loader2, Mic, Square, X } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const ChatInput = ({
  newQuestion,
  setNewQuestion,
  submitting,
  onSubmit,
  onKeyDown,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [tempTranscript, setTempTranscript] = useState("");
  const recognitionRef = useRef(null);

  const startListening = () => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition not supported in this browser.");
      return;
    }

    // Clean up previous instance
    if (recognitionRef.current) {
      recognitionRef.current.onresult = null;
      recognitionRef.current.onerror = null;
      recognitionRef.current.onend = null;
    }

    recognitionRef.current = new SpeechRecognition();
    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "en-US";

    recognitionRef.current.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setTempTranscript(transcript);
    };
    recognitionRef.current.onerror = (event) => {
      alert("Speech recognition error: " + event.error);
      setIsRecording(false);
    };
    recognitionRef.current.onend = () => {
      setIsRecording(false);
    };

    try {
      recognitionRef.current.start();
      setIsRecording(true);
    } catch (err) {
      alert("Could not start speech recognition: " + err.message);
      setIsRecording(false);
    }
  };

  const stopListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch (err) {
      alert("Could not stop speech recognition: " + err.message);
    }
    setIsRecording(false);
    if (tempTranscript.trim()) {
      // Merge intelligently: add space only if needed
      setNewQuestion(
        (prev) =>
          (prev.trim() ? prev.trim() + ". " : "") + tempTranscript.trim()
      );
      setTempTranscript("");
    }
  };

  const cancelListening = () => {
    try {
      recognitionRef.current?.stop();
    } catch (err) {
      alert("Could not stop speech recognition: " + err.message);
    }
    setIsRecording(false);
    setTempTranscript("");
  };

  return (
    <div className="border-t border-border bg-background p-3 sticky bottom-0 left-0 w-full">
      <div className="max-w-[1200px] mx-auto flex items-center gap-2">
        <Textarea
          placeholder="Ask a question... (Shift+Enter for newline)"
          value={newQuestion + (isRecording ? " " + tempTranscript : "")}
          onChange={(e) => setNewQuestion(e.target.value)}
          onKeyDown={onKeyDown}
          className="flex-1 resize-none"
          rows={2}
        />

        {isRecording ? (
          <>
            <Button
              onClick={stopListening}
              className="shrink-0"
              aria-label="Stop recording"
            >
              <Square className="w-4 h-4" /> {/* Stop button */}
            </Button>
            <Button
              onClick={cancelListening}
              className="shrink-0 bg-muted-foreground"
              aria-label="Cancel recording"
            >
              <X className="w-4 h-4" /> {/* Cancel button */}
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={startListening}
              className="shrink-0"
              aria-label="Start voice input"
              disabled={submitting}
            >
              <Mic className="w-4 h-4" />
            </Button>
            <Button
              onClick={onSubmit}
              disabled={submitting || !newQuestion.trim()}
              className="shrink-0"
              aria-label="Send message"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )}
            </Button>
          </>
        )}
      </div>
      <p className="text-xs text-center text-muted-foreground mt-2">
        OmniView AI can make mistakes.{" "}
        <span className="font-semibold">
          Please verify any critical information.
        </span>
      </p>
    </div>
  );
};

export default ChatInput;
