const TypingIndicator = ({ isStreaming }) => (
  <div className="flex items-center gap-1 text-muted-foreground">
    {isStreaming ? (
      <span className="w-3 h-3 rounded-full bg-black animate-pulse"></span>
    ) : null}
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.2s]"></span>
    <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:0.4s]"></span>
  </div>
);

export default TypingIndicator;
