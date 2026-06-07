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
              <a
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5 flex flex-col cursor-pointer"
              >
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
                    Read on LinkedIn →
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
