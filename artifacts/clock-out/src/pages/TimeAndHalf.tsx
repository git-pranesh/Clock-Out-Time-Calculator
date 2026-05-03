import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { RelatedTools } from "@/components/RelatedTools";
import { getPageByPath } from "@/data/pageContent";

const page = getPageByPath("/time-and-a-half-calculator")!;

export default function TimeAndHalf() {
  const [rate, setRate] = useState("20");
  const [otHours, setOtHours] = useState("5");

  const r = parseFloat(rate) || 0;
  const h = parseFloat(otHours) || 0;
  const otRate = r * 1.5;
  const otPay = otRate * h;

  const fmt = (n: number) => `$${n.toFixed(2)}`;

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

        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="time-and-half-calculator">
          <div className="bg-primary px-6 py-5 text-center">
            <p className="text-primary-foreground/70 text-sm mb-1">Your Overtime Pay</p>
            <p className="text-5xl font-bold text-white" data-testid="result-ot-pay">{fmt(otPay)}</p>
            {r > 0 && (
              <p className="text-primary-foreground/60 text-sm mt-1" data-testid="result-ot-rate">
                {fmt(otRate)}/hr overtime rate
              </p>
            )}
          </div>

          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Regular Hourly Rate ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={e => setRate(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-regular-rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Overtime Hours Worked</label>
              <input
                type="number"
                min="0"
                step="0.5"
                value={otHours}
                onChange={e => setOtHours(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-ot-hours"
              />
            </div>
          </div>
        </div>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">How Time-and-a-Half Works</h2>
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
