import React from "react";
import { FileText, Clock, AlertTriangle, Search } from "lucide-react";
import { motion } from "framer-motion";

const problems = [
  {
    icon: <Clock className="w-8 h-8 text-primary" />,
    title: "Wasting Hours on Reading",
    desc: "Scrolling through endless pages just to find one key insight drains time and energy.",
  },
  {
    icon: <AlertTriangle className="w-8 h-8 text-primary" />,
    title: "Missing Critical Details",
    desc: "Manual skimming often leads to overlooking important points hidden deep inside documents.",
  },
  {
    icon: <Search className="w-8 h-8 text-primary" />,
    title: "Hard to Search & Navigate",
    desc: "Traditional tools don’t let you simply ask a question and get the answer instantly.",
  },
  {
    icon: <FileText className="w-8 h-8 text-primary" />,
    title: "Cluttered Document Chaos",
    desc: "Juggling PDFs, reports, and contracts across multiple apps creates confusion and errors.",
  },
];

// Variants for staggered animation
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const Problem = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-bold text-foreground mb-12"
        >
          The <span className="text-primary">Problem</span> We Solve
        </motion.h2>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {problems.map((problem, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="p-6 rounded-2xl bg-background shadow-sm transition duration-300 ease-out hover:shadow-lg hover:scale-[1.03]"
            >
              <div className="flex justify-center mb-4">{problem.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{problem.title}</h3>
              <p className="text-muted-foreground">{problem.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Problem;
