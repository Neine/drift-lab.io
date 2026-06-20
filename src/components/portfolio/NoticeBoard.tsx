import { motion } from "motion/react";
import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";
import neineAsset from "@/assets/neine.jpg.asset.json";

const credentials = [
  { icon: "🏅", label: "Lean Six Sigma Black Belt" },
  { icon: "📋", label: "PMP® Certified" },
  { icon: "🤖", label: "Data Scientist" },
];

const navItems = [
  { id: "blog", label: "01 · Blog" },
  { id: "showcase", label: "02 · Showcase" },
  { id: "about", label: "03 · About" },
  { id: "contact", label: "04 · Contact" },
];

export function NoticeBoard() {
  return (
    <aside
      id="home"
      className="lg:fixed lg:top-0 lg:left-0 lg:h-screen lg:w-[22rem] xl:w-[26rem] lg:border-r border-border bg-navy-deep/60 backdrop-blur-md z-30 lg:overflow-y-auto"
    >
      {/* Subtle grid texture */}
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(80% 60% at 30% 20%, color-mix(in oklab, var(--gold) 12%, transparent), transparent 70%)",
        }}
      />

      <div className="relative h-full flex flex-col px-8 lg:px-10 py-10 lg:py-12">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-gold mb-8"
        >
          — Notice Board · 2026
        </motion.p>

        <motion.img
          src={neineAsset.url}
          alt="Neine Arora"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="size-24 lg:size-28 rounded-full object-cover border-2 border-gold/60 shadow-lg shadow-gold/20 mb-5"
        />

        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="text-3xl lg:text-4xl font-bold leading-[1.05] mb-2"
        >
          Neine <span className="gold-gradient-text italic">Arora</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="text-sm text-foreground/75 mb-5 leading-relaxed"
        >
          Vice President
          <span className="mx-2 text-gold">·</span>
          Business Transformation &amp; Program Management
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-[13px] text-foreground/65 italic font-display border-l-2 border-gold/40 pl-3 mb-6 leading-relaxed"
        >
          “Solving critical banking challenges through technology, innovation,
          and 13+ years of transformation expertise.”
        </motion.p>

        <div className="flex flex-wrap gap-1.5 mb-8">
          {credentials.map((c) => (
            <span
              key={c.label}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-gold/30 bg-gold/5 text-[11px] text-foreground/85"
            >
              <span>{c.icon}</span>
              <span>{c.label}</span>
            </span>
          ))}
        </div>

        {/* Nav links pinned to the board */}
        <nav className="border-t border-border pt-6 mb-6">
          <ul className="space-y-2">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link
                  to="/"
                  hash={n.id}
                  className="block text-sm tracking-wide text-foreground/70 hover:text-gold transition-colors"
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto pt-6 border-t border-border flex items-center gap-3">
          <a
            href="https://github.com/Neine"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="inline-flex items-center justify-center size-9 border border-foreground/25 text-foreground/80 hover:border-gold hover:text-gold transition-colors rounded-sm"
          >
            <Github className="size-4" />
          </a>
          <a
            href="https://linkedin.com/in/neine-arora"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="inline-flex items-center justify-center size-9 border border-foreground/25 text-foreground/80 hover:border-gold hover:text-gold transition-colors rounded-sm"
          >
            <Linkedin className="size-4" />
          </a>
          <a
            href="mailto:neine112arora@gmail.com"
            aria-label="Email"
            className="inline-flex items-center justify-center size-9 border border-foreground/25 text-foreground/80 hover:border-gold hover:text-gold transition-colors rounded-sm"
          >
            <Mail className="size-4" />
          </a>
          <Link
            to="/"
            hash="contact"
            className="ml-auto text-[11px] uppercase tracking-[0.2em] px-3 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground transition-colors rounded-sm"
          >
            Connect
          </Link>
        </div>
      </div>
    </aside>
  );
}
