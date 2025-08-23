  import React from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent } from "../components/ui/card";
  import { Upload, MessageSquare, Zap, Shield, FileText, Brain } from "lucide-react";
  import { Navbar } from "../components/Navbar";
  import { Link } from "react-router-dom";
import Hero from "../components/Hero";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
//*******className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
// **********these are the classes used for animations in the HomePage component
  export default function HomePage() {
    return (
      <>
      <Navbar/>
      <div className="min-h-screen bg-background">
        {/* Hero Section */} 
       <Hero />

        {/* Features Section */}
        <Features />

        {/* CTA Section */}
       <CTA />

        {/* Footer */}
       <Footer />
      </div>
      </>
    );
  }
