import React from "react";
import { ThemeProvider } from "../context/ThemeProvider.jsx";
import { Toaster } from "../components/ui/sonner"; 
import { AuthProvider } from "@/context/AuthContext";


export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <ThemeProvider defaultTheme="dark" storageKey="document-analyzer-theme">
        <div className="min-h-screen bg-background text-foreground">
          {children}
          <Toaster position="top-right" richColors closeButton />
        </div>
      </ThemeProvider>
    </AuthProvider>
  );
}






