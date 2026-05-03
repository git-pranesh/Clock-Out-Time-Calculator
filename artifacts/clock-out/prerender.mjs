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

  const howToSchema = page.howTo ? {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: page.howTo.name,
    description: page.description,
    step: page.howTo.steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.name,
      text: s.text,
    })),
  } : null;

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
    howToSchema ? buildJsonLdBlock(howToSchema) : "",
  ].filter(Boolean).join("\n    ");

  return tags;
}

function renderH1Body(page) {
  // SSR'd body content so crawlers and AI bots see the full text in raw HTML.
  // Visually hidden because the React app hydrates and renders the real UI on top.
  const breadcrumbHtml = page.path === "/" ? "" : `
      <nav aria-label="Breadcrumb"><ol><li><a href="/">Home</a></li><li>${escapeHtml(page.h1)}</li></ol></nav>`;

  const bodyParas = (page.bodyText || []).map((p) => `<p>${escapeHtml(p)}</p>`).join("\n      ");

  const faqHtml = (page.faqs && page.faqs.length > 0) ? `
      <section><h2>Frequently Asked Questions</h2>
      ${page.faqs.map((f) => `<div><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></div>`).join("\n      ")}
      </section>` : "";

  const howToHtml = page.howTo ? `
      <section><h2>${escapeHtml(page.howTo.name)}</h2>
      <ol>${page.howTo.steps.map((s) => `<li><strong>${escapeHtml(s.name)}:</strong> ${escapeHtml(s.text)}</li>`).join("")}</ol>
      </section>` : "";

  const sourcesHtml = page.sources ? `
      <section><h2>Sources &amp; Disclaimer</h2><p>${escapeHtml(page.sources)}</p></section>` : "";

  return `<noscript-fallback hidden></noscript-fallback>
    <div id="prerender-content" style="position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);">${breadcrumbHtml}
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.description)}</p>
      ${bodyParas}
      ${howToHtml}
      ${faqHtml}
      ${sourcesHtml}
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

// Enrich shift/synonym pages with HowTo schema + sources disclaimer for the prerender.
const SHIFT_HOWTO = {
  name: "How to use this clock-out calculator",
  steps: [
    { name: "Enter your start time", text: "Type or pick the time you started (or will start) your shift. Both 12-hour (AM/PM) and 24-hour formats are accepted." },
    { name: "Pick your shift length", text: "Select your paid shift length — 4, 6, 8, 10, 12 hours, or any custom value. Half-hour options are available." },
    { name: "Add your unpaid break", text: "Choose any unpaid break that extends your time at work. Common options are 15, 30, 45, or 60 minutes." },
    { name: "Read your clock-out time", text: "The result panel shows when you'll clock out, in both 12-hour and 24-hour formats. Overnight shifts display a +1 day badge." },
  ],
};
const SHIFT_SOURCES = "Overtime thresholds reference the U.S. Fair Labor Standards Act (FLSA, 40 hrs/week at 1.5x) plus state daily overtime rules (e.g., California Labor Code §510: 8h/day OT, 12h/day double-time). State labor laws vary — check your state's labor department. This calculator is informational only and is not legal, tax, or payroll advice.";

let count = 0;
for (const rawPage of ALL_PAGES) {
  const page = {
    ...rawPage,
    howTo: { name: `How to use the ${rawPage.h1}`, steps: SHIFT_HOWTO.steps },
    sources: SHIFT_SOURCES,
    bodyText: rawPage.bodyContent
      ? rawPage.bodyContent.split("\n\n").map((p) => p.replace(/\*\*/g, "")).filter((p) => p.trim().length > 0).slice(0, 6)
      : [],
  };
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
function whatTimeBody(h) {
  return [
    `To find what time it will be in ${h} hours, add ${h} to the current hour and wrap past midnight if needed. This calculator handles the AM/PM conversion and overnight transitions automatically.`,
    `Common uses: planning the end of a ${h}-hour shift, medication dosing intervals, cooking and food-safety windows, travel arrival times, and sleep planning.`,
    `The auto-detect feature reads your device clock; you can also enter any custom start time. Results show in both 12-hour and 24-hour formats.`,
  ];
}
function whatTimeFaqs(h) {
  return [
    { question: `What time will it be in ${h} hours from now?`, answer: `It depends on your current time. The calculator detects your local time automatically and adds ${h} hours, including AM/PM conversion and midnight wrap-around.` },
    { question: `How do I calculate ${h} hours from now manually?`, answer: `Add ${h} to the current hour. If the result is past 24 (24-hour) or past 12 (12-hour PM), subtract 24 and note the next day. The calculator does this automatically.` },
    { question: `Does it handle crossing midnight?`, answer: `Yes — when the result lands on the next calendar day, the page shows a +1 day badge. Useful for night shifts, overnight medication dosing, and red-eye flights.` },
  ];
}

const supplemental = [
  {
    path: "/about", h1: "About ClockOut", title: "About ClockOut - Free Clock-Out & Timecard Tools",
    description: "Learn about ClockOut, a free suite of clock-out time, timecard, and overtime calculators built for shift workers, nurses, and hourly employees.",
    faqs: [],
    bodyText: [
      "ClockOut is a free, browser-based suite of work-time calculators for hourly workers, shift employees, nurses, retail staff, and anyone who needs to know when their shift ends.",
      "The flagship tool answers the most-Googled question among shift workers: 'What time do I get off?' Beyond that, ClockOut provides 4-, 6-, 8-, 10-, and 12-hour shift calculators, a weekly timecard tracker, an overtime pay calculator following FLSA and California rules, hours-between-times, break-time, time-and-a-half, and double-time helpers.",
      "Built by a small independent team with backgrounds in service, healthcare, and shift industries. We were tired of pay-walled apps and ad-heavy sites; our goal is to answer the clock-out question in under 5 seconds with no account and no ads.",
      "All math runs locally in your browser. Inputs and results never leave your device. Calculations follow the U.S. Fair Labor Standards Act for federal weekly overtime (40 hours at 1.5x) plus California Labor Code §510 daily overtime and double-time. State laws vary — confirm with your state's labor board.",
      "ClockOut is provided for informational and personal scheduling purposes only. It is not legal, tax, payroll, or HR advice.",
    ],
  },
  {
    path: "/privacy-policy", h1: "Privacy Policy", title: "Privacy Policy | Clock Out Time Calculator",
    description: "Privacy policy for the Clock Out Time Calculator. We do not collect personal data. All calculations run locally in your browser.",
    faqs: [],
    bodyText: [
      "ClockOut (clockouttime.com) is built with privacy as a foundational design choice. This policy explains exactly what we do and don't collect.",
      "Data we collect: none of your inputs. Start times, shift lengths, break durations, hourly rates, and timecard entries are processed entirely in your browser. They are never transmitted to our servers, logged, or stored.",
      "Cookies and local storage: we don't use tracking cookies or third-party advertising cookies. The site may store minimal preferences (such as 12h vs 24h format choice) in your browser's local storage. These never leave your device.",
      "Analytics: we may use privacy-respecting, anonymized page-view analytics to understand which calculators are most useful. We don't run Google Analytics, Facebook Pixel, or any behavioral tracking.",
      "Third parties and ads: we do not sell, rent, or share user data. We do not run targeted advertising. The site loads a single Google Fonts stylesheet and otherwise has no third-party scripts.",
      "Contact form: name, email, and message you submit are sent to our team email so we can reply. We do not add you to any marketing list.",
      "Children's privacy: we do not knowingly collect any information from children under 13.",
      "Changes to this policy are summarized on the homepage for at least 30 days. Last updated May 2026.",
    ],
  },
  {
    path: "/contact", h1: "Contact Us", title: "Contact ClockOut - Send Us Feedback or Report a Bug",
    description: "Contact the ClockOut team. Send feedback, report a calculation issue, or suggest a new tool. We read every message and reply within a few business days.",
    faqs: [],
    bodyText: [
      "Questions, feedback, or spotted an error in our calculations? Get in touch — we read every message.",
      "Report an error: tell us the inputs and the result you expected. Calculation bugs are top priority and we usually patch them within a day.",
      "Suggest a calculator: if your shift pattern, pay rule, or scheduling math isn't covered yet, send a note. We add new tools every month based on user requests.",
      "General questions: press, partnership, accessibility feedback, or anything else — we typically reply within two business days.",
      "ClockOut does not collect personal data; the contact form simply emails our team. See our privacy policy for details.",
    ],
  },
  {
    path: "/what-time-is-it-in-4-hours", h1: "What Time Is It In 4 Hours?",
    title: "What Time Is It In 4 Hours? - Add 4 Hours to Now",
    description: "Find out what time it will be in exactly 4 hours from now. Useful for planning shifts, appointments, and break schedules. Auto-detects your local time.",
    faqs: whatTimeFaqs(4), bodyText: whatTimeBody(4),
    howTo: { name: "How to find what time it is in 4 hours", steps: [
      { name: "Note your starting time", text: "Defaults to your current local time, auto-detected from your device clock. Type a different time to use a custom starting point." },
      { name: "Add 4 hours", text: "The calculator adds 4 hours and wraps around midnight automatically. A +1 day badge appears if the result lands on the next day." },
      { name: "Read both formats", text: "The result shows in 12-hour (AM/PM) and 24-hour formats simultaneously." },
    ] },
    sources: "Time arithmetic uses standard 24-hour modular math. The auto-detect feature reads your device clock. This calculator is informational only and is not medical, legal, or operational advice.",
  },
  {
    path: "/what-time-is-it-in-8-hours", h1: "What Time Is It In 8 Hours?",
    title: "What Time Is It In 8 Hours? - Add 8 Hours to Now",
    description: "Find out what time it will be in exactly 8 hours from now. Useful for planning the end of an 8-hour shift, sleep schedule, or medication dosing.",
    faqs: whatTimeFaqs(8), bodyText: whatTimeBody(8),
    howTo: { name: "How to find what time it is in 8 hours", steps: [
      { name: "Note your starting time", text: "Defaults to your current local time. Type a custom time to plan ahead." },
      { name: "Add 8 hours", text: "The calculator adds 8 hours and handles overnight transitions automatically." },
      { name: "Read both formats", text: "Result shows in 12-hour and 24-hour formats." },
    ] },
    sources: "Time arithmetic uses standard 24-hour modular math. The auto-detect feature reads your device clock. This calculator is informational only.",
  },
  {
    path: "/what-time-is-it-in-12-hours", h1: "What Time Is It In 12 Hours?",
    title: "What Time Is It In 12 Hours? - Add 12 Hours to Now",
    description: "Find out what time it will be in exactly 12 hours from now. Useful for nurses, 12-hour-shift workers, and tracking 12-hour medication intervals.",
    faqs: whatTimeFaqs(12), bodyText: whatTimeBody(12),
    howTo: { name: "How to find what time it is in 12 hours", steps: [
      { name: "Note your starting time", text: "Defaults to current local time; type any custom start time." },
      { name: "Add 12 hours", text: "Adding 12 hours always lands on the opposite half of the day — AM becomes PM and vice versa, often crossing midnight." },
      { name: "Read both formats", text: "Result shows in 12-hour and 24-hour formats with +1 day badge when applicable." },
    ] },
    sources: "Time arithmetic uses standard 24-hour modular math. The auto-detect feature reads your device clock. This calculator is informational only.",
  },
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
