import React from "react";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { MainContent } from "../components/MainContent";
import { ChatBox } from "../components/ChatBox";

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-700">
      <div className="flex h-[calc(100vh-4rem)]">
        <MainContent />
        {/* <ChatBox /> */}
      </div>
    </div>
  );
}
