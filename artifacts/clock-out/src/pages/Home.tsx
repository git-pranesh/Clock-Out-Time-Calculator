import { SEOHead } from "@/components/SEOHead";
import { ClockOutCalculator } from "@/components/ClockOutCalculator";
import { HoursBetweenCalculator } from "@/components/HoursBetweenCalculator";
import { TimecardCalculator } from "@/components/TimecardCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import { getPageByPath } from "@/data/pageContent";

const page = getPageByPath("/")!;

export default function Home() {
  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        path="/"
        faqs={page.faqs}
        breadcrumbs={[{ name: "Home", path: "/" }]}
        isHomepage
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{page.h1}</h1>
          <p className="text-muted-foreground text-base sm:text-lg">
            Enter your start time and shift length — see exactly when you get off
          </p>
        </div>

        <ClockOutCalculator defaultShiftHours={8} />

        <HoursBetweenCalculator />

        <TimecardCalculator />

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">About This Calculator</h2>
          <div className="prose prose-sm max-w-none text-muted-foreground space-y-3">
            {page.bodyContent.split("\n\n").map((para, i) => (
              <p key={i}>{para.replace(/\*\*/g, "")}</p>
            ))}
          </div>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {page.faqs.map((faq, i) => (
              <details key={i} className="group border border-border rounded-lg overflow-hidden">
                <summary className="flex items-center justify-between px-4 py-3 cursor-pointer text-sm font-medium text-foreground hover:bg-muted/50 transition-colors list-none">
                  <span>{faq.question}</span>
                  <span className="ml-2 text-muted-foreground group-open:rotate-180 transition-transform text-xs">▾</span>
                </summary>
                <div className="px-4 py-3 text-sm text-muted-foreground border-t border-border bg-muted/20">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </section>

        <RelatedTools pages={page.relatedPages} />
      </div>
    </>
  );
}
