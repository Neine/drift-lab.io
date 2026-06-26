import { useState, useMemo } from "react";
import { Reveal } from "./Reveal";

const posts = [
  {
    date: "Jun 2026",
    category: "Spacex Ipo",
    title: "SpaceX, AI Compute, and the Questions Still Open_Value Maximisation",
    excerpt:
      "SpaceX’s IPO Pitch: An AI Infrastructure Bet, Still Unproven SpaceX’s $75 billion IPO last week was the largest public offering on record, surpassing Saudi Aramco’s 2019 listing of $29.4 billion.…",
    readTime: "2 min read",
    url: "https://medium.com/@neine112arora/spacex-ai-compute-and-the-questions-still-open-value-maximisation-05fddf4f1733",
  },
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
  {
    date: "Jun 2026",
    category: "Prompt Engineering",
    title: "Your Prompt Was Vague. The Output Noticed.",
    excerpt:
      "Why AI output is only as good as the context you give it — and the five things worth including in every prompt.",
    readTime: "2 min read",
    url: "https://medium.com/@neine112arora/your-prompt-was-vague-the-output-noticed-0f72c55092cc",
  },
];

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

// Parses loose "Mon YYYY" strings (e.g. "Jun 2026") into a sortable number.
// Posts sharing the same month/year keep their original relative order
// (the sync script always prepends new posts, so array order is the
// tiebreaker for same-month entries).
function parseDateKey(dateStr: string): number {
  const match = dateStr.trim().toLowerCase().match(/([a-z]{3,})\s+(\d{4})/);
  if (!match) return 0;
  const monthIdx = MONTHS.indexOf(match[1].slice(0, 3));
  const year = parseInt(match[2], 10);
  if (monthIdx === -1 || Number.isNaN(year)) return 0;
  return year * 12 + monthIdx;
}

const VISIBLE_COUNT = 4;

export function Blog() {
  const [showAll, setShowAll] = useState(false);

  const sortedPosts = useMemo(() => {
    return posts
      .map((p, originalIndex) => ({ ...p, originalIndex }))
      .sort((a, b) => {
        const diff = parseDateKey(b.date) - parseDateKey(a.date);
        if (diff !== 0) return diff;
        return a.originalIndex - b.originalIndex; // stable: newest-prepended wins ties
      });
  }, []);

  const visiblePosts = showAll ? sortedPosts : sortedPosts.slice(0, VISIBLE_COUNT);
  const hasMore = sortedPosts.length > VISIBLE_COUNT;

  return (
    <section id="blog" className="relative px-6 pt-2 pb-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-4">
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
          <Reveal delay={0.1}>
            <p className="mt-2 text-xs text-foreground/50 max-w-xl">
              Reflections on transformation, AI, and delivering change at scale.
            </p>
          </Reveal>
        </div>
        
       <div className="flex flex-col divide-y divide-border">
  {visiblePosts.map((p, i) => (
    <Reveal key={p.title} delay={i * 0.04}>
      <a
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

{hasMore && (
  <div className="flex justify-center mt-6">
    <button
      onClick={() => setShowAll((prev) => !prev)}
      className="text-[10px] uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors border border-border hover:border-gold/40 rounded-full px-5 py-2"
    >
      {showAll ? "Show less" : `Show all (${sortedPosts.length})`}
    </button>
  </div>
)}
      </div>
    </section>
  );
}
