import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "../src/context/ThemeProvider.jsx";
import { Toaster } from "../src/components/ui/sonner.jsx";
import { AuthProvider } from "@/context/AuthContext";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider defaultTheme="dark" storageKey="document-analyzer-theme">
          <App />
          <Toaster position="top-right" richColors closeButton />
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
