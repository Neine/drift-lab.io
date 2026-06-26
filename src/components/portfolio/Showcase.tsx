import { useState, useCallback, useMemo } from "react";
import { Reveal } from "./Reveal";
import ragAgentImg from "@/assets/RAG_Agent_Snip2.png.asset.json";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

interface ProjectItem {
  title: string;
  category: string;
  date: string;
  desc: string;
  impact: string;
  tags: string[];
  href?: string;
  image?: string;
}

const aiProjects: ProjectItem[] = [
  {
    title: "SalesAgent",
    category: "Multi-Agent Systems",
    date: "Jun 2026",
    desc: "A multi-agent sales workflow where specialized agents draft competing cold emails, a picker agent selects the best one, and the result is handed off to an execution agent for sending.",
    impact: "Multi-agent orchestration & handoff patterns",
    tags: ["Python", "OpenAI Agents SDK", "Multi-Agent", "SendGrid"],
    href: "https://github.com/Neine/Agent_Verse/tree/main/SalesAgent",
  },
  {
    title: "Askmycv",
    category: "Conversational AI",
    date: "Jun 2026",
    desc: "A personal AI agent that answers career questions on a website visitor's behalf, grounded in the user's CV and LinkedIn profile, with automated lead capture when a visitor shares contact details.",
    impact: "Automated visitor engagement & lead capture",
    tags: ["Python", "OpenAI Agents SDK", "RAG", "Gradio"],
    href: "https://github.com/Neine/Agent_Verse/tree/main/Askmycv",
  },
  {
    title: "RAG-Agent",
    category: "Generative AI",
    date: "May 2026",
    desc: "Built a Retrieval-Augmented Generation agent that reads policy documents and answers customer queries grounded in the source material, reducing hallucination and improving response accuracy.",
    impact: "Accurate, source-grounded Q&A",
    tags: ["Python", "RAG", "LLM", "Agentic AI"],
    href: "https://github.com/Neine/RAG-Agent",
    image: ragAgentImg.url,
  },
  {
    title: "Telecom Churn",
    category: "Logistic Regression",
    date: "Mar 2026",
    desc: "Developed a logistic regression model to predict high-value customer churn for a telecom operator and recommended retention levers from the top predictors.",
    impact: "Reduced churn risk on top decile",
    tags: ["Python", "Logistic Regression", "Classification"],
    href: "https://github.com/Neine/Telecom_Churn",
  },
  {
    title: "Bike Sharing Demand",
    category: "Linear Regression",
    date: "Jan 2026",
    desc: "Built a multiple linear regression model to predict shared-bike demand for an American provider, identifying the key variables that drive ridership post-pandemic.",
    impact: "R² ~ 0.83 on test set",
    tags: ["Python", "Linear Regression", "EDA"],
    href: "https://github.com/Neine/Bike-Sharing",
  },
];

const otherProjects: ProjectItem[] = [
  {
    title: "Conversational Analytics",
    category: "Data & Analytics",
    date: "Apr 2026",
    desc: "Built a real-time cash visibility platform using Google Looker, enabling middle office teams to monitor metrics across global entities. The Data agent grounded in the Looker semantic modeling layer, so it answers governed, trusted natural-language questions rather than freeform SQL guesses.",
    impact: "40% faster reconciliation",
    tags: ["Google Looker", "Data Industrialisation", "Conversational AI"],
  },
  {
    title: "Agentic Automation for Static Processes",
    category: "AI & Automation",
    date: "Jan 2026",
    desc: "Architected, designed, and deployed advanced Agentic AI workflows to automate high-volume, repetitive financial operations across multiple Corporate Banking (CB) divisions—targeting SEPA payments, Bank Guarantees, and Collections processes.",
    impact: "60% manual effort reduction",
    tags: ["Agentic AI", "LLM", "Process Automation"],
  },
  {
    title: "Fixed Income Rates Platform Transformation",
    category: "Platform Transformation",
    date: "Sep 2025",
    desc: "Led the end-to-end replacement of a legacy settlement system for the Fixed Income Rates product line. Unified data alignment across the trade lifecycle—from execution through clearing and compliance.",
    impact: "T+1 → T0 close",
    tags: ["Data Platform", "Finance", "Simplification"],
  },
  {
    title: "SSI Automated Broadcast Solution",
    category: "Operational Efficiency",
    date: "Feb 2025",
    desc: "Designed and implemented an automated solution to streamline Standard Settlement Instruction (SSI) management — a single, centralized repository auto-capturing client onboarding data and broadcasting validated SSI downstream to multiple settlement systems.",
    impact: "Strategic Scale",
    tags: ["Agentic AI", "Corporate Banking", "Trade Finance"],
  },
  {
    title: "Firm-wide RPA Rollout",
    category: "Robotic Process Automation",
    date: "Jun 2022",
    desc: "Led enterprise RPA program at Prudential plc — discovery, governance, and scaled deployment across 30+ processes.",
    impact: "£2M+ annual savings",
    tags: ["UiPath", "RPA", "Governance"],
  },
  {
    title: "Customer Retention Model",
    category: "Analytics",
    date: "Mar 2019",
    desc: "Developed predictive retention framework at Groupon using R and Tableau, identifying high-churn cohorts and intervention triggers.",
    impact: "+15% retention lift",
    tags: ["R", "Tableau", "Predictive Modeling"],
  },
];

