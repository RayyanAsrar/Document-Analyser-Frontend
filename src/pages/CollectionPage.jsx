import React, { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardAction,
} from "../components/ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Skeleton } from "../components/ui/skeleton";
import {
  MoreVertical,
  Eye,
  Download,
  MessageSquare,
  FileX,
} from "lucide-react";
import api from "../lib/apiClient";
import Cookie from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useChats } from "../context/ChatContext";

const CollectionPage = () => {
  const [search, setSearch] = useState("");
  const [files, setFiles] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]);
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
        setSelectedFiles(data.data);

        console.log(data.data);
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

  // Option handlers
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
      window.open(url, "_blank"); // open in new tab
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = async (file) => {
    try {
      // Request download URL from backend
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
      <div className="mb-6">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {loading ? (
          // Skeleton state
          [...Array(6)].map((_, i) => (
            <Card key={i} className="relative">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <Skeleton className="h-4 w-40 mb-2" />
                  <Skeleton className="h-3 w-24" />
                </div>
                <Skeleton className="h-6 w-6 rounded-md" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-4 w-full mb-2" />
                <Skeleton className="h-3 w-1/2" />
              </CardContent>
            </Card>
          ))
        ) : selectedFiles.length <= 0 ? (
          <div className="flex flex-col items-center justify-center w-full col-span-3 py-12 bg-background rounded-lg border border-dashed border-muted">
            <FileX className="mb-6 w-16 h-16 opacity-60" />
            <div className="mb-2 text-xl font-bold text-muted-foreground">
              Looks like you haven't uploaded a file yet
            </div>
            <div className="mb-6 text-sm text-muted-foreground">
              Start by uploading your first document to get started!
            </div>
            <Button
              onClick={() => navigate("/upload")}
              variant="default"
              size="lg"
            >
              Upload a file
            </Button>
          </div>
        ) : (
          selectedFiles.map((file) => (
            <Card key={file._id} className="relative">
              <CardHeader className="flex flex-row justify-between items-start">
                <div>
                  <CardTitle className="text-base font-bold">
                    {file.name}
                  </CardTitle>
                  <CardDescription className="mt-1 text-xs">
                    {file.contentType.split("/")[1].toUpperCase()} •{" "}
                    {(file.size / 1024).toFixed(1)} KB
                  </CardDescription>
                </div>
                <CardAction>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className="cursor-pointer"
                        variant="ghost"
                        size="icon"
                      >
                        <MoreVertical size={18} />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => handleView(file)}
                      >
                        <Eye size={16} /> View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => handleDownload(file)}
                      >
                        <Download size={16} /> Download
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="cursor-pointer flex items-center gap-2"
                        onClick={() => handleShowInChat(file)}
                      >
                        <MessageSquare size={16} /> Show in Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </CardAction>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-muted-foreground mb-2">
                  <span className="font-semibold">Summary:</span>{" "}
                  {file.summary?.slice(0, 100) || "No summary available."} ...
                </div>
                <div className="text-xs text-muted-foreground">
                  <span className="font-semibold">Uploaded:</span>{" "}
                  {new Date(file.createdAt).toLocaleDateString()}
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </section>
  );
};

export default CollectionPage;
