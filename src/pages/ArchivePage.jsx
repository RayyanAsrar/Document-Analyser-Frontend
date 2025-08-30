import React, { useCallback, useEffect } from "react";
import { toast } from "sonner";
import api, { getApiMessage } from "../lib/apiClient";
import Cookie from "js-cookie";
import { useChats } from "../context/ChatContext";
import ArchiveChatCard from "../components/ArchiveChatCard";
import { useArchiveChats } from "../context/ArchiveChatContext";

const ArchivePage = () => {
  const token = Cookie.get("token");
  const { chats, refetchChats } = useChats();
  const { archivedChats, setArchivedChats } = useArchiveChats();

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
  }, [token, setArchivedChats]);

  useEffect(() => {
    fetchChats();
  }, [chats, fetchChats]);

  const handleDelete = async (chatId, isDeleted) => {
    try {
      await api.put(
        `/chat/${chatId}`,
        {
          isDeleted: !isDeleted,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setArchivedChats((prevChats) =>
        prevChats.filter((chat) => chat._id !== chatId)
      );
      toast.success("Chat deleted successfully");
    } catch (error) {
      console.error("Error deleting chat:", error);
      toast.error("Error deleting chat");
    }
  };
  const handleUnarchive = async (chatId, isArchived) => {
    try {
      await api.put(
        `/chat/archive/${chatId}`,
        {
          isArchived: !isArchived,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      await refetchChats();
      toast.success("Chat archived successfully");
    } catch (error) {
      console.error("Error archiving chat:", error);
      toast.error("Error archiving chat");
    }
  };

  return (
    <section className="p-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Archived Chats</h1>
        <p className="text-sm text-muted-foreground">
          Manage your archived chats and conversations
        </p>
      </div>

      {archivedChats.length === 0 ? (
        <div className="text-center py-12  rounded-xl border">
          No archived chats found.
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
