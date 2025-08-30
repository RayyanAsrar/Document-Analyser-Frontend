import Cookie from "js-cookie";
import { createContext, useContext, useState } from "react";
import api from "../lib/apiClient";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const token = Cookie.get("token");

  const addChats = (newChat) => {
    setChats((prevChats) => [newChat, ...prevChats]);
  };

  const refetchChats = async () => {
    const { data } = await api.get("/chat", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setChats(data.data || []);
  };

  return (
    <ChatContext.Provider value={{ chats, addChats, setChats, refetchChats }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChats() {
  return useContext(ChatContext);
}
