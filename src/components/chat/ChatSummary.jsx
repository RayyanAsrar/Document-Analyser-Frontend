import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

const ChatSummary = ({ summary }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [isOverflowing, setIsOverflowing] = useState(false);
  const contentRef = useRef(null);

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > 120);
    }
  }, [summary]);

  if (!summary)
    return <p className="text-muted-foreground">No summary available.</p>;

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-1">Summary</h2>
      <div className="text-muted-foreground">
        <div
          ref={contentRef}
          style={{
            maxHeight: showFullSummary ? "none" : "120px",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>

        {isOverflowing && (
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
    </div>
  );
};

export default ChatSummary;
