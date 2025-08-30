import Cookie from "js-cookie";
import { createContext, useContext, useState } from "react";

const ArchiveChatContext = createContext();

export function ArchiveChatProvider({ children }) {
  const [archivedChats, setArchivedChats] = useState([]);

  const addChats = (newChat) => {
    setArchivedChats((prevChats) => [newChat, ...prevChats]);
  };

  return (
    <ArchiveChatContext.Provider value={{ archivedChats, addChats, setArchivedChats }}>
      {children}
    </ArchiveChatContext.Provider>
  );
}

export function useArchiveChats() {
  return useContext(ArchiveChatContext);
}
