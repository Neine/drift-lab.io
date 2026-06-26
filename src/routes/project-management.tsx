import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Reveal } from "@/components/portfolio/Reveal";
import { Nav } from "@/components/portfolio/Nav";

const capabilities = [
  { title: "PMP® Certified Delivery", desc: "End-to-end program governance, stakeholder management, and delivery assurance for large-scale banking initiatives." },
  { title: "Agile at Scale", desc: "Blending Scrum, Kanban, and SAFe principles to accelerate delivery while maintaining regulatory rigour." },
  { title: "Business Case & IG", desc: "Building robust investment cases, obtaining Investment Committee approval, and tracking value realisation." },
  { title: "Cross-Border Teams", desc: "Leading distributed teams across London, Frankfurt, Bangalore, and Singapore with seamless collaboration." },
];

export const Route = createFileRoute("/project-management")({
  head: () => ({
    meta: [
      { title: "Project Management — Neine Arora" },
      { name: "description", content: "Neine Arora's project and program management expertise — PMP certified, agile delivery, business case development, and global team leadership." },
      { property: "og:title", content: "Project Management — Neine Arora" },
      { property: "og:description", content: "PMP®-certified program leadership, agile delivery at scale, business case development, and global team execution." },
      { property: "og:url", content: "https://drift-lab.io/project-management" },
    ],
    links: [{ rel: "canonical", href: "https://drift-lab.io/project-management" }],
  }),
  component: PMPage,
});

function PMPage() {
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
              Project <span className="italic gold-gradient-text">Management</span>
            </h1>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-lg md:text-xl text-foreground/70 leading-relaxed max-w-3xl mb-16">
              PMP® certified program leader driving front-to-back transformation across
              Investment Banking and Corporate Banking with disciplined governance and agile execution.
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
