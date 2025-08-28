import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";

const ChatSummary = ({ summary }) => {
  const [showFullSummary, setShowFullSummary] = useState(false);

  if (!summary)
    return <p className="text-muted-foreground">No summary available.</p>;

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-1">Summary</h2>
      <div className="text-muted-foreground">
        <div
          style={{
            maxHeight: showFullSummary ? "1000px" : "120px",
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <ReactMarkdown>
            {showFullSummary
              ? summary
              : summary.slice(0, 400) + (summary.length > 400 ? "..." : "")}
          </ReactMarkdown>
        </div>
        {summary.length > 400 && (
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
