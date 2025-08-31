import React from "react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import {
  Upload,
  MessageSquare,
  Zap,
  Shield,
  FileText,
  Brain,
} from "lucide-react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import Problem from "../components/Problem";
import Flow from "../components/Flow";

const HomePage = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-background">
        <Hero />
        <Problem />
        <Features />
        <Flow />
        <CTA />
        <Footer />
      </div>
    </>
  );
};

export default HomePage;
