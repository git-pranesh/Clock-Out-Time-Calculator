import { SEOHead } from "@/components/SEOHead";
import { RelatedTools } from "@/components/RelatedTools";
import { getPageByPath } from "@/data/pageContent";

const page = getPageByPath("/break-time-calculator")!;

const BREAK_RULES = [
  { state: "California", meal: "30 min after 5h (2nd break after 10h)", rest: "10 min per 4h worked (paid)" },
  { state: "Washington", meal: "30 min after 5h", rest: "10 min per 4h (paid)" },
  { state: "Oregon", meal: "30 min after 6h", rest: "10 min per 4h (paid)" },
  { state: "New York", meal: "30-60 min (varies by industry)", rest: "Not mandated statewide" },
  { state: "Colorado", meal: "30 min after 5h", rest: "10 min per 4h (paid)" },
  { state: "Federal (all other states)", meal: "Not required by federal law", rest: "Breaks <20 min must be paid" },
];

export default function BreakTimePage() {
  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        path={page.path}
        faqs={page.faqs}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: page.h1, path: page.path }]}
      />
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{page.h1}</h1>
          <p className="text-muted-foreground">{page.description}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="break-table">
          <div className="px-6 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Break Requirements by State</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Required meal and rest breaks for hourly employees</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">State</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Meal Break</th>
                  <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rest Break</th>
                </tr>
              </thead>
              <tbody>
                {BREAK_RULES.map((row, i) => (
                  <tr key={i} className="border-b border-border last:border-0">
                    <td className="px-4 py-2.5 font-medium text-foreground">{row.state}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{row.meal}</td>
                    <td className="px-4 py-2.5 text-muted-foreground">{row.rest}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Break Law Details</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            {page.bodyContent.split("\n\n").map((p, i) => <p key={i}>{p.replace(/\*\*/g, "")}</p>)}
          </div>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group border border-border rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/50 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="ml-2 text-xs text-muted-foreground group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border bg-muted/20">{faq.answer}</div>
              </details>
            ))}
          </div>
        </section>

        <RelatedTools pages={page.relatedPages} />
      </div>
    </>
  );
}
