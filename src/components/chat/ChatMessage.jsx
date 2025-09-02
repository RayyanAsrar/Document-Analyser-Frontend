import { motion } from "framer-motion";
import { Copy, Volume2, Square } from "lucide-react";
import CustomAvatar from "../CustomAvatar";
import MarkdownRender from "../MarkdownRender";
import TypingIndicator from "./TypingIndicator";
import { useState, useRef } from "react";

const ChatMessage = ({ message }) => {
  const { question, answer, questionTime, answerTime, optimistic, streaming } =
    message;

  const [talking, setTalking] = useState(false);
  const utteranceRef = useRef(null);

  const handleCopy = () => {
    if (answer) navigator.clipboard.writeText(answer);
  };

  const handleSpeak = () => {
    if (!answer) return;

    const cleanAnswer = answer.replace(/[*#_>`]/g, "");

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanAnswer);
    utterance.lang = "ur-PK";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => setTalking(false);

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);

    setTalking(true);
  };

  const handleStop = () => {
    speechSynthesis.cancel();
    setTalking(false);
  };

  return (
    <div className="flex flex-col gap-4 max-w-full">
      <div className="flex items-end justify-end gap-2">
        <div className="flex flex-col items-end max-w-[80%]">
          <div className="bg-white text-black px-4 py-2 rounded-2xl shadow">
            {question}
          </div>
          <span className="text-xs text-gray-400 mt-1">
            {questionTime ? new Date(questionTime).toLocaleTimeString() : ""}
          </span>
        </div>
        <CustomAvatar size={30} />
      </div>

      <div className="flex items-start gap-3">
        {/* Bot avatar */}
        <div className="flex-shrink-0">
          <div className="bg-primary rounded-full p-2 flex justify-center items-center">
            <img
              src="/OmniView AI Wordmark.png"
              alt="Bot"
              className="w-5 h-5"
            />
          </div>
        </div>

        <div className="flex flex-col items-start max-w-[80%]">
          <div className="bg-muted px-4 py-3 rounded-2xl w-full shadow-sm">
            {answer ? (
              <motion.div
                key={answer.length}
                initial={{ opacity: 0.6, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <MarkdownRender content={answer} />
              </motion.div>
            ) : optimistic || streaming ? (
              <TypingIndicator isStreaming={streaming} />
            ) : (
              <span className="text-gray-400 italic">No answer yet</span>
            )}
          </div>

          <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
            <span>
              {answerTime ? new Date(answerTime).toLocaleTimeString() : ""}
            </span>
            {answer && (
              <div className="flex gap-2 items-center">
                {/* Copy button */}
                <button
                  aria-label="Copy"
                  className="p-1 rounded hover:bg-gray-200 transition"
                  onClick={handleCopy}
                >
                  <Copy size={16} />
                </button>

                {!talking ? (
                  <button
                    aria-label="Speak"
                    className="p-1 rounded hover:bg-gray-200 transition"
                    onClick={handleSpeak}
                  >
                    <Volume2 size={16} />
                  </button>
                ) : (
                  <button
                    aria-label="Stop"
                    className="p-1 rounded hover:bg-gray-200 transition"
                    onClick={handleStop}
                  >
                    <Square size={16} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
