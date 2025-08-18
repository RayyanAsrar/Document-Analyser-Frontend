import React from "react";
import { ThemeProvider } from "../context/ThemeProvider.jsx";
import { Toaster } from "../components/ui/sonner"; 

export default function RootLayout({ children }) {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="document-analyzer-theme">
      <div className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster position="top-right" richColors closeButton />
      </div>
    </ThemeProvider>
  );
}
