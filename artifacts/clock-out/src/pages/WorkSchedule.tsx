import { SEOHead } from "@/components/SEOHead";
import { ClockOutCalculator } from "@/components/ClockOutCalculator";
import { TimecardCalculator } from "@/components/TimecardCalculator";
import { RelatedTools } from "@/components/RelatedTools";

const faqs = [
  { question: "What is the best work schedule?", answer: "It depends on your lifestyle, family commitments, and industry. The 9-5 five-day schedule is traditional, while 4/10 (four 10-hour days) and 3/12 (three 12-hour days) are increasingly popular for the extra days off." },
  { question: "How do I calculate my weekly hours from a shift schedule?", answer: "Multiply your daily shift length by the number of days worked. A 5-day, 8-hour schedule = 40 hours. A 4-day, 10-hour schedule = 40 hours. A 3-day, 12-hour schedule = 36 hours." },
  { question: "What is a rotating shift schedule?", answer: "A rotating schedule cycles workers through different shifts (days, evenings, nights) over a set period. This distributes the burden of less desirable shifts equally among all employees." },
  { question: "How many hours per week is considered full time?", answer: "The Affordable Care Act defines full-time as 30+ hours per week for benefits eligibility. FLSA overtime thresholds kick in at 40 hours. Most employers consider 35-40 hours per week to be full-time employment." },
  { question: "What is a compressed work schedule?", answer: "A compressed schedule fits a standard 40-hour week into fewer than 5 days. The most common is 4/10 (four 10-hour days). Some employers offer 9/80 schedules (80 hours over 9 days, with every other Friday off)." },
];

const relatedPages = [
  { path: "/timecard-calculator", label: "Timecard Calculator" },
  { path: "/overtime-calculator", label: "Overtime Calculator" },
  { path: "/10-hour-shift-calculator", label: "10-Hour Shift Calculator" },
  { path: "/12-hour-shift-calculator", label: "12-Hour Shift Calculator" },
];

export default function WorkSchedule() {
  return (
    <>
      <SEOHead
        title="Work Schedule Calculator - Plan Your Weekly Hours"
        description="Calculate and plan your work schedule. Find your clock-out times, weekly hours, and overtime based on your shift pattern."
        path="/work-schedule-calculator"
        faqs={faqs}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Work Schedule Calculator", path: "/work-schedule-calculator" }]}
      />
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">Work Schedule Calculator</h1>
          <p className="text-muted-foreground">Plan your shifts, calculate weekly hours, and track overtime</p>
        </div>
        <ClockOutCalculator defaultShiftHours={8} />
        <TimecardCalculator />
        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Common Work Schedule Patterns</h2>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            {[
              { name: "Traditional 9-5", pattern: "5 days × 8 hours = 40h/week", note: "Standard Monday-Friday" },
              { name: "4/10 Schedule", pattern: "4 days × 10 hours = 40h/week", note: "3-day weekend every week" },
              { name: "3/12 Schedule", pattern: "3 days × 12 hours = 36h/week", note: "Common in healthcare" },
              { name: "2-2-3 Schedule", pattern: "Rotating 2-3 day blocks", note: "Common in manufacturing" },
            ].map((s, i) => (
              <div key={i} className="border border-border rounded-lg p-4">
                <p className="font-semibold text-foreground">{s.name}</p>
                <p className="text-muted-foreground mt-1">{s.pattern}</p>
                <p className="text-muted-foreground/70 text-xs mt-0.5">{s.note}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-4">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
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
        <RelatedTools pages={relatedPages} />
      </div>
    </>
  );
}
