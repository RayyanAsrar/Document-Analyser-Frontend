import React, { useState, useCallback } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Upload, ArrowDown } from "lucide-react";
import { cn } from "../lib/utils";

export function MainContent({ onImageUpload }) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);

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
    const imageFile = files.find((file) => file.type && file.type.startsWith("image/"));

    if (imageFile) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev?.target?.result;
        if (typeof result === "string") {
          setUploadedImage(result);
          // Notify parent component that image was uploaded
          onImageUpload?.(true);
        }
      };
      reader.readAsDataURL(imageFile);
    }
  }, [onImageUpload]);

  const handleFileSelect = useCallback((e) => {
    const file = e?.target?.files?.[0];
    if (file && file.type && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        const result = ev?.target?.result;
        if (typeof result === "string") {
          setUploadedImage(result);
          // Notify parent component that image was uploaded
          onImageUpload?.(true);
        }
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const handleUploadClick = () => {
    const input = document.getElementById("file-input");
    if (input) input.click();
  };

  const handleNewUpload = () => {
    setUploadedImage(null);
    // Notify parent component that image was removed
    onImageUpload?.(false);
  };

  if (uploadedImage) {
    return (
      <div className="flex-1 p-6 overflow-hidden">
        <Card className="h-full p-4 animate-in fade-in duration-500 flex flex-col">
          {/* Header - Fixed height */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <h3 className="text-lg font-semibold">Image Preview</h3>
            <Button
              variant="outline"
              onClick={handleNewUpload}
              className="hover:scale-105 transition-transform"
            >
              Upload New Image
            </Button>
          </div>
          
          {/* Image Container - Scrollable area with fixed height */}
          <div className="flex-1 overflow-auto min-h-0">
            <div className="flex items-start justify-center h-full">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded document"
                className="max-w-full h-auto object-contain rounded-lg shadow-lg"
                style={{ maxHeight: 'none' }} // Allow natural height, container will scroll
              />
            </div>
          </div>
        </Card>
      </div>
    );
  }

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
                {isDragOver ? "Drop your image here" : "Click to upload, or drag image here"}
              </h3>
              <p className="text-muted-foreground">Supports JPG, PNG, GIF up to 10MB</p>
            </div>
          </div>
        </Card>

        {/* Secondary Note with Arrow */}
        <div className="flex items-center space-x-2 text-sm text-muted-foreground animate-in slide-in-from-bottom duration-700 delay-300">
          <ArrowDown className="h-4 w-4" />
          <span>Drag + Drop your image here</span>
        </div>

        {/* Upload Button */}
        <Button
          onClick={handleUploadClick}
          className="px-8 py-3 text-lg hover:scale-105 transition-transform animate-in slide-in-from-bottom duration-700 delay-500"
        >
          <Upload className="mr-2 h-5 w-5" />
          Upload Image
        </Button>

        {/* Hidden File Input */}
        <input id="file-input" type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
      </div>
    </div>
  );
}