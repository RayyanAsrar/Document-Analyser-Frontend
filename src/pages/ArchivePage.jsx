import React, { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import api, { getApiMessage } from "../lib/apiClient";
import Cookie from "js-cookie";
import { useChats } from "../context/ChatContext";
import ArchiveChatCard from "../components/ArchiveChatCard";

const ArchivePage = () => {
  const token = Cookie.get("token");
  const { chats } = useChats();
  const [archivedChats, setArchivedChats] = useState([]);

  const fetchChats = useCallback(async () => {
    try {
      const { data } = await api.get("/chat/archived/list", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const { data: contents } = data;
      setArchivedChats(contents);
    } catch (error) {
      toast.error(getApiMessage(error));
    }
  }, [token]);

  useEffect(() => {
    fetchChats();
  }, [chats, fetchChats]);

  const handleUnarchive = async (chatId) => {
    try {
      await api.post(`/chat/${chatId}/unarchive`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Chat unarchived successfully.");
      fetchChats();
    } catch (error) {
      toast.error(getApiMessage(error));
    }
  };

  const handleDelete = async (chatId) => {
    try {
      await api.delete(`/chat/${chatId}/delete`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Chat deleted successfully.");
      fetchChats();
    } catch (error) {
      toast.error(getApiMessage(error));
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">
        📂 Archived Chats
      </h2>

      {archivedChats.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-gray-50 rounded-xl border">
          No archived chats found.
        </div>
      ) : (
        <div className="grid gap-5">
          {archivedChats.map((chat) => (
            <ArchiveChatCard
              key={chat._id}
              chat={chat}
              onUnarchive={handleUnarchive}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default ArchivePage;
