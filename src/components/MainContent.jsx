import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, ArrowDown } from "lucide-react";
import { cn } from "../lib/utils";
import { api, getApiMessage } from "@/lib/apiClient";
import { toast } from "sonner";

export function MainContent() {
  const [isDragOver, setIsDragOver] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 🔥 Core uploader
  const handleFileUpload = async (file) => {
    if (!file) return;

    setLoading(true);
    try {
      // Step 1: Upload document
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await api.post("/documents/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const document = uploadRes.data.data.document;
      toast.success(`Uploaded: ${document.name}`);

      // Step 2: Create chat with that document
      const chatRes = await api.post("/chat/create", {
        documentId: document._id,
      });

      const chatId = chatRes.data.data.chat._id;
      toast.success("Chat created. Redirecting...");

      // Step 3: Redirect to chat page
      navigate(`/chat/${chatId}`);
    } catch (err) {
      toast.error(getApiMessage(err, "Upload failed"));
    } finally {
      setLoading(false);
    }
  };

  // 🎯 Drag & drop handlers
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const files = Array.from(e.dataTransfer?.files || []);
      if (files.length > 0) {
        handleFileUpload(files[0]);
      }
    },
    [handleFileUpload]
  );

  const handleFileSelect = (e) => {
    const file = e?.target?.files?.[0];
    if (file) handleFileUpload(file);
  };

  const handleUploadClick = () => {
    const input = document.getElementById("file-input");
    if (input) input.click();
  };

  return (
    <div className="flex-1 p-6">
      <div className="h-full flex flex-col items-center justify-center space-y-6 animate-in fade-in duration-500">
        <Card
          className={cn(
            "w-full max-w-2xl h-96 border-2 border-dashed transition-all duration-300 cursor-pointer group",
            isDragOver
              ? "border-primary bg-primary/5 shadow-lg shadow-primary/20"
              : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20 hover:shadow-md"
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={handleUploadClick}
          role="button"
          tabIndex={0}
        >
          <div className="h-full flex flex-col items-center justify-center space-y-4 p-8">
            {/* Upload Icon */}
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

            {/* Main Text */}
            <div className="text-center space-y-2">
              <h3 className="text-xl font-semibold">
                {isDragOver
                  ? "Drop your file here"
                  : "Click to upload, or drag & drop file here"}
              </h3>
              <p className="text-muted-foreground">
                Supports PDF, DOCX, PNG, JPG up to 10MB
              </p>
            </div>
          </div>
        </Card>

        {/* Secondary Note */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-300">
          <ArrowDown className="h-4 w-4" />
          <span>Drag & Drop your file here</span>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUploadClick}
          disabled={loading}
          className="px-8 py-3 text-lg hover:scale-105 transition-transform animate-in slide-in-from-bottom duration-700 delay-500"
        >
          {loading ? "Uploading..." : "Upload File"}
        </Button>

        {/* Hidden File Input */}
        <input
          id="file-input"
          type="file"
          accept=".pdf,.docx,.jpg,.jpeg,.png"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
