import { motion } from "framer-motion";
import { Brain, FileText, Sparkles, Lightbulb } from "lucide-react";

const features = [
  {
    icon: <Brain className="w-8 h-8 text-indigo-600" />,
    title: "True Understanding",
    desc: "Go beyond summaries — get clarity, context, and meaning instantly.",
  },
  {
    icon: <FileText className="w-8 h-8 text-indigo-600" />,
    title: "Smart Extraction",
    desc: "No clutter, no noise. Extract exactly what matters, nothing less.",
  },
  {
    icon: <Lightbulb className="w-8 h-8 text-indigo-600" />,
    title: "AI-Powered Insights",
    desc: "Not just text. Actionable insights crafted for real decisions.",
  },
  {
    icon: <Sparkles className="w-8 h-8 text-indigo-600" />,
    title: "Effortless Workflow",
    desc: "One tool that adapts to you — not the other way around.",
  },
];

export default function Flow() {
  return (
    <section className="py-10" id="features">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold mb-6"
        >
          More Than Features, A Smarter Way Forward
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          viewport={{ once: true }}
          className="text-gray-600 max-w-2xl mx-auto mb-16"
        >
          While others keep stacking gimmicks, we focus on what matters: making you smarter, faster, and unstoppable.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
