import { Helmet } from 'react-helmet-async';

interface FAQ {
  question: string;
  answer: string;
}

interface Breadcrumb {
  name: string;
  path: string;
}

interface HowToStep {
  name: string;
  text: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  faqs?: FAQ[];
  breadcrumbs?: Breadcrumb[];
  isHomepage?: boolean;
  noindex?: boolean;
  howToName?: string;
  howToSteps?: HowToStep[];
}

const SITE_ORIGIN = "https://clockouttime.com";
const OG_IMAGE = `${SITE_ORIGIN}/opengraph.jpg`;

export function SEOHead({
  title,
  description,
  path,
  faqs = [],
  breadcrumbs = [],
  isHomepage = false,
  noindex = false,
  howToName,
  howToSteps,
}: SEOHeadProps) {
  const url = `${SITE_ORIGIN}${path}`;

  const faqSchema = faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  } : null;

  const breadcrumbSchema = breadcrumbs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": `${SITE_ORIGIN}${crumb.path}`
    }))
  } : null;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="robots" content={noindex ? "noindex, nofollow" : "index, follow"} />
      <link rel="canonical" href={url} />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Clock Out Time Calculator" />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={OG_IMAGE} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OG_IMAGE} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          "name": title,
          "description": description,
          "url": url,
          "applicationCategory": "BusinessApplication",
          "operatingSystem": "Any",
          "isAccessibleForFree": true,
          "offers": {
            "@type": "Offer",
            "price": "0",
            "priceCurrency": "USD"
          }
        })}
      </script>

      {faqSchema && (
        <script type="application/ld+json">
          {JSON.stringify(faqSchema)}
        </script>
      )}

      {breadcrumbSchema && (
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbSchema)}
        </script>
      )}

      {howToName && howToSteps && howToSteps.length > 0 && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            "name": howToName,
            "description": description,
            "step": howToSteps.map((s, i) => ({
              "@type": "HowToStep",
              "position": i + 1,
              "name": s.name,
              "text": s.text,
            })),
          })}
        </script>
      )}

      {isHomepage && (
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Clock Out Time Calculator",
            "url": SITE_ORIGIN,
            "potentialAction": {
              "@type": "SearchAction",
              "target": `${SITE_ORIGIN}/search?q={search_term_string}`,
              "query-input": "required name=search_term_string"
            }
          })}
        </script>
      )}
    </Helmet>
  );
}
