import { Reveal } from "./Reveal";

const posts = [
  {
    date: "Jun 2026",
    category: "Product & ML",
    title: "The Product Layer Most ML Teams Skip",
    excerpt:
      "Most machine learning projects are technically impressive — but the ones that ship value are the ones shaped by strong product thinking.",
    readTime: "3 min read",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7468171124846002176/",
  },
  {
    date: "Jun 2026",
    category: "Responsible AI",
    title: "Trust by Design: A Note on Responsible AI",
    excerpt:
      "Notes on building AI systems that are trustworthy, transparent, and accountable by design — not as an afterthought.",
    readTime: "3 min read",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7468198356016594945/",
  },
  {
    date: "Jun 2026",
    category: "Digital Banking",
    title: "The Quiet Reinvention of Digital Banking",
    excerpt:
      "Reflections on how digital banking continues to reshape customer experience, operations, and the role of automation.",
    readTime: "3 min read",
    url: "https://www.linkedin.com/feed/update/urn:li:activity:7468688931731976193/",
  },
];

export function Blog() {
  return (
    <section id="blog" className="relative px-6 pt-2 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-4">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
                — 01 / Blog
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="text-2xl md:text-3xl font-bold">
                Notes & <span className="italic gold-gradient-text">Insights</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <p className="hidden md:block text-xs text-foreground/50 max-w-xs text-right">
              Reflections on transformation, AI, and delivering change at scale.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {posts.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-4 hover:border-gold/50 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/5 flex flex-col cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2 text-[10px] uppercase tracking-[0.2em]">
                  <span className="text-gold/80">{p.category}</span>
                  <span className="text-foreground/30">•</span>
                  <span className="text-foreground/50">{p.date}</span>
                </div>
                <h3 className="font-display text-lg leading-snug mb-2 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed mb-3 flex-1 line-clamp-2">
                  {p.excerpt}
                </p>
                <div className="border-t border-border pt-2 flex items-center justify-between">
                  <span className="text-[10px] text-foreground/40">{p.readTime}</span>
                  <span className="text-[10px] uppercase tracking-[0.15em] text-gold/80 group-hover:text-gold group-hover:translate-x-0.5 transition-all">
                    Read →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
