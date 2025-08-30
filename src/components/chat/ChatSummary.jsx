import ReactMarkdown from "react-markdown";

const ChatSummary = ({ summary }) => {
  if (!summary)
    return <p className="text-muted-foreground">No summary available.</p>;

  return (
    <div className="mb-6">
      <h2 className="font-semibold text-lg mb-1">Summary</h2>
      <div className="text-muted-foreground">
        <div
          style={{
            overflow: "hidden",
            transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1)",
          }}
        >
          <ReactMarkdown>{summary}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default ChatSummary;
