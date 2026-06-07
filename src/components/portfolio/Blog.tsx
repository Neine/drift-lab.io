import { Reveal } from "./Reveal";

const posts = [
  {
    date: "Jun 2026",
    category: "AI & Automation",
    title: "The Rise of Agentic AI in Corporate Banking",
    excerpt:
      "How autonomous AI agents are reshaping high-volume financial operations — from SEPA payments to bank guarantees.",
    readTime: "6 min read",
  },
  {
    date: "May 2026",
    category: "Transformation",
    title: "From RPA to Intelligent Automation: A Practitioner's View",
    excerpt:
      "Lessons learned scaling automation programs from 30 processes to enterprise-wide adoption across global banks.",
    readTime: "8 min read",
  },
  {
    date: "Apr 2026",
    category: "Leadership",
    title: "Leading Transformation in Regulated Industries",
    excerpt:
      "Balancing innovation, governance, and delivery in environments where compliance is non-negotiable.",
    readTime: "5 min read",
  },
];

export function Blog() {
  return (
    <section id="blog" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 02 / Blog
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
            Notes & <span className="italic gold-gradient-text">Insights</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-foreground/60 mb-16 max-w-2xl">
            Reflections on transformation, AI, and the craft of delivering change at scale.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <article className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5 flex flex-col cursor-pointer">
                <div className="flex items-center gap-3 mb-4 text-xs uppercase tracking-[0.2em]">
                  <span className="text-gold/80">{p.category}</span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-foreground/50">{p.date}</span>
                </div>
                <h3 className="font-display text-2xl mb-3 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-foreground/70 leading-relaxed mb-5 flex-1">
                  {p.excerpt}
                </p>
                <div className="border-t border-border pt-4 flex items-center justify-between">
                  <span className="text-xs text-foreground/50">{p.readTime}</span>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold group-hover:translate-x-1 transition-transform">
                    Read →
                  </span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
