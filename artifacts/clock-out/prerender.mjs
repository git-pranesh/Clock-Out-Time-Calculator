#!/usr/bin/env node
// Post-build prerender: produce per-route index.html files with route-specific
// meta tags + JSON-LD so crawlers and AI bots see the correct content without
// executing JavaScript. The React app still hydrates and takes over.
import { readFileSync, writeFileSync, mkdirSync, copyFileSync, existsSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "dist/public");
const indexPath = join(distDir, "index.html");
const SITE_ORIGIN = "https://clockouttime.com";
const OG_IMAGE = `${SITE_ORIGIN}/opengraph.jpg`;

if (!existsSync(indexPath)) {
  console.error(`[prerender] dist/public/index.html not found. Run \`pnpm run build\` first.`);
  process.exit(1);
}

// Dynamically import the page configs from source. We use a tsx-compatible eval-free path:
// re-implement a tiny parser by importing via tsx sub-process is overkill, so we just
// reference the same data file by reading it through a lightweight require shim.
const { ALL_PAGES } = await import("./src/data/pageContent.ts").catch(async () => {
  // Fallback: parse compiled output if direct .ts import fails (Node 24 supports
  // type-stripping via --experimental-strip-types, but if not, reading source).
  const src = readFileSync(resolve(__dirname, "src/data/pageContent.ts"), "utf8");
  const match = src.match(/export const ALL_PAGES[^=]*=\s*(\[[\s\S]*?\n\];)/m);
  if (!match) throw new Error("Could not parse ALL_PAGES from pageContent.ts");
  // Strip TS satisfies/types by using Function constructor on the array literal.
  // This is safe because the source is our own.
  // eslint-disable-next-line no-new-func
  const arr = new Function(`return ${match[1].replace(/;$/, "")}`)();
  return { ALL_PAGES: arr };
});

const baseHtml = readFileSync(indexPath, "utf8");

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function buildJsonLdBlock(obj) {
  // Embed as <script type="application/ld+json"> with raw JSON (escape </script>).
  const json = JSON.stringify(obj).replace(/<\/script>/gi, "<\\/script>");
  return `<script type="application/ld+json">${json}</script>`;
}

function renderHead(page) {
  const url = `${SITE_ORIGIN}${page.path === "/" ? "/" : page.path}`;
  const title = escapeHtml(page.title);
  const description = escapeHtml(page.description);
  const ogImage = OG_IMAGE;

  const faqSchema = page.faqs && page.faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: page.faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  } : null;

  const breadcrumbs = page.path === "/"
    ? [{ name: "Home", path: "/" }]
    : [{ name: "Home", path: "/" }, { name: page.h1, path: page.path }];

  const breadcrumbSchema = breadcrumbs.length > 1 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_ORIGIN}${c.path}`,
    })),
  } : null;

  const webApp = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: page.title,
    description: page.description,
    url,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const websiteSchema = page.path === "/" ? {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Clock Out Time Calculator",
    url: SITE_ORIGIN,
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_ORIGIN}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  } : null;

  const tags = [
    `<title>${title}</title>`,
    `<meta name="description" content="${description}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:title" content="${title}" />`,
    `<meta property="og:description" content="${description}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:site_name" content="Clock Out Time Calculator" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:image" content="${ogImage}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${title}" />`,
    `<meta name="twitter:description" content="${description}" />`,
    `<meta name="twitter:image" content="${ogImage}" />`,
    buildJsonLdBlock(webApp),
    websiteSchema ? buildJsonLdBlock(websiteSchema) : "",
    faqSchema ? buildJsonLdBlock(faqSchema) : "",
    breadcrumbSchema ? buildJsonLdBlock(breadcrumbSchema) : "",
  ].filter(Boolean).join("\n    ");

  return tags;
}

function renderH1Body(page) {
  // Minimal SSR'd body content so crawlers see the H1 and lead text in raw HTML
  // (the React app hydrates and replaces it on load).
  return `<noscript-fallback hidden></noscript-fallback>
    <div id="prerender-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)}</p>
    </div>`;
}

