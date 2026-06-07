import { Reveal } from "./Reveal";

const items = [
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
  return (
    <section id="automation" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 03 / AI Projects Showcase
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
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
