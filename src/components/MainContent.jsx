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

  // 🔥 Core upload logic
  const handleFileUpload = async (file) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are supported");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Ask backend for a signed upload URL
      const uploadRes = await api.post("/upload", {
        fileName: file.name,
        contentType: file.type,
      });

      const { url, key } = uploadRes.data.data;
      if (!url || !key) throw new Error("Invalid upload response");

      // Step 2: Upload file to S3 directly
      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": file.type,
        },
        body: file,
      });

      // Step 3: Tell backend to process file
      const processRes = await api.post("/file/process", {
        key,
        name: file.name,
        size: file.size,
        contentType: file.type,
      });

      const chatId = processRes.data.data.chat._id;
      toast.success("File uploaded and processed! Redirecting...");

      // Step 4: Redirect to chat page
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
    [] // no deps, handleFileUpload already stable
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
                  ? "Drop your PDF here"
                  : "Click to upload, or drag & drop PDF here"}
              </h3>
              <p className="text-muted-foreground">Supports PDF up to 10MB</p>
            </div>
          </div>
        </Card>

        {/* Secondary Note */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-300">
          <ArrowDown className="h-4 w-4" />
          <span>Drag & Drop your PDF here</span>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUploadClick}
          disabled={loading}
          className="px-8 py-3 text-lg hover:scale-105 transition-transform animate-in slide-in-from-bottom duration-700 delay-500"
        >
          {loading ? "Uploading..." : "Upload PDF"}
        </Button>

        {/* Hidden File Input */}
        <input
          id="file-input"
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>
    </div>
  );
}
