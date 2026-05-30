import { motion } from "motion/react";
import { Github } from "lucide-react";

const credentials = [
  { icon: "🏅", label: "Lean Six Sigma Black Belt" },
  { icon: "📋", label: "PMP® Certified" },
  { icon: "🤖", label: "Data Scientist" },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 grid-bg opacity-60" />
      <motion.div
        aria-hidden
        className="absolute inset-0 grid-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 8, repeat: Infinity }}
        style={{ backgroundSize: "112px 112px" }}
      />
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 70% 30%, color-mix(in oklab, var(--gold) 18%, transparent), transparent 70%)",
        }}
      />
      {/* Floating dots */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.span
            key={i}
            className="absolute size-1 rounded-full bg-gold/40"
            style={{ left: `${(i * 53) % 100}%`, top: `${(i * 37) % 100}%` }}
            animate={{ opacity: [0.2, 0.8, 0.2], scale: [1, 1.6, 1] }}
            transition={{
              duration: 3 + (i % 4),
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-6xl mx-auto px-6 w-full">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs md:text-sm uppercase tracking-[0.35em] text-gold mb-6"
        >
          — Portfolio · 2026
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[1.05] mb-6"
        >
          Neine <span className="gold-gradient-text italic">Arora</span>
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="font-sans not-italic text-base md:text-lg text-foreground/80 mb-8 tracking-wide"
        >
          Vice President
          <span className="mx-3 text-gold">·</span>
          Business Transformation &amp; Program Management
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="max-w-2xl text-lg md:text-xl text-foreground/70 italic font-display mb-10 leading-relaxed"
        >
          “Solving critical banking challenges through technology, innovation,
          and 13+ years of transformation expertise.”
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="flex flex-wrap gap-3 mb-12"
        >
          {credentials.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gold/30 bg-gold/5 text-sm text-foreground/90"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#experience"
            className="group inline-flex items-center gap-2 px-7 py-3.5 bg-gold text-primary-foreground font-medium rounded-sm hover:bg-gold-soft transition-colors"
          >
            View My Work
            <span className="transition-transform group-hover:translate-x-1">→</span>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-foreground/30 text-foreground hover:border-gold hover:text-gold transition-colors rounded-sm"
          >
            Get In Touch
          </a>
          <a
            href="https://github.com/Neine"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center size-[50px] border border-foreground/30 text-foreground hover:border-gold hover:text-gold transition-colors rounded-sm"
          >
            <Github className="size-5" />
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-foreground/40 text-xs tracking-[0.3em] uppercase"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Scroll
      </motion.div>
    </section>
  );
}
