import React from "react"
import { Navbar } from "./components/navbar"
import { Sidebar } from "./components/sidebar"
import { MainContent } from "./components/main-content"
import { ChatBox } from "./components/chat-box"

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-background animate-in fade-in duration-700">
      <Navbar />
      <div className="flex h-[calc(100vh-4rem)]">
        <Sidebar />
        <MainContent />
        <ChatBox />
      </div>
    </div>
  )
}
