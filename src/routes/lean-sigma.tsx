import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/portfolio/Reveal";
import { Nav } from "@/components/portfolio/Nav";

const capabilities = [
  { title: "DMAIC Methodology", desc: "Define, Measure, Analyse, Improve, Control — rigorous data-driven problem solving for complex banking processes." },
  { title: "Process Mapping & FMEA", desc: "Deep-dive process analysis and Failure Mode Effects Analysis to surface root causes and mitigate risks." },
  { title: "Statistical Analysis", desc: "Applying hypothesis testing, regression, and SPC to validate improvement initiatives and sustain gains." },
  { title: "Change Deployment", desc: "Leading cross-functional teams through transformation with structured governance and stakeholder alignment." },
];

export const Route = createFileRoute("/lean-sigma")({
  head: () => ({
    meta: [
      { title: "Lean Six Sigma — Neine Arora" },
      { name: "description", content: "Neine Arora's Lean Six Sigma Black Belt expertise — DMAIC, process mapping, FMEA, and statistical analysis for banking transformation." },
    ],
  }),
  component: LeanSigmaPage,
});

function LeanSigmaPage() {
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
              Lean <span className="italic gold-gradient-text">Six Sigma</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mb-16">
              Certified Lean Six Sigma Black Belt with a track record of delivering
              measurable operational excellence across Corporate Trust, Settlements, and Reconciliations.
            </p>
          </Reveal>

          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} delay={0.1 * i}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className="bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/40 transition-colors"
                >
                  <h3 className="font-display text-xl md:text-2xl mb-3">{c.title}</h3>
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
