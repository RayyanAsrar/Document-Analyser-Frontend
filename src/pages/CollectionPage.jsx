import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FileCard from "../components/file/FileCard";
import FileLoader from "../components/file/FileLoader";
import NoFileFallback from "../components/file/NoFileFallback";
import { Input } from "../components/ui/input";
import { useChats } from "../context/ChatContext";
import api from "../lib/apiClient";

const CollectionPage = () => {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState(files);
  const [loading, setLoading] = useState(true);
  const { chats } = useChats();
  const token = Cookie.get("token");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/file", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFiles(data.data);
      } catch (error) {
        console.error("Error fetching files:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFiles();
  }, [token, chats]);

  useEffect(() => {
    const filteredFiles = files.filter((file) =>
      file.name.toLowerCase().includes(search.toLowerCase())
    );
    setSelectedFiles(filteredFiles);
  }, [search, files]);

  const handleView = async (file) => {
    try {
      const { data } = await api.post(
        "/upload/download",
        { key: file.key },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const { url } = data.data;
      window.open(url, "_blank");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (file) => {
    try {
      const { data } = await api.post(
        "/upload/download",
        { key: file.key },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const { url } = data.data;
      const response = await fetch(url);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = file.name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
    }
  };

  const handleShowInChat = (file) => {
    if (file.chat?._id) {
      navigate(`/chat/${file.chat._id}`);
    } else {
      console.warn("No chat found for this file");
    }
  };

  return (
    <section className="p-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold">Collection</h1>
        <p className="text-sm text-muted-foreground">
          Manage your uploaded files and documents
        </p>
      </div>
      <div className="mb-6">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          [...Array(6)].map((_, i) => <FileLoader key={i} />)
        ) : selectedFiles.length <= 0 ? (
          <NoFileFallback />
        ) : (
          selectedFiles.map((file) => (
            <FileCard
              key={file._id}
              file={file}
              handleView={handleView}
              handleDownload={handleDownload}
              handleShowInChat={handleShowInChat}
            />
          ))
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
