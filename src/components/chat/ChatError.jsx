import React from "react";
import { useNavigate } from "react-router-dom";

const ChatError = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 text-center">
      <MessagesSquareIcon className="w-10 h-10 text-primary" />
      <h2 className="text-3xl font-bold">Chat Unavailable</h2>
      <Button onClick={() => navigate("/upload")}>Go Back</Button>
    </div>
  );
};

export default ChatError;
