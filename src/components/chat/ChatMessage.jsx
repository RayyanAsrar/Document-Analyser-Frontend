import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { User, Bot } from "lucide-react";
import TypingIndicator from "./TypingIndicator";
import CustomAvatar from "../CustomAvatar";

const ChatMessage = ({ message }) => {
  const { question, answer, questionTime, answerTime, optimistic, streaming } =
    message;

  return (
    <div className="flex flex-col gap-2 max-w-full">
      {/* User question */}
      <div className="flex items-end justify-end gap-2">
        <div className="flex flex-col items-end max-w-[80%]">
          <div className="bg-white text-black px-3 py-2 rounded-lg shadow-md break-words">
            {question}
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {questionTime ? new Date(questionTime).toLocaleTimeString() : ""}
          </span>
        </div>
        <div className="bg-primary rounded-full p-2">
          <CustomAvatar size={24} />
        </div>
      </div>

      {/* AI answer */}
      <div className="flex items-start gap-2">
        <div className="bg-primary rounded-full p-2">
          <img src="/OmniView AI Wordmark.png" alt="Bot" className="w-5 h-5 text-primary-foreground" />
        </div>
        <div className="flex flex-col items-start max-w-[80%]">
          <div className="bg-muted px-3 py-2 rounded-lg break-words whitespace-pre-wrap">
            {answer ? (
              <motion.div
                key={answer.length}
                initial={{ opacity: 0.6, y: 2 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.15 }}
              >
                <ReactMarkdown>{answer}</ReactMarkdown>
              </motion.div>
            ) : optimistic || streaming ? (
              <TypingIndicator isStreaming={streaming} />
            ) : (
              <span className="text-muted-foreground italic">
                No answer yet
              </span>
            )}
          </div>
          <span className="text-xs text-muted-foreground mt-1">
            {answerTime ? new Date(answerTime).toLocaleTimeString() : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
