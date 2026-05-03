import { SEOHead } from "@/components/SEOHead";
import { ClockOutCalculator } from "@/components/ClockOutCalculator";
import { RelatedTools } from "@/components/RelatedTools";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "wouter";
import type { PageConfig } from "@/data/pageContent";

interface ShiftPageProps {
  page: PageConfig;
}

const LAST_UPDATED = "May 2026";

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
        howToName={`How to use the ${page.h1}`}
        howToSteps={[
          { name: "Enter your start time", text: "Type or pick the time you started (or will start) your shift. The calculator accepts both 12-hour (AM/PM) and 24-hour formats." },
          { name: "Pick your shift length", text: "Select your paid shift length from the dropdown — 4, 6, 8, 10, 12 hours, or any custom value. Half-hour options are also available." },
          { name: "Add your unpaid break (optional)", text: "Choose any unpaid break that extends your time at work. Common options are 15, 30, 45, or 60 minutes." },
          { name: "Read your clock-out time", text: "The result panel shows when you'll clock out, in both 12-hour and 24-hour formats. Overnight shifts display a '+1 day' badge automatically." },
        ]}
      />

      <div className="space-y-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: page.h1, path: page.path }]} />

        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{page.h1}</h1>
          <p className="text-muted-foreground text-base sm:text-lg">{page.description}</p>
          <p className="text-xs text-muted-foreground/70 mt-3" data-testid="page-meta">
            Reviewed by the ClockOut team · Last updated {LAST_UPDATED} ·{" "}
            <Link href="/about" className="underline hover:text-accent">About this tool</Link>
          </p>
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

        <section className="bg-muted/30 border border-border rounded-xl p-5 text-xs text-muted-foreground space-y-2" data-testid="sources-disclaimer">
          <p className="font-semibold text-foreground text-sm">Sources & Disclaimer</p>
          <p>
            Overtime thresholds reference the U.S. Fair Labor Standards Act (FLSA) — 40 hours/week
            at 1.5x — plus state daily-overtime rules (e.g., California Labor Code §510: 8h/day OT,
            12h/day double-time). State labor laws vary; check your state's labor department for
            specifics.
          </p>
          <p>
            This calculator is provided for informational and personal scheduling purposes only.
            It is not legal, tax, or payroll advice. Verify your paid hours and overtime against
            your employer's official timekeeping system and your state's labor regulations.
            Questions or corrections?{" "}
            <Link href="/contact" className="underline hover:text-accent">Contact us</Link>.
          </p>
        </section>
      </div>
    </>
  );
}
