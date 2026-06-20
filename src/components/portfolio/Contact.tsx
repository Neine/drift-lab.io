import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { Reveal } from "./Reveal";

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:neine112arora@gmail.com?subject=${subject}&body=${body}`;
    toast.success("Opening your email client…");
  };

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.35em] text-gold mb-4">
            — 04 / Contact
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="text-2xl md:text-3xl font-bold mb-4 max-w-3xl leading-tight">
            Let's Build Something{" "}
            <span className="italic gold-gradient-text">Transformative</span>
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="text-lg text-foreground/65 mb-16 max-w-2xl">
            Open to strategic collaboration, speaking engagements, and advisory opportunities.
          </p>
        </Reveal>

        <div className="grid md:grid-cols-5 gap-12">
          <Reveal delay={0.2} className="md:col-span-3">
            <form onSubmit={onSubmit} className="space-y-5">
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Name
                </label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-foreground/30 transition-colors"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Email
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-foreground/30 transition-colors"
                  placeholder="you@company.com"
                />
              </div>
              <div>
                <label className="block text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground placeholder:text-foreground/30 resize-none transition-colors"
                  placeholder="Tell me about your project or opportunity…"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center gap-3 mt-4 px-7 py-3.5 bg-gold text-primary-foreground font-medium rounded-sm hover:bg-gold-soft transition-colors"
              >
                Send Message
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
            </form>
          </Reveal>

          <Reveal delay={0.3} className="md:col-span-2">
            <div className="space-y-6 md:pl-8 md:border-l md:border-border md:h-full">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Email
                </p>
                <a
                  href="mailto:neine112arora@gmail.com"
                  className="text-foreground hover:text-gold transition-colors"
                >
                  neine112arora@gmail.com
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  LinkedIn
                </p>
                <a
                  href="https://linkedin.com/in/neine-arora"
                  target="_blank"
                  rel="noreferrer"
                  className="text-foreground hover:text-gold transition-colors"
                >
                  linkedin.com/in/neine-arora ↗
                </a>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Location
                </p>
                <p className="text-foreground">Bengaluru, India</p>
              </div>
              <div className="pt-6">
                <p className="text-xs uppercase tracking-[0.25em] text-foreground/50 mb-2">
                  Availability
                </p>
                <p className="text-sm text-foreground/70 leading-relaxed">
                  Currently in a VP role at Deutsche Bank. Open to advisory,
                  speaking and select strategic engagements.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <footer className="mt-32 pt-8 border-t border-border flex flex-wrap justify-between items-center gap-4 text-xs text-foreground/40">
          <p>© 2026 Neine Arora. All rights reserved.</p>
          <p className="tracking-[0.25em] uppercase">Crafted with intent</p>
        </footer>
      </div>
    </section>
  );
}