const MONTHS = [
  "jan", "feb", "mar", "apr", "may", "jun",
  "jul", "aug", "sep", "oct", "nov", "dec",
];

// Parses loose "Mon YYYY" strings (e.g. "Jun 2026") into a sortable number,
// for newest-first ordering. Mirrors the same helper used in Blog.tsx.
function parseDateKey(dateStr: string): number {
  const match = dateStr.trim().toLowerCase().match(/([a-z]{3,})\s+(\d{4})/);
  if (!match) return 0;
  const monthIdx = MONTHS.indexOf(match[1].slice(0, 3));
  const year = parseInt(match[2], 10);
  if (monthIdx === -1 || Number.isNaN(year)) return 0;
  return year * 12 + monthIdx;
}

function sortByDateDesc(items: ProjectItem[]): ProjectItem[] {
  return items
    .map((p, originalIndex) => ({ ...p, originalIndex }))
    .sort((a, b) => {
      const diff = parseDateKey(b.date) - parseDateKey(a.date);
      if (diff !== 0) return diff;
      return a.originalIndex - b.originalIndex;
    });
}

const VISIBLE_COUNT = 4;

function ProjectRow({
  p,
  onImageClick,
}: {
  p: ProjectItem;
  onImageClick?: () => void;
}) {
  const rowContent = (
    <>
      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] md:w-44 shrink-0">
        <span className="text-gold/80">{p.category}</span>
        <span className="text-foreground/30">•</span>
        <span className="text-foreground/50">{p.date}</span>
      </div>

      <div className="flex-1">
        <h3 className="font-display text-lg leading-snug mb-1 group-hover:text-gold transition-colors">
          {p.title}
        </h3>
        <p className="text-sm text-foreground/60 leading-relaxed line-clamp-3 max-w-2xl mb-2">
          {p.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {p.tags.map((t) => (
            <span
              key={t}
              className="text-[10px] px-2 py-0.5 rounded-sm bg-gold/10 text-gold border border-gold/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-col items-start md:items-end gap-2 md:w-44 shrink-0">
        <p className="text-xs text-right">
          <span className="text-foreground/50">Impact: </span>
          <span className="text-gold font-medium">{p.impact}</span>
        </p>
        {p.href && (
          <span className="text-[10px] uppercase tracking-[0.15em] text-gold/80 group-hover:text-gold group-hover:translate-x-0.5 transition-all">
            View on GitHub →
          </span>
        )}
      </div>

      {p.image && (
        <div
          className="relative w-full md:w-28 h-20 rounded-md border border-border overflow-hidden cursor-zoom-in shrink-0 order-last"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onImageClick?.();
          }}
        >
          <img
            src={p.image}
            alt={`${p.title} preview`}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <ZoomIn className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
          </div>
        </div>
      )}
    </>
  );

  const rowClasses =
    "group flex flex-col md:flex-row md:items-center gap-3 md:gap-6 py-5 hover:bg-card/40 transition-all px-2 -mx-2 rounded-md";

  if (p.href) {
    return (
      <a
        href={p.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${rowClasses} cursor-pointer`}
      >
        {rowContent}
      </a>
    );
  }
  return <div className={rowClasses}>{rowContent}</div>;
}

export function Showcase() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAllAi, setShowAllAi] = useState(false);
  const [showAllOther, setShowAllOther] = useState(false);

  const sortedAiProjects = useMemo(() => sortByDateDesc(aiProjects), []);
  const sortedOtherProjects = useMemo(() => sortByDateDesc(otherProjects), []);

  const visibleAiProjects = showAllAi
    ? sortedAiProjects
    : sortedAiProjects.slice(0, VISIBLE_COUNT);
  const visibleOtherProjects = showAllOther
    ? sortedOtherProjects
    : sortedOtherProjects.slice(0, VISIBLE_COUNT);

  const hasMoreAi = sortedAiProjects.length > VISIBLE_COUNT;
  const hasMoreOther = sortedOtherProjects.length > VISIBLE_COUNT;

  // Lightbox only ever needs to cycle through images that are actually
  // visible on screen right now (respecting the show-more toggle).
  const imageItems = visibleAiProjects.filter((p) => p.image);
  const currentImageItem = openIndex !== null ? imageItems[openIndex] : null;

  const handlePrev = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex(openIndex === 0 ? imageItems.length - 1 : openIndex - 1);
  }, [openIndex, imageItems.length]);

  const handleNext = useCallback(() => {
    if (openIndex === null) return;
    setOpenIndex(openIndex === imageItems.length - 1 ? 0 : openIndex + 1);
  }, [openIndex, imageItems.length]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    },
    [handlePrev, handleNext]
  );

  return (
    <section id="showcase" className="relative py-24 lg:py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 02 / Showcase
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-3xl">
            Projects &amp;{" "}
            <span className="italic gold-gradient-text">Experiments</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-foreground/60 mb-12 max-w-2xl">
            AI experiments alongside transformation projects delivered across
            banking, insurance and analytics.
          </p>
        </Reveal>

        {/* AI Projects */}
        <Reveal>
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            <span className="text-gold">AI</span> Projects
          </h3>
        </Reveal>
        <div className="flex flex-col divide-y divide-border">
          {visibleAiProjects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <ProjectRow
                p={p}
                onImageClick={() => {
                  const idx = imageItems.findIndex(
                    (img) => img.title === p.title
                  );
                  if (idx >= 0) setOpenIndex(idx);
                }}
              />
            </Reveal>
          ))}
        </div>
        {hasMoreAi && (
          <div className="flex justify-center mt-6 mb-16">
            <button
              onClick={() => setShowAllAi((prev) => !prev)}
              className="text-[10px] uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors border border-border hover:border-gold/40 rounded-full px-5 py-2"
            >
              {showAllAi ? "Show less" : `Show all (${sortedAiProjects.length})`}
            </button>
          </div>
        )}
        {!hasMoreAi && <div className="mb-16" />}

        {/* Other Projects */}
        <Reveal>
          <h3 className="font-display text-2xl md:text-3xl mb-4">
            Other <span className="text-gold">Projects Implemented</span>
          </h3>
        </Reveal>
        <div className="flex flex-col divide-y divide-border">
          {visibleOtherProjects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.04}>
              <ProjectRow p={p} />
            </Reveal>
          ))}
        </div>
        {hasMoreOther && (
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setShowAllOther((prev) => !prev)}
              className="text-[10px] uppercase tracking-[0.2em] text-gold/80 hover:text-gold transition-colors border border-border hover:border-gold/40 rounded-full px-5 py-2"
            >
              {showAllOther ? "Show less" : `Show all (${sortedOtherProjects.length})`}
            </button>
          </div>
        )}
      </div>

      <Dialog
        open={openIndex !== null}
        onOpenChange={(open) => {
          if (!open) setOpenIndex(null);
        }}
      >
        <DialogContent
          className="max-w-5xl w-[95vw] p-0 border-0 bg-transparent shadow-none"
          onKeyDown={handleKeyDown}
        >
          <DialogTitle className="sr-only">
            {currentImageItem?.title ?? "Project preview"}
          </DialogTitle>
          <div className="relative flex items-center justify-center">
            {imageItems.length > 1 && (
              <button
                onClick={handlePrev}
                className="absolute left-2 md:left-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}
            {currentImageItem?.image && (
              <img
                src={currentImageItem.image}
                alt={`${currentImageItem.title} full preview`}
                className="max-h-[80vh] w-auto rounded-lg border border-border shadow-2xl"
              />
            )}
            {imageItems.length > 1 && (
              <button
                onClick={handleNext}
                className="absolute right-2 md:right-4 z-10 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors backdrop-blur-sm"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
          {currentImageItem && (
            <div className="text-center mt-3">
              <p className="text-sm text-foreground/80 font-medium">
                {currentImageItem.title}
              </p>
              {imageItems.length > 1 && (
                <p className="text-xs text-foreground/50 mt-1">
                  {openIndex !== null ? openIndex + 1 : 0} / {imageItems.length}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
