import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";
import { publicBlogClient } from '@/lib/blog.server';

const BASE_URL = "https://drift-lab.io";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/ai", changefreq: "monthly", priority: "0.8" },
          { path: "/rpa", changefreq: "monthly", priority: "0.8" },
          { path: "/lean-sigma", changefreq: "monthly", priority: "0.8" },
          { path: "/project-management", changefreq: "monthly", priority: "0.8" },
        ];
        const { data: articles, error } = await publicBlogClient().from('blog_posts').select('slug,updated_at').eq('status', 'published');
        if (error) throw new Error(error.message);
        for (const post of articles ?? []) entries.push({ path: `/blog/${post.slug}`, lastmod: post.updated_at.slice(0, 10), changefreq: 'monthly', priority: '0.7' });

        const urls = entries.map((e) =>
          [
            `  <url>`,
            `    <loc>${BASE_URL}${e.path}</loc>`,
            e.lastmod ? `    <lastmod>${e.lastmod}</lastmod>` : null,
            e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
            e.priority ? `    <priority>${e.priority}</priority>` : null,
            `  </url>`,
          ]
            .filter(Boolean)
            .join("\n"),
        );

        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");

        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
