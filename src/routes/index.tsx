import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { Nav } from "@/components/portfolio/Nav";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Contact } from "@/components/portfolio/Contact";
import { Projects } from "@/components/portfolio/Projects";
import { Automation } from "@/components/portfolio/Automation";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Neine Arora — VP, Business Transformation & Program Management" },
      {
        name: "description",
        content:
          "Portfolio of Neine Arora, Vice President at Deutsche Bank. 13+ years driving banking transformation with Lean Six Sigma, PMP, RPA and AI/ML.",
      },
      { property: "og:title", content: "Neine Arora — Business Transformation Leader" },
      {
        property: "og:description",
        content:
          "Solving critical banking challenges through technology, innovation, and 13+ years of transformation expertise.",
      },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,500;0,700;0,800;1,500;1,700&family=DM+Sans:wght@300;400;500;600&display=swap",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="bg-background text-foreground">
      <Toaster theme="dark" position="bottom-right" />
      <Nav />
      <Hero />
      <About />
      <Projects />
      <Automation />
      <Experience />
      <Contact />
    </main>
  );
}
