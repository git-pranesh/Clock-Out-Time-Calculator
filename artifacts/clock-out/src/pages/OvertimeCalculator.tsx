import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { RelatedTools } from "@/components/RelatedTools";
import { calculateWeeklyOvertimePay } from "@/lib/calculations";
import { getPageByPath } from "@/data/pageContent";

const page = getPageByPath("/overtime-calculator")!;

const STATES = ["Federal (40h/wk)", "California (daily OT)", "Texas", "Florida", "New York", "Other"];

export default function OvertimeCalculator() {
  const [hours, setHours] = useState("45");
  const [rate, setRate] = useState("18");
  const [state, setState] = useState("Federal (40h/wk)");

  const h = parseFloat(hours) || 0;
  const r = parseFloat(rate) || 0;
  const result = calculateWeeklyOvertimePay(h, r, state);

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

        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="overtime-calculator">
          {/* Result */}
          <div className="bg-primary px-6 py-5 text-center">
            <p className="text-primary-foreground/70 text-sm mb-1">Total Pay This Week</p>
            <p className="text-5xl font-bold text-white" data-testid="result-total-pay">{fmt(result.totalPay)}</p>
          </div>

          {h > 0 && r > 0 && (
            <div className="grid grid-cols-3 divide-x divide-border border-b border-border">
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">Regular ({result.regularHours}h)</p>
                <p className="font-semibold text-sm text-foreground" data-testid="result-regular-pay">{fmt(result.regularPay)}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">OT 1.5x ({result.otHours}h)</p>
                <p className="font-semibold text-sm text-orange-500" data-testid="result-ot-pay">{fmt(result.otPay)}</p>
              </div>
              <div className="px-4 py-3 text-center">
                <p className="text-xs text-muted-foreground mb-0.5">DT 2x ({result.dtHours}h)</p>
                <p className="font-semibold text-sm text-red-500" data-testid="result-dt-pay">{fmt(result.dtPay)}</p>
              </div>
            </div>
          )}

          <div className="px-6 py-5 space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Hours Worked This Week</label>
              <input
                type="number"
                min="0"
                max="168"
                value={hours}
                onChange={e => setHours(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-hours-worked"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Hourly Rate ($)</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={rate}
                onChange={e => setRate(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-hourly-rate"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">State / Overtime Rule</label>
              <select
                value={state}
                onChange={e => setState(e.target.value)}
                className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="select-state"
              >
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Overtime Rules Explained</h2>
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
