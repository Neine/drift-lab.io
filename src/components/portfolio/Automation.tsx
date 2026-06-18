import { useState, useCallback } from "react";
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
  desc: string;
  impact: string;
  tags: string[];
  href: string;
  image?: string;
}

const items: ProjectItem[] = [
  {
    title: "RAG-Agent",
    category: "Generative AI",
    desc: "Built a Retrieval-Augmented Generation agent that reads policy documents and answers customer queries grounded in the source material, reducing hallucination and improving response accuracy.",
    impact: "Accurate, source-grounded Q&A",
    tags: ["Python", "RAG", "LLM", "Agentic AI"],
    href: "https://github.com/Neine/RAG-Agent",
    image: ragAgentImg.url,
  },
  {
    title: "Bike Sharing Demand",
    category: "Linear Regression",
    desc: "Built a multiple linear regression model to predict shared-bike demand for an American provider, identifying the key variables that drive ridership post-pandemic.",
    impact: "R² ~ 0.83 on test set",
    tags: ["Python", "Linear Regression", "EDA"],
    href: "https://github.com/Neine/Bike-Sharing",
  },
  {
    title: "Telecom Churn",
    category: "Logistic Regression",
    desc: "Developed a logistic regression model to predict high-value customer churn for a telecom operator and recommended retention levers from the top predictors.",
    impact: "Reduced churn risk on top decile",
    tags: ["Python", "Logistic Regression", "Classification"],
    href: "https://github.com/Neine/Telecom_Churn",
  },
];

export function Automation() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const imageItems = items.filter((p) => p.image);
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
    <section id="automation" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 03 / AI Project Showcase
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
            Artificial <span className="italic gold-gradient-text">Intelligence</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-foreground/60 mb-16 max-w-2xl">
            A dedicated space highlighting automation initiatives and demos.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.05}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block h-full"
              >
                <article className="group h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5 flex flex-col">
                  {p.image && (
                    <div
                      className="relative w-full h-40 rounded-md mb-4 border border-border overflow-hidden cursor-zoom-in"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        const idx = imageItems.findIndex(
                          (img) => img.title === p.title
                        );
                        setOpenIndex(idx);
                      }}
                    >
                      <img
                        src={p.image}
                        alt={`${p.title} preview`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity drop-shadow-lg" />
                      </div>
                    </div>
                  )}
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
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t) => (
                      <span
                        key={t}
                        className="text-xs px-3 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="text-xs uppercase tracking-[0.2em] text-gold/80 group-hover:text-gold transition-colors">
                    View on GitHub →
                  </span>
                </article>
              </a>
            </Reveal>
          ))}
        </div>
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
