import ChatMessage from "./ChatMessage";

const ChatMessages = ({ questions }) => {
  if (!questions.length) {
    return (
      <p className="text-muted-foreground">
        No questions yet. Start by asking one below.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {questions.map((q) => (
        <ChatMessage key={q._id} message={q} />
      ))}
    </div>
  );
};

export default ChatMessages;
