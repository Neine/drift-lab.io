import { createFileRoute } from "@tanstack/react-router";
import { Toaster } from "sonner";
import { NoticeBoard } from "@/components/portfolio/NoticeBoard";
import { About } from "@/components/portfolio/About";
import { Contact } from "@/components/portfolio/Contact";
import { Showcase } from "@/components/portfolio/Showcase";
import { Blog } from "@/components/portfolio/Blog";
import { Ribbon } from "@/components/portfolio/Ribbon";

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
    <main className="bg-background text-foreground min-h-screen">
      <Toaster theme="dark" position="bottom-right" />
      <div className="lg:flex lg:items-start">
        <NoticeBoard />
        <div className="flex-1 lg:ml-[22rem] xl:ml-[26rem]">
          <Blog />
          <Showcase />
          <About />
          <Contact />
        </div>
      </div>
    </main>
  );
}
