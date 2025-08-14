// src/layouts/RootLayout.jsx
import React, { useEffect } from "react";
import { ThemeProvider } from "../components/theme-provider"; // adjust path if needed
import "../globals.css";

// Optional metadata (not used directly in React)
export const metadata = {
  title: "Document Analyzer",
  description: "Analyze your documents with AI",
  generator: "v0.app",
};

export default function RootLayout({ children }) { 
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "root-layout-fonts";
    style.innerHTML = `
      :root {
        --font-sans: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial;
        --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, "Roboto Mono", "Helvetica Neue", monospace;
      }
      html { font-family: var(--font-sans); }
    `;
    document.head.appendChild(style);

    return () => {
      const el = document.getElementById("root-layout-fonts");
      if (el) el.remove();
    };
  }, []);

  return (
    <ThemeProvider defaultTheme="dark" storageKey="document-analyzer-theme">
      {children}
    </ThemeProvider>
  );
}
