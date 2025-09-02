import { motion } from "framer-motion";
import { Copy, Volume2, Square, Check } from "lucide-react";
import CustomAvatar from "../CustomAvatar";
import MarkdownRender from "../MarkdownRender";
import TypingIndicator from "./TypingIndicator";
import { useState, useRef } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatMessage = ({ message }) => {
  const { question, answer, questionTime, answerTime, optimistic, streaming } =
    message;
  const [copied, setCopied] = useState(false);
  const [talking, setTalking] = useState(false);
  const utteranceRef = useRef(null);

  const handleCopy = () => {
    if (answer) navigator.clipboard.writeText(answer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSpeak = () => {
    if (!answer) return;

    const cleanAnswer = answer.replace(/[*#_>`]/g, "");

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanAnswer);
    utterance.lang = "ur-PK"; // fallback to "en-US" if no Urdu voice installed
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

          {answer && (
            <div className="flex items-center gap-3 mt-2 text-xs text-gray-400">
              <span>
                {answerTime ? new Date(answerTime).toLocaleTimeString() : ""}
              </span>

              <TooltipProvider delayDuration={150}>
                <div className="flex gap-2 items-center">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        aria-label="Copy"
                        className="p-1 rounded hover:bg-gray-200/15 transition cursor-pointer"
                        onClick={handleCopy}
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-500" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy answer"}</p>
                    </TooltipContent>
                  </Tooltip>

                  {!talking ? (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          aria-label="Speak"
                          className="p-1 rounded hover:bg-gray-200/15 transition cursor-pointer"
                          onClick={handleSpeak}
                        >
                          <Volume2 size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Speak</p>
                      </TooltipContent>
                    </Tooltip>
                  ) : (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          aria-label="Stop"
                          className="p-1 rounded hover:bg-gray-200/15 transition cursor-pointer"
                          onClick={handleStop}
                        >
                          <Square size={16} />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Stop</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </TooltipProvider>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
