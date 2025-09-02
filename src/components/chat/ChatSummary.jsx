import MarkdownRender from "../MarkdownRender";
import { Check, Copy, Download, Square, Volume2 } from "lucide-react";
import { useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const ChatSummary = ({ summary }) => {
  const [copied, setCopied] = useState(false);
  const [talking, setTalking] = useState(false);
  const utteranceRef = useRef(null);

  const handleCopy = () => {
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([summary], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.md";
    link.click();
  };

  const handleSpeak = () => {
    if (!summary) return;

    const cleanSummary = summary.replace(/[*#_>`[\]()]/g, "");

    speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(cleanSummary);
    utterance.lang = "en-US"; // change if needed
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

  if (!summary)
    return <p className="text-muted-foreground">No summary available.</p>;

  return (
    <div className="mb-6 relative">
      <h2 className="font-semibold text-lg mb-1">Summary</h2>

      <div className="absolute top-2 right-2 text-xs text-muted-foreground flex gap-2">
        <TooltipProvider delayDuration={150}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="hover:bg-gray-200/15 transition p-1 rounded cursor-pointer"
                onClick={handleCopy}
                aria-label="Copy Summary"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-500 cursor-pointer" />
                ) : (
                  <Copy className="w-4 h-4 cursor-pointer" />
                )}
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{copied ? "Copied!" : "Copy summary"}</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <button
                className="hover:bg-gray-200/15 transition p-1 rounded cursor-pointer"
                onClick={handleDownload}
                aria-label="Download Summary"
              >
                <Download className="w-4 h-4 cursor-pointer" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Download</p>
            </TooltipContent>
          </Tooltip>

          {!talking ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  className="hover:bg-gray-200/15 transition p-1 rounded cursor-pointer"
                  onClick={handleSpeak}
                  aria-label="Speak Summary"
                >
                  <Volume2 className="w-4 h-4 cursor-pointer" />
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
                  className="hover:bg-gray-200/15 transition p-1 rounded cursor-pointer"
                  onClick={handleStop}
                  aria-label="Stop Speech"
                >
                  <Square className="w-4 h-4 cursor-pointer" />
                </button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Stop</p>
              </TooltipContent>
            </Tooltip>
          )}
        </TooltipProvider>
      </div>

      <div className="text-muted-foreground">
        <div
          style={{
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <MarkdownRender content={summary} />
        </div>
      </div>
    </div>
  );
};

export default ChatSummary;
