import { motion } from "motion/react";
import { Reveal } from "./Reveal";
import { Experience } from "./Experience";

const skills = [
  "Program Management",
  "Lean Six Sigma",
  "RPA & Automation",
  "AI/ML Solutions",
  "Process Mining",
  "Agile Methodology",
  "Data Science",
  "FMEA",
  "Process Mapping",
  "Python",
  "Tableau",
  "Google Looker",
];

const stats = [
  { v: "13+", l: "Years Experience" },
  { v: "6", l: "Global Firms" },
  { v: "3", l: "Certifications" },
];

export function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 04 / About &amp; Experience
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-12 max-w-3xl">
            Transforming Banking,{" "}
            <span className="italic gold-gradient-text">One Process</span> at a Time
          </h2>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-12">
          <Reveal delay={0.2} className="md:col-span-3">
            <p className="text-lg text-foreground/75 leading-relaxed mb-6">
              Senior Business Excellence &amp; Transformation professional with
              over <span className="text-gold">13 years of experience</span>{" "}
              across Banking, Insurance, and Consulting. Certified Lean Six
              Sigma Black Belt, PMP®, and Data Scientist — passionate about
              applying technology and innovation to solve critical industry
              challenges.
            </p>
            <p className="text-lg text-foreground/75 leading-relaxed">
              Specialised in RPA, AI/ML, process mining, and agile delivery at
              scale.
            </p>

            <div className="mt-10">
              <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-4">
                Languages
              </p>
              <div className="flex gap-6 text-sm">
                <div>
                  <span className="text-foreground">English</span>
                  <span className="text-foreground/50 ml-2">Full Professional</span>
                </div>
                <div>
                  <span className="text-foreground">Hindi</span>
                  <span className="text-foreground/50 ml-2">Native</span>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.3} className="md:col-span-2">
            <div className="grid grid-cols-3 gap-4 mb-8">
              {stats.map((s) => (
                <div
                  key={s.l}
                  className="border-l-2 border-gold/40 pl-3 py-1"
                >
                  <div className="font-display text-3xl text-gold">{s.v}</div>
                  <div className="text-xs text-foreground/60 mt-1">{s.l}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.4}>
          <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mt-16 mb-5">
            Expertise
          </p>
          <div className="flex flex-wrap gap-2.5">
            {skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.03 }}
                className="px-4 py-2 rounded-full bg-card border border-border text-sm text-foreground/85 hover:border-gold hover:text-gold transition-colors cursor-default"
              >
                {s}
              </motion.span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
