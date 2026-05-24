import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/portfolio/Reveal";
import { Nav } from "@/components/portfolio/Nav";
import { TopicRibbon } from "@/components/portfolio/TopicRibbon";

const capabilities = [
  { title: "Agentic Automation", desc: "Building autonomous AI agents that handle static data processes end-to-end with minimal human intervention." },
  { title: "Predictive Analytics", desc: "Leveraging ML models to forecast operational risks, client behaviour, and process bottlenecks before they materialise." },
  { title: "Natural Language Processing", desc: "Extracting insights from unstructured documents, emails, and regulatory filings at scale." },
  { title: "GenAI Integration", desc: "Embedding LLMs into banking workflows for intelligent summarisation, code generation, and decision support." },
];

export const Route = createFileRoute("/ai")({
  head: () => ({
    meta: [
      { title: "AI & Machine Learning — Neine Arora" },
      { name: "description", content: "Neine Arora's expertise in AI/ML solutions for banking transformation — agentic automation, predictive analytics, NLP, and GenAI integration." },
    ],
  }),
  component: AIPage,
});

function AIPage() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <Nav />
      <TopicRibbon />
      <section className="relative pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">Domain</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Artificial <span className="italic gold-gradient-text">Intelligence</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mb-16">
              From classical machine learning to generative AI — applying intelligent automation
              and data-driven decisioning to transform banking operations at Deutsche Bank and beyond.
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
