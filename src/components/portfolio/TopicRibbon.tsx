import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

const topics = [
  { id: "ai", label: "Artificial Intelligence", short: "AI", icon: "🤖" },
  { id: "rpa", label: "Robotic Process Automation", short: "RPA", icon: "⚙️" },
  { id: "lean-sigma", label: "Lean Six Sigma", short: "Lean Σ", icon: "📊" },
  { id: "project-management", label: "Project Management", short: "PM", icon: "📋" },
];

export function TopicRibbon() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.9 }}
      className="relative z-40 border-b border-border/40 bg-navy-deep/90 backdrop-blur-md"
    >
      <div className="max-w-6xl mx-auto px-6 py-2.5">
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/40 mr-2 shrink-0 hidden sm:block">
            Domains
          </span>
          {topics.map((t) => (
            <Link
              key={t.id}
              to={`/${t.id}`}
              className="group inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-gold/20 bg-gold/5 text-sm text-foreground/80 hover:border-gold/50 hover:text-gold hover:bg-gold/10 transition-all shrink-0"
            >
              <span className="text-base">{t.icon}</span>
              <span className="hidden sm:inline">{t.label}</span>
              <span className="sm:hidden font-medium">{t.short}</span>
            </Link>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
