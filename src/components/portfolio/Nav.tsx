import { useEffect, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { id: "home", label: "Home" },
  { id: "blog", label: "Blog" },
  { id: "automation", label: "AI Project Showcase" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  useEffect(() => {
    if (!isHome) return;
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const y = window.scrollY + 120;
      for (const l of links) {
        const el = document.getElementById(l.id);
        if (el && el.offsetTop <= y && el.offsetTop + el.offsetHeight > y) {
          setActive(l.id);
        }
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(window.scrollY > 20);
    }
  }, [isHome]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy-deep/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" hash="home" className="font-display text-lg tracking-wide">
          <span className="text-gold">​</span><span className="text-foreground/80">​</span>
        </Link>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.id}
              to="/"
              hash={l.id}
              className={`text-sm tracking-wide transition-colors ${
                isHome && active === l.id ? "text-gold" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <Link
          to="/"
          hash="contact"
          className="hidden md:inline-flex text-xs uppercase tracking-[0.2em] px-4 py-2 border border-gold/40 text-gold hover:bg-gold hover:text-primary-foreground transition-colors rounded-sm"
        >
          Connect
        </Link>
      </div>
    </header>
  );
}
