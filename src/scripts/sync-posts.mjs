#!/usr/bin/env node
/**
 * sync-posts.mjs
 *
 * Pulls latest posts from:
 *   1. Medium RSS feed (fully automatic)
 *   2. data/linkedin-posts.json (you add a line here when you publish on LinkedIn,
 *      since LinkedIn has no public feed API for personal posts)
 *
 * Regenerates the `posts` array in src/components/portfolio/Blog.tsx.
 * Exits with code 0 and makes no changes if nothing is new (so the workflow
 * can skip an empty commit).
 *
 * Usage: node scripts/sync-posts.mjs
 */

import { readFileSync, writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const REPO_ROOT = join(__dirname, "..");
const BLOG_FILE = join(REPO_ROOT, "src/components/portfolio/Blog.tsx");
const LINKEDIN_FILE = join(REPO_ROOT, "data/linkedin-posts.json");

const MEDIUM_USERNAME = "@neine112arora";
const MEDIUM_RSS_URL = `https://medium.com/feed/${MEDIUM_USERNAME}`;

// ---------- helpers ----------

function formatDate(d) {
  return d.toLocaleString("en-US", { month: "short", year: "numeric" });
}

function estimateReadTime(text) {
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

function stripHtml(html) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function excerptFrom(text, maxLen = 200) {
  const clean = stripHtml(text);
  if (clean.length <= maxLen) return clean;
  return clean.slice(0, maxLen).replace(/\s+\S*$/, "") + "…";
}

// Naive XML tag extraction — Medium's RSS is simple enough not to need a full parser.
function extractTag(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`, "i");
  const m = block.match(re);
  if (!m) return "";
  return m[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim();
}

function extractItems(xml) {
  const items = [];
  const itemRe = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = itemRe.exec(xml))) {
    items.push(m[1]);
  }
  return items;
}

// Medium RSS categories show up as multiple <category> tags
function extractCategories(block) {
  const re = /<category>([\s\S]*?)<\/category>/g;
  const cats = [];
  let m;
  while ((m = re.exec(block))) {
    cats.push(m[1].replace(/^<!\[CDATA\[/, "").replace(/\]\]>$/, "").trim());
  }
  return cats;
}

function titleCase(str) {
  return str
    .split(/[\s-]+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ---------- fetch Medium ----------

async function fetchMediumPosts() {
  const res = await fetch(MEDIUM_RSS_URL, {
    headers: { "User-Agent": "drift-lab-blog-sync/1.0" },
  });
  if (!res.ok) {
    console.warn(`Medium RSS fetch failed: ${res.status} ${res.statusText}`);
    return [];
  }
  const xml = await res.text();
  const items = extractItems(xml);

  return items.map((block) => {
    const title = extractTag(block, "title");
    const link = extractTag(block, "link").split("?")[0]; // strip tracking params
    const pubDateRaw = extractTag(block, "pubDate");
    const pubDate = pubDateRaw ? new Date(pubDateRaw) : new Date();
    const contentEncoded = extractTag(block, "content:encoded") || extractTag(block, "description");
    const categories = extractCategories(block);
    const category = categories.length ? titleCase(categories[0]) : "Medium";

    return {
      date: formatDate(pubDate),
      category,
      title,
      excerpt: excerptFrom(contentEncoded),
      readTime: estimateReadTime(stripHtml(contentEncoded)),
      url: link,
      _pubDate: pubDate,
    };
  });
}

// ---------- read LinkedIn manual file ----------

function readLinkedInPosts() {
  try {
    const raw = readFileSync(LINKEDIN_FILE, "utf-8");
    const parsed = JSON.parse(raw);
    return parsed.map((p) => ({ ...p, _pubDate: null }));
  } catch (err) {
    console.warn(`Could not read ${LINKEDIN_FILE}: ${err.message}`);
    return [];
  }
}

// ---------- read existing Blog.tsx posts ----------

function parsePostObjects(arrayLiteral) {
  // Each post is a `{ ... }` block inside the array. Split on top-level
  // object boundaries rather than using eval/Function on file content.
  const objBlocks = [];
  let depth = 0;
  let start = -1;
  for (let i = 0; i < arrayLiteral.length; i++) {
    const ch = arrayLiteral[i];
    if (ch === "{") {
      if (depth === 0) start = i;
      depth++;
    } else if (ch === "}") {
      depth--;
      if (depth === 0 && start !== -1) {
        objBlocks.push(arrayLiteral.slice(start, i + 1));
        start = -1;
      }
    }
  }

  const fieldRe = (field) =>
    new RegExp(`${field}:\\s*("(?:[^"\\\\]|\\\\.)*"|\`[\\s\\S]*?\`)`, "m");

  function unquote(raw) {
    if (!raw) return "";
    if (raw.startsWith("`")) {
      return raw.slice(1, -1);
    }
    try {
      return JSON.parse(raw);
    } catch {
      return raw.slice(1, -1);
    }
  }

  return objBlocks.map((block) => {
    const get = (field) => {
      const m = block.match(fieldRe(field));
      return m ? unquote(m[1].trim()) : "";
    };
    return {
      date: get("date"),
      category: get("category"),
      title: get("title"),
      excerpt: get("excerpt"),
      readTime: get("readTime"),
      url: get("url"),
    };
  });
}

function readExistingPosts() {
  const src = readFileSync(BLOG_FILE, "utf-8");
  const match = src.match(/const posts = (\[[\s\S]*?\n\]);/);
  if (!match) {
    throw new Error("Could not locate `const posts = [...]` array in Blog.tsx");
  }
  const posts = parsePostObjects(match[1]);
  return { posts, rawBlock: match[0], arrayLiteral: match[1] };
}

// ---------- merge ----------

function dedupeKey(post) {
  return post.url;
}

function mergePosts(existing, incoming) {
  const existingUrls = new Set(existing.map(dedupeKey));
  const newOnes = incoming.filter((p) => !existingUrls.has(dedupeKey(p)));
  return { merged: [...newOnes, ...existing], added: newOnes };
}

// ---------- write back ----------

function serializePosts(posts) {
  const entries = posts.map((p) => {
    const lines = [
      `    date: ${JSON.stringify(p.date)},`,
      `    category: ${JSON.stringify(p.category)},`,
      `    title: ${JSON.stringify(p.title)},`,
      `    excerpt:\n      ${JSON.stringify(p.excerpt)},`,
      `    readTime: ${JSON.stringify(p.readTime)},`,
      `    url: ${JSON.stringify(p.url)},`,
    ];
    return `  {\n${lines.join("\n")}\n  }`;
  });
  return `[\n${entries.join(",\n")},\n]`;
}

function writeBlogFile(rawBlock, arrayLiteral, posts) {
  const src = readFileSync(BLOG_FILE, "utf-8");
  const newArrayLiteral = serializePosts(posts);
  const newBlock = rawBlock.replace(arrayLiteral, newArrayLiteral);
  const updated = src.replace(rawBlock, newBlock);
  writeFileSync(BLOG_FILE, updated, "utf-8");
}

// ---------- main ----------

async function main() {
  const [mediumPosts, linkedinPosts, existing] = await Promise.all([
    fetchMediumPosts(),
    Promise.resolve(readLinkedInPosts()),
    Promise.resolve(readExistingPosts()),
  ]);

  const incoming = [...linkedinPosts, ...mediumPosts].map(
    ({ _pubDate, ...rest }) => rest
  );

  const { merged, added } = mergePosts(existing.posts, incoming);

  if (added.length === 0) {
    console.log("No new posts found. Blog.tsx unchanged.");
    process.exit(0);
  }

  writeBlogFile(existing.rawBlock, existing.arrayLiteral, merged);

  console.log(`Added ${added.length} new post(s):`);
  for (const p of added) {
    console.log(`  - [${p.category}] ${p.title}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
