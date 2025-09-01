import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ThemeProvider } from "../src/context/ThemeProvider.jsx";
import { Toaster } from "../src/components/ui/sonner.jsx";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { ChatProvider } from "./context/ChatContext.jsx";
import { ArchiveChatProvider } from "./context/ArchiveChatContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <BrowserRouter>
        <AuthProvider>
          <ChatProvider>
            <ArchiveChatProvider>
              <ThemeProvider
                defaultTheme="dark"
                storageKey="document-analyzer-theme"
              >
                <App />
                <Toaster position="top-right" richColors closeButton />
              </ThemeProvider>
            </ArchiveChatProvider>
          </ChatProvider>
        </AuthProvider>
      </BrowserRouter>
    </GoogleOAuthProvider>
  </StrictMode>
);
