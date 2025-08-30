import React from "react";
import { useAuth } from "../context/AuthContext";

const Greetings = () => {
  const { user } = useAuth();
const lines = [
    "Upload a document to get started or view your collection.",
    "Explore the features and capabilities of our document analysis tools.",
    "Get insights and summaries from your documents with ease.",
    "Your documents are safe and secure with us.",
    "Easily organize and manage your files in one place.",
    "Try searching for keywords to quickly find important information.",
    "Share your analysis results with your team effortlessly.",
    "Experience fast and accurate document processing.",
    "Discover trends and patterns in your data.",
    "Access your documents from any device, anytime.",
    "Start a new analysis to unlock valuable insights.",
    "Need help? Check out our support resources.",
    "Stay productive with our intuitive interface.",
    "Automate repetitive tasks and save time.",
    ""
]
  return (
    <div>
      <h1 className="text-2xl font-bold">
        {user ? `Welcome back, ${user.name}! 👋` : "Welcome to Document Analyser!"}
      </h1>
      <p className=" text-muted-foreground">
        {lines[Math.random() * lines.length | 0]}
      </p>
    </div>
  );
};

export default Greetings;
