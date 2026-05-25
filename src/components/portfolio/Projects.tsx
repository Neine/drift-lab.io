import { Reveal } from "./Reveal";

const projects = [
  {
    title: "Cash Telemetry Platform",
    category: "Data & Analytics",
    desc: "Built a real-time cash visibility platform using Google Looker, enabling treasury teams to monitor liquidity positions across global entities.",
    impact: "40% faster reconciliation",
    tags: ["Google Looker", "Data Industrialisation", "Treasury"],
  },
  {
    title: "Agentic Automation for Static Processes",
    category: "AI & Automation",
    desc: "Architected, designed, and deployed advanced Agentic AI workflows to automate high-volume, repetitive financial operations across multiple Corporate Banking (CB) divisions. By implementing autonomous, goal-oriented AI agents, the project successfully converted manual processes into scalable, intelligent workflows—specifically targetting SEPA payments, Bank Guarantees, and Collections processes.",
    impact: "60% manual effort reduction",
    tags: ["Agentic AI", "LLM", "Process Automation"],
  },
  {
    title: "Firm-wide RPA Rollout",
    category: "Robotic Process Automation",
    desc: "Led enterprise RPA program at Prudential plc — discovery, governance, and scaled deployment across 30+ processes.",
    impact: "£2M+ annual savings",
    tags: ["UiPath", "RPA", "Governance"],
  },
  {
    title: "Architected, designed, and deployed advanced Agentic AI workflows to automate high-volume, repetitive financial operations across multiple Corporate Banking (CB) divisions. By implementing autonomous, goal-oriented AI agents, the project successfully converted manual processes into scalable, intelligent workflows—specifically targetting SEPA payments in Cash, Bank Guarantees, and Collections processes in Trade Finance.",
    category: "AI & Automation",
    desc: "Data Industrialisation",
    impact: "Strategic Scale",
    tags: ["Agentic AI", "Corporate Banking", "Trade Finance"],
  },
  {
    title: "Customer Retention Model",
    category: "Analytics",
    desc: "Developed predictive retention framework at Groupon using R and Tableau, identifying high-churn cohorts and intervention triggers.",
    impact: "+15% retention lift",
    tags: ["R", "Tableau", "Predictive Modeling"],
  },
  {
    title: "Data Centralisation",
    category: "Platform Transformation",
    desc: "Spearheading platform simplification initiative at Deutsche Bank — consolidating data pipelines for same-day finance reporting.",
    impact: "T+1 → T0 close",
    tags: ["Data Platform", "Finance", "Simplification"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 03 / Projects
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
            Signature <span className="italic gold-gradient-text">Projects</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-foreground/60 mb-16 max-w-2xl">
            A curated selection of transformation initiatives delivered across banking, insurance and analytics.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5 flex flex-col">
                <p className="text-xs uppercase tracking-[0.2em] text-gold/80 mb-3">
                  {p.category}
                </p>
                <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5 flex-1">
                  {p.desc}
                </p>
                <div className="border-t border-border pt-4 mb-4">
                  <p className="text-sm">
                    <span className="text-foreground/50">Impact: </span>
                    <span className="text-gold font-medium">{p.impact}</span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
