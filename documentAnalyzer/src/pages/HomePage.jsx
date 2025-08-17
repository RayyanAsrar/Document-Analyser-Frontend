  import React from "react";
  import { Button } from "../components/ui/button";
  import { Card, CardContent } from "../components/ui/card";
  import { Upload, MessageSquare, Zap, Shield, FileText, Brain } from "lucide-react";
  import { Navbar } from "../components/Navbar";
  import { Link } from "react-router-dom";
//*******className="animate-in fade-in slide-in-from-bottom-4 duration-1000"
// **********these are the classes used for animations in the HomePage component
  export default function HomePage() {
    return (
      <>
      <Navbar/>
      <div className="min-h-screen bg-background">
        {/* Hero Section */} 
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center">
              <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                Document <span className="text-primary">Analyzer</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
                Transform your documents into intelligent conversations. Upload, analyze, and chat with your PDFs and
                images using advanced AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
                <Button asChild size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
                  <Link to="/signup">Get Started Free</Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 hover:scale-105 transition-transform bg-transparent"
                >
                  
                  <Link to="/login">Sign In</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Powerful Features</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to analyze and understand your documents with AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Easy Upload */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
                  <p className="text-muted-foreground">
                    Drag and drop your documents or click to upload. Supports PDFs, images, and more.
                  </p>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                  <p className="text-muted-foreground">
                    Advanced AI processes your documents to extract insights and understand content.
                  </p>
                </CardContent>
              </Card>

              {/* Interactive Chat */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Interactive Chat</h3>
                  <p className="text-muted-foreground">
                    Ask questions about your documents and get instant, intelligent responses.
                  </p>
                </CardContent>
              </Card>

              {/* Lightning Fast */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Get results in seconds, not minutes. Our optimized AI processes documents quickly.
                  </p>
                </CardContent>
              </Card>

              {/* Secure & Private */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                  <p className="text-muted-foreground">
                    Your documents are encrypted and secure. We prioritize your privacy and data protection.
                  </p>
                </CardContent>
              </Card>

              {/* Multiple Formats */}
              <Card className="hover:shadow-lg transition-all duration-300 hover:scale-105">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
                  <p className="text-muted-foreground">
                    Support for PDFs, images, text files, and more. Analyze any document type.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Ready to Transform Your Documents?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join thousands of users who are already using Document Analyzer to unlock insights from their documents.
            </p>
            <Button asChild size="lg" className="text-lg px-8 py-6 hover:scale-105 transition-transform">
              <a href="/signup">Start Analyzing Now</a>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-foreground mb-2">Document Analyzer</h3>
              <p className="text-muted-foreground">Powered by advanced AI technology</p>
            </div>
          </div>
        </footer>
      </div>
      </>
    );
  }
