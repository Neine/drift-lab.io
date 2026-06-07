import { Reveal } from "./Reveal";

const items = [
  {
    title: "Front to Back Ops Transformation",
    org: "Deutsche Bank",
    role: "VP",
    period: "Mar 2025 – Present",
    desc: "Spearheading IB & CB finance transformation: platform simplification, T0 data industrialisation, agentic automation for static processes, Cash Telemetry via Google Looker.",
    tags: ["Agentic Automation", "Google Looker", "Data Industrialisation"],
  },
  {
    title: "CB & IB Transformation",
    org: "Deutsche Bank",
    role: "AVP",
    period: "Oct 2021 – Mar 2025",
    desc: "Led end-to-end change lifecycle for Agency Securities Lending, Loans, Fund Services — process discovery, business case creation, IG ask, and implementation.",
    tags: ["Process Discovery", "Program Management", "Change Management"],
  },
  {
    title: "Business Transformation",
    org: "EY",
    role: "Consultant",
    period: "Feb 2020 – Oct 2021",
    desc: "Consulting-led transformation engagements; Agile Bronze certified during tenure.",
    tags: ["Consulting", "Agile", "Process Reengineering"],
  },
  {
    title: "Customer Retention Framework",
    org: "Groupon",
    role: "Analyst",
    period: "Feb 2019 – Jan 2020",
    desc: "Built customer retention model using R programming and Tableau dashboards.",
    tags: ["R Programming", "Tableau", "Analytics"],
  },
  {
    title: "RPA at Scale",
    org: "Prudential plc",
    role: "Lead",
    period: "Nov 2016 – Dec 2018",
    desc: "Led firm-wide RPA implementation, email analytics and intelligent automation rollout.",
    tags: ["RPA", "UiPath", "Intelligent Automation"],
  },
  {
    title: "Lean Sigma Black Belt Projects",
    org: "BNY Mellon",
    role: "Black Belt",
    period: "May 2015 – Oct 2016",
    desc: "Drove Lean Sigma projects across Corporate Trust, Settlements & Reconciliations. Conceptualised and built the internal 'Pyramid' tool.",
    tags: ["Lean Six Sigma", "Black Belt", "Process Excellence"],
  },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6 bg-navy-elevated/30">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 04 / Experience
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold mb-4 max-w-3xl">
            Selected <span className="italic gold-gradient-text">Projects</span> &amp; Roles
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-foreground/60 mb-16 max-w-2xl">
            A timeline of transformation work across global banking, insurance and consulting.
          </p>
        </Reveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gold/40 to-transparent" />

          <div className="space-y-12">
            {items.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div
                  className={`relative flex items-start gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Node */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 mt-6 z-10">
                    <div className="size-3 rounded-full bg-gold ring-4 ring-navy-deep" />
                  </div>

                  {/* Spacer for desktop */}
                  <div className="hidden md:block md:flex-1" />

                  {/* Card */}
                  <div className="flex-1 ml-12 md:ml-0">
                    <article className="group bg-card/60 backdrop-blur-sm border border-border rounded-lg p-6 md:p-7 hover:border-gold/50 transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-gold/5">
                      <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
                        <span className="text-gold text-sm font-medium">{item.org}</span>
                        <span className="text-xs uppercase tracking-wider text-foreground/50">
                          {item.role} · {item.period}
                        </span>
                      </div>
                      <h3 className="font-display text-2xl md:text-3xl mb-3 group-hover:text-gold transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-foreground/70 leading-relaxed mb-5">
                        {item.desc}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {item.tags.map((t) => (
                          <span
                            key={t}
                            className="text-xs px-3 py-1 rounded-sm bg-gold/10 text-gold border border-gold/20"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </article>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
