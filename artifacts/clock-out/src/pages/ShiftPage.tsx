import { SEOHead } from "@/components/SEOHead";
import { ClockOutCalculator } from "@/components/ClockOutCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import type { PageConfig } from "@/data/pageContent";

interface ShiftPageProps {
  page: PageConfig;
}

export default function ShiftPage({ page }: ShiftPageProps) {
  return (
    <>
      <SEOHead
        title={page.title}
        description={page.description}
        path={page.path}
        faqs={page.faqs}
        breadcrumbs={[
          { name: "Home", path: "/" },
          { name: page.h1, path: page.path },
        ]}
      />

      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{page.h1}</h1>
          <p className="text-muted-foreground text-base sm:text-lg">{page.description}</p>
        </div>

        <ClockOutCalculator
          defaultShiftHours={page.defaultShiftHours}
          defaultStartHour={page.defaultStartHour}
        />

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">About This Calculator</h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            {page.bodyContent.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.includes(":**")) {
                const [bold, ...rest] = para.split("\n");
                return (
                  <div key={i}>
                    <p className="font-semibold text-foreground">{bold.replace(/\*\*/g, "")}</p>
                    {rest.map((line, j) => (
                      <p key={j} className="mt-1">{line}</p>
                    ))}
                  </div>
                );
              }
              return <p key={i}>{para.replace(/\*\*/g, "")}</p>;
            })}
          </div>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
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
