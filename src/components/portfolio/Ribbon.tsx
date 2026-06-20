import { motion } from "motion/react";
import { Link } from "@tanstack/react-router";
import { BookOpen, Layers, User } from "lucide-react";

const ribbonItems = [
  {
    id: "blog",
    label: "Blog",
    subtitle: "Latest Insights",
    description: "Notes on AI, transformation & product thinking.",
    icon: BookOpen,
  },
  {
    id: "showcase",
    label: "Showcase",
    subtitle: "Projects & Work",
    description: "AI experiments, automation & analytics.",
    icon: Layers,
  },
  {
    id: "about",
    label: "About",
    subtitle: "Neine Arora",
    description: "VP, Business Transformation & Program Management.",
    icon: User,
  },
];

export function Ribbon() {
  return (
    <section className="relative px-6 pt-3 pb-2">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-3">
          <span className="hidden md:inline text-[9px] uppercase tracking-[0.4em] text-gold/80 shrink-0">
            Explore —
          </span>
          <div className="grid grid-cols-3 gap-2 flex-1">
            {ribbonItems.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 4 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: i * 0.04 }}
                >
                  <Link
                    to="/"
                    hash={item.id}
                    className="group flex items-center gap-2 bg-card/50 backdrop-blur-sm border border-border rounded-md px-3 py-1.5 hover:border-gold/50 hover:bg-card/80 transition-all"
                  >
                    <Icon className="size-3.5 text-gold shrink-0" />
                    <span className="text-xs font-medium tracking-wide group-hover:text-gold transition-colors truncate">
                      {item.label}
                    </span>
                    <span className="ml-auto text-gold/60 text-xs group-hover:translate-x-0.5 transition-transform">
                      →
                    </span>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
