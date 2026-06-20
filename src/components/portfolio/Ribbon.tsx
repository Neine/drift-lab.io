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
    <section className="relative px-6 pt-28 pb-12 lg:pt-32">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-[10px] uppercase tracking-[0.4em] text-gold mb-6"
        >
          — Explore
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {ribbonItems.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Link
                  to="/"
                  hash={item.id}
                  className="group block h-full bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="inline-flex items-center justify-center size-10 border border-gold/30 bg-gold/5 rounded-sm text-gold">
                      <Icon className="size-5" />
                    </div>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gold/70 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/50 mb-1">
                    {item.subtitle}
                  </p>
                  <h3 className="text-lg font-display font-semibold mb-1 group-hover:text-gold transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-sm text-foreground/65 leading-relaxed">
                    {item.description}
                  </p>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
