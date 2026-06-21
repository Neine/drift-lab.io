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
        
       <div className="flex flex-col divide-y divide-border">
  {posts.map((p, i) => (
    <Reveal key={p.title} delay={i * 0.04}>
      
        href={p.url}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex flex-col md:flex-row md:items-center gap-2 md:gap-6 py-5 hover:bg-card/40 transition-all px-2 -mx-2 rounded-md cursor-pointer"
      >
        <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] md:w-40 shrink-0">
          <span className="text-gold/80">{p.category}</span>
          <span className="text-foreground/30">•</span>
          <span className="text-foreground/50">{p.date}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-display text-lg leading-snug mb-1 group-hover:text-gold transition-colors">
            {p.title}
          </h3>
          <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3 max-w-2xl">
            {p.excerpt}
          </p>
        </div>
        <div className="flex items-center gap-3 md:w-32 md:justify-end shrink-0">
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
