import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, FileText, X, LoaderCircle } from "lucide-react";
import { cn } from "../lib/utils";
import api, { getApiMessage } from "@/lib/apiClient";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { useChats } from "../context/ChatContext";
import Greetings from "./Greetings";

export function MainContent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const token = Cookie.get("token");
  const { addChats } = useChats();

  // 🔥 Upload logic
  const handleFileUpload = async () => {
    if (!selectedFile) return;

    const file = selectedFile;
    setLoading(true);
    try {
      const uploadRes = await api.post(
        "/upload",
        {
          fileName: file.name,
          contentType: file.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { url, key } = uploadRes.data.data;

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const { data } = await api.post(
        "/file/process",
        {
          key,
          name: file.name,
          size: file.size,
          contentType: file.type,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { chat } = data.data;
      const message = data.message;
      addChats({ ...chat, file: { name: file.name } });
      const chatId = chat?._id;
      toast.success(message);
      navigate(`/chat/${chatId}`);
    } catch (err) {
      toast.error(getApiMessage(err, "Upload failed"));
    } finally {
      setLoading(false);
    }
  };

  // 🎯 File selection
  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are supported");
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB");
      return;
    }

    setSelectedFile(file);
  };

  const handleRemoveFile = () => setSelectedFile(null);

  // 🎯 Drag & drop
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer?.files || []);
    if (files.length > 0) handleFileSelect({ target: { files } });
  }, []);

  const handleUploadClick = () => {
    const input = document.getElementById("file-input");
    if (input) input.click();
  };

  return (
    <section className="">
      <div>
        <Greetings />
      </div>

      <div className="flex-1 flex flex-col gap-4 items-center justify-center my-10">
        {/* Drag & Drop / File Info Card */}
        <Card
          className={cn(
            "w-full max-w-2xl h-72 border-2 border-dashed transition-all duration-300 flex items-center justify-center cursor-pointer group p-0 md:px-2",
            isDragOver
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20 hover:shadow-md"
          )}
          onDragOver={!selectedFile ? handleDragOver : undefined}
          onDragLeave={!selectedFile ? handleDragLeave : undefined}
          onDrop={!selectedFile ? handleDrop : undefined}
          onClick={!selectedFile ? handleUploadClick : undefined}
          role="button"
          tabIndex={0}
        >
          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center space-y-4 p-8 text-center">
              <div
                className={cn(
                  "h-16 w-16 rounded-full flex items-center justify-center transition-all duration-300",
                  isDragOver
                    ? "bg-primary text-primary-foreground scale-110"
                    : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
                )}
              >
                <Upload className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold">
                {isDragOver ? "Drop your PDF here" : "Click or drag & drop PDF"}
              </h3>
              <p className="text-muted-foreground">Supports PDF up to 10MB</p>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full max-w-md p-4 border rounded-lg shadow-sm bg-muted/30">
              <div className="flex items-center gap-3">
                <FileText className="h-6 w-6 text-primary" />
                <div>
                  <p className="font-medium">{selectedFile.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <button
                onClick={handleRemoveFile}
                className="p-1 rounded-full hover:bg-muted text-muted-foreground hover:text-red-500 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          )}
        </Card>

        {selectedFile && (
          <Button
            onClick={selectedFile ? handleFileUpload : handleUploadClick}
            disabled={loading || (!selectedFile && !loading)}
            className="px-8 py-3 text-lg hover:scale-105 transition-transform animate-in fade-in duration-500"
          >
            {loading ? (
              <>
                Uploading... <LoaderCircle className="w-5 h-5 animate-spin" />
              </>
            ) : (
              "Upload PDF"
            )}
          </Button>
        )}

        <input
          id="file-input"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </section>
  );
}
