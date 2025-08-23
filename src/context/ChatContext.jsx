import Cookie from "js-cookie";
import { createContext, useContext, useState } from "react";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);

  const addChats = (newChat) => {
    setChats((prevChats) => [newChat, ...prevChats]);
  };

  return (
    <ChatContext.Provider value={{ chats, addChats, setChats }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  return useContext(ChatContext);
}
