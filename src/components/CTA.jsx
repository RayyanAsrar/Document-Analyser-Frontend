import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative w-[95%] mx-auto mt-24 py-24 px-6 md:px-12 rounded-2xl bg-card border border-border shadow-xl overflow-hidden my-5">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <motion.div
            initial={{ scale: 0.8, rotate: -10 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/20 shadow-lg"
          >
            <Sparkles className="w-10 h-10 text-primary" />
          </motion.div>
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-bold leading-tight mb-4 text-foreground">
          Ready to Transform Your Documents?
        </h2>

        {/* Subheading */}
        <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
          Join thousands of users who are already using{" "}
          <span className="font-semibold text-foreground">
            Document Analyzer
          </span>{" "}
          to unlock insights from their documents.
        </p>

        {/* Button */}
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/signup">
            <motion.div
              whileHover={{
                scale: 1.08,
                boxShadow: "0 4px 24px rgba(99,102,241,0.15)",
              }}
              whileTap={{ scale: 0.97 }}
            >
              <Button
                size="lg"
                className="text-lg px-10 py-6 font-bold bg-gradient-to-r from-primary to-indigo-500 text-primary-foreground shadow-lg border-0"
              >
                <span className="inline-flex items-center gap-2">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                  Start Analyzing Now
                </span>
              </Button>
            </motion.div>
          </Link>
        </div>
      </motion.div>

      {/* Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-secondary/20 rounded-full blur-3xl opacity-20"></div>
      </div>
    </section>
  );
};

export default CTA;
