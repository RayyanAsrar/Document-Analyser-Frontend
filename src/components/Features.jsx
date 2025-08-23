import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import {
  Brain,
  FileText,
  MessageSquare,
  Shield,
  Upload,
  Zap,
} from "lucide-react";

const Features = () => {
  return (
    <div className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to analyze and understand your documents with AI
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Easy Upload */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Upload className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
                <p className="text-muted-foreground">
                  Drag and drop your documents or click to upload. Supports
                  PDFs, images, and more.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Analysis */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Brain className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">AI Analysis</h3>
                <p className="text-muted-foreground">
                  Advanced AI processes your documents to extract insights and
                  understand content.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Interactive Chat */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Interactive Chat</h3>
                <p className="text-muted-foreground">
                  Ask questions about your documents and get instant,
                  intelligent responses.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Lightning Fast */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Lightning Fast</h3>
                <p className="text-muted-foreground">
                  Get results in seconds, not minutes. Our optimized AI
                  processes documents quickly.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Secure & Private */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Secure & Private</h3>
                <p className="text-muted-foreground">
                  Your documents are encrypted and secure. We prioritize your
                  privacy and data protection.
                </p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Multiple Formats */}
          <motion.div
            whileHover={{
              scale: 1.05,
              boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
              borderColor: "#6366f1",
            }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="border border-border rounded-xl bg-background/80"
          >
            <Card className="border-none shadow-none">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Multiple Formats</h3>
                <p className="text-muted-foreground">
                  Support for PDFs, images, text files, and more. Analyze any
                  document type.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Features;
