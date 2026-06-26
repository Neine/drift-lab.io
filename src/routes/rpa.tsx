import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/portfolio/Reveal";
import { Nav } from "@/components/portfolio/Nav";

const capabilities = [
  { title: "UiPath & Blue Prism", desc: "Enterprise-grade bot development, orchestration, and credential management across distributed environments." },
  { title: "Process Discovery", desc: "Using process mining and task mining to identify the best automation candidates and measure ROI." },
  { title: "Intelligent Document Processing", desc: "Combining OCR, NLP, and ML to extract structured data from invoices, KYC docs, and contracts." },
  { title: "Hyperautomation", desc: "Integrating RPA with AI, low-code platforms, and APIs to build end-to-end automated workflows." },
];

export const Route = createFileRoute("/rpa")({
  head: () => ({
    meta: [
      { title: "RPA & Automation — Neine Arora" },
      { name: "description", content: "Neine Arora's RPA and intelligent automation expertise — UiPath, process discovery, IDP, and hyperautomation for banking." },
    ],
  }),
  component: RPAPage,
});

function RPAPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <section className="relative pt-24 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">Domain</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Robotic Process <span className="italic gold-gradient-text">Automation</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mb-16">
              Led firm-wide RPA implementation at Prudential plc and continues to scale
              intelligent automation across investment banking operations at Deutsche Bank.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={0.1 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/40 transition-colors"
                >
                  <h2 className="font-display text-xl md:text-2xl mb-3">{c.title}</h2>
                  <p className="text-foreground/70 text-sm leading-relaxed">{c.desc}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.5}>
            <div className="mt-16 flex flex-wrap gap-4">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 border border-foreground/30 text-foreground hover:border-gold hover:text-gold transition-colors rounded-sm"
              >
                ← Back to Portfolio
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