function pageHtml(page) {
  // Replace the existing <title>...</title> block and everything between charset and the
  // <link rel="icon"> with route-specific tags. We keep all <link>/<script> asset tags.
  // Strategy: take baseHtml, remove default <title>, default description, default canonical,
  // default OG/Twitter/JSON-LD blocks, then inject route-specific ones right before </head>.

  let html = baseHtml;

  // Strip the default-rendered SEO block so we don't duplicate. We injected those between
  // <meta name="theme-color"> and <link rel="icon">. Match conservatively.
  html = html.replace(/<title>[\s\S]*?<\/title>/, "<!-- title injected -->");
  html = html.replace(/<meta name="description"[^>]*>/g, "");
  html = html.replace(/<meta name="robots"[^>]*>/g, "");
  html = html.replace(/<link rel="canonical"[^>]*>/g, "");
  html = html.replace(/<meta property="og:[^"]*"[^>]*>/g, "");
  html = html.replace(/<meta name="twitter:[^"]*"[^>]*>/g, "");
  html = html.replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g, "");

  const headInjection = renderHead(page);
  // Insert SEO tags right after <meta name="theme-color"> so they appear before
  // asset/script tags in the head — better for crawlers and matches conventional ordering.
  html = html.replace(
    /(<meta name="theme-color"[^>]*>)/,
    `$1\n    ${headInjection}`,
  );

  // Inject minimal SEO body content right after <div id="root">
  const bodyInjection = renderH1Body(page);
  html = html.replace('<div id="root"></div>', `<div id="root">${bodyInjection}</div>`);

  return html;
}

let count = 0;
for (const page of ALL_PAGES) {
  if (page.path === "/") {
    writeFileSync(indexPath, pageHtml(page), "utf8");
    count++;
    continue;
  }
  const slug = page.path.replace(/^\//, "");
  const dir = join(distDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHtml(page), "utf8");
  count++;
}

// Pages not in pageContent (about, privacy, contact, what-time-is-it-in-N) need entries too.
// Read from a minimal supplemental list.
const supplemental = [
  { path: "/about", h1: "About ClockOut", title: "About ClockOut - Free Clock-Out & Timecard Tools", description: "Learn about ClockOut, a free suite of clock-out time, timecard, and overtime calculators built for shift workers, nurses, and hourly employees.", faqs: [] },
  { path: "/privacy-policy", h1: "Privacy Policy", title: "Privacy Policy | Clock Out Time Calculator", description: "Privacy policy for the Clock Out Time Calculator. We do not collect personal data — every calculation runs in your browser.", faqs: [] },
  { path: "/contact", h1: "Contact Us", title: "Contact ClockOut - Send Us Feedback or Report a Bug", description: "Contact the ClockOut team. Send feedback, report a calculation issue, or request a new calculator.", faqs: [] },
  { path: "/what-time-is-it-in-4-hours", h1: "What Time Is It In 4 Hours?", title: "What Time Is It In 4 Hours? - Add 4 Hours to Now", description: "Find out what time it will be in exactly 4 hours from now. Useful for planning shifts, appointments, and break schedules.", faqs: [] },
  { path: "/what-time-is-it-in-8-hours", h1: "What Time Is It In 8 Hours?", title: "What Time Is It In 8 Hours? - Add 8 Hours to Now", description: "Find out what time it will be in exactly 8 hours from now. Useful for planning the end of an 8-hour shift or sleep schedule.", faqs: [] },
  { path: "/what-time-is-it-in-12-hours", h1: "What Time Is It In 12 Hours?", title: "What Time Is It In 12 Hours? - Add 12 Hours to Now", description: "Find out what time it will be in exactly 12 hours from now. Useful for nurses and shift workers planning the end of a 12-hour shift.", faqs: [] },
];

for (const page of supplemental) {
  // Only add if not already present in ALL_PAGES
  if (ALL_PAGES.some((p) => p.path === page.path)) continue;
  const slug = page.path.replace(/^\//, "");
  const dir = join(distDir, slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, "index.html"), pageHtml(page), "utf8");
  count++;
}

// Generate a static 404.html that points users back home.
const notFoundPage = {
  path: "/404",
  h1: "Page Not Found",
  title: "Page Not Found | Clock Out Time Calculator",
  description: "The page you're looking for doesn't exist. Return to the Clock Out Time Calculator home.",
  faqs: [],
};
let notFoundHtml = pageHtml(notFoundPage);
notFoundHtml = notFoundHtml.replace(
  '<meta name="robots" content="index, follow" />',
  '<meta name="robots" content="noindex, nofollow" />',
);
writeFileSync(join(distDir, "404.html"), notFoundHtml, "utf8");

console.log(`[prerender] Wrote ${count} prerendered pages + 404.html to ${distDir}`);
