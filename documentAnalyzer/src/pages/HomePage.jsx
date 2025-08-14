import React from "react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md w-full space-y-8 p-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-2">
            Document Analyzer
          </h1>
          <p className="text-muted-foreground">
            Analyze your documents with AI
          </p>
        </div>

        <div className="space-y-4">
          <button
            className="w-full px-4 py-2 bg-primary text-white rounded"
            onClick={() => (window.location.href = "/login")}
          >
            Login
          </button>
          <button
            className="w-full px-4 py-2 border border-gray-300 bg-transparent rounded"
            onClick={() => (window.location.href = "/signup")}
          >
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
