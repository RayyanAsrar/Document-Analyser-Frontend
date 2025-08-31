import React from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-background to-muted overflow-hidden flex items-center justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-bold text-foreground mb-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Where Others <span className="text-primary">Summarize</span>, We{" "}
            <span className="text-primary">Make You Understand</span>.
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
            Don’t settle for generic summaries. Upload any document and unlock
            real understanding with instant insights, context, clarity, and
            faster than ever.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-400">
            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 rounded-xl bg-primary/10 text-primary font-medium shadow-md border border-primary/20 hover:bg-primary/20 hover:scale-105 transition-all animate-in"
            >
              <Link to="/signup">Get Started Free</Link>
            </Button>
            {/* <Button
              asChild
              size="lg"
              variant="outline"
              className="text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              <Link to="/demo">Watch Demo</Link>
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
