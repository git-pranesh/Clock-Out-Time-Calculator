import { useState, useEffect } from "react";
import { SEOHead } from "@/components/SEOHead";
import { RelatedTools } from "@/components/RelatedTools";
import { formatHour12, formatHour24 } from "@/lib/calculations";

interface WhatTimeInHoursProps {
  hours: 4 | 8 | 12;
}

function padTwo(n: number) { return n.toString().padStart(2, "0"); }

export default function WhatTimeInHours({ hours }: WhatTimeInHoursProps) {
  const now = new Date();
  const defaultTime = `${padTwo(now.getHours())}:${padTwo(now.getMinutes())}`;

  const [startTime, setStartTime] = useState(defaultTime);

  useEffect(() => {
    const interval = setInterval(() => {
      const n = new Date();
      setStartTime(`${padTwo(n.getHours())}:${padTwo(n.getMinutes())}`);
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const parseTime = (t: string) => {
    const p = t.split(":");
    if (p.length < 2) return null;
    return { hour: parseInt(p[0], 10), minute: parseInt(p[1], 10) };
  };

  const start = parseTime(startTime);
  let resultHour = 0, resultMin = 0, crossesMidnight = false;
  if (start) {
    const totalMins = start.hour * 60 + start.minute + hours * 60;
    crossesMidnight = totalMins >= 1440;
    const resultTotal = totalMins % 1440;
    resultHour = Math.floor(resultTotal / 60);
    resultMin = resultTotal % 60;
  }

  const title = `What Time Is It in ${hours} Hours? - Clock Out Time Calculator`;
  const description = `Find out what time it will be in ${hours} hours from now or any start time. Auto-detects current time. Shows both 12h and 24h format.`;
  const h1 = `What Time Is It in ${hours} Hours?`;
  const path = `/what-time-is-it-in-${hours}-hours`;

  const faqs = [
    { question: `What time will it be in ${hours} hours from now?`, answer: `It depends on your current time. This calculator detects your local time and shows the result automatically. You can also enter any start time to calculate ${hours} hours from that time.` },
    { question: `How do I calculate what time it will be in ${hours} hours?`, answer: `Add ${hours} hours to your current time. If the result is past midnight, subtract 24 hours and note it's the next day. This calculator handles that automatically.` },
    { question: `What if the result crosses midnight?`, answer: `The calculator shows a '+1 day' indicator when the result is after midnight. For example, if it's 9 PM and you add ${hours} hours, the result shows correctly as the next morning.` },
    { question: `Can I use this for a different start time, not current time?`, answer: `Yes — the start time input lets you enter any time. Just type or select a different time and the result updates instantly.` },
    { question: `Is this the same as adding ${hours} hours to my shift start time?`, answer: `Yes, if your shift is exactly ${hours} hours long with no breaks, this gives your clock-out time. For shifts with breaks, use the main clock-out calculator which accounts for break deductions.` },
  ];

  const relatedPages = [
    { path: "/", label: "Clock Out Calculator" },
    { path: "/8-hour-shift-calculator", label: "8-Hour Shift Calculator" },
    { path: "/what-time-do-i-clock-out", label: "What Time Do I Clock Out" },
    { path: `/what-time-is-it-in-${hours === 8 ? 4 : 8}-hours`, label: `What Time in ${hours === 8 ? 4 : 8} Hours` },
  ];

  return (
    <>
      <SEOHead
        title={title}
        description={description}
        path={path}
        faqs={faqs}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: h1, path }]}
      />
      <div className="space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-2">{h1}</h1>
          <p className="text-muted-foreground">Auto-detects your current time — or enter any start time</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl shadow-sm overflow-hidden" data-testid="what-time-calculator">
          <div className="bg-primary px-6 py-6 text-center">
            <p className="text-primary-foreground/70 text-sm mb-1">In {hours} hours it will be</p>
            {start ? (
              <>
                <p className="text-5xl sm:text-6xl font-bold text-white tracking-tight" data-testid="result-future-time-12h">
                  {formatHour12(resultHour, resultMin)}
                </p>
                {crossesMidnight && (
                  <span className="inline-block mt-2 px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-medium">
                    +1 day
                  </span>
                )}
                <p className="text-primary-foreground/50 text-sm mt-1" data-testid="result-future-time-24h">
                  {formatHour24(resultHour, resultMin)} (24h)
                </p>
              </>
            ) : (
              <p className="text-4xl font-bold text-white/40">—:——</p>
            )}
          </div>

          <div className="px-6 py-5">
            <label className="block text-sm font-medium text-foreground mb-1.5">
              Start Time (defaults to now)
            </label>
            <input
              type="time"
              value={startTime}
              onChange={e => setStartTime(e.target.value)}
              className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground text-base focus:outline-none focus:ring-2 focus:ring-ring"
              data-testid="input-start-time"
            />
          </div>
        </div>

        <section className="bg-card border border-card-border rounded-xl p-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">How to Calculate</h2>
          <p className="text-sm text-muted-foreground">
            To find what time it will be in {hours} hours, add {hours} to the current hour. If the result is 
            greater than 23 (24-hour) or 12 (12-hour), wrap around to the next day. For example, if it is 
            currently 9:00 PM (21:00) and you add {hours} hours, you get {(21 + hours) % 24}:00 
            {(21 + hours) >= 24 ? " the next day" : ""}. This calculator handles all of that automatically,
            including overnight transitions.
          </p>
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
