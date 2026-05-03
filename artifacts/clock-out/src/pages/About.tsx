import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Link } from "wouter";

const LAST_UPDATED = "May 2026";

export default function About() {
  return (
    <>
      <SEOHead
        title="About ClockOut - Free Clock-Out & Timecard Tools"
        description="Learn about ClockOut, a free suite of clock-out time, timecard, and overtime calculators built for shift workers, nurses, and hourly employees."
        path="/about"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />
      <div className="space-y-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]} />

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">About ClockOut</h1>
          <p className="text-xs text-muted-foreground/80">Last updated {LAST_UPDATED}</p>
        </div>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">What ClockOut does</h2>
          <p>
            ClockOut is a free, browser-based suite of work-time calculators designed for hourly workers,
            shift employees, nurses, retail associates, factory staff, and anyone who needs to know
            exactly when their shift ends. The flagship tool answers the question millions of workers
            ask every day: <strong className="text-foreground">"What time do I get off?"</strong>
          </p>
          <p>
            Beyond that core calculator, ClockOut provides specialized tools for 4-hour, 6-hour,
            8-hour, 10-hour, and 12-hour shifts; a weekly timecard tracker; an overtime pay calculator
            that follows FLSA and California rules; an "hours between two times" calculator for
            anyone reconstructing a shift after the fact; plus break-time, time-and-a-half, and
            double-time helpers.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Who built it and why</h2>
          <p>
            ClockOut was built by a small independent team that has worked in service, healthcare,
            and shift-based industries. We were tired of the existing options — pay-walled apps,
            ad-heavy sites that took ten seconds to load, and corporate timekeeping portals that
            required you to be on a work computer to see your hours.
          </p>
          <p>
            Our goal is to answer the clock-out question in under 5 seconds, with no account, no
            ads blocking the tool, and no unnecessary complexity. Every calculation runs locally in
            your browser — your start times and shift lengths never leave your device.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">How calculations work</h2>
          <p>
            <strong className="text-foreground">Clock-out time</strong> = start time + paid shift length + any unpaid break.
            For example, 9:00 AM start with an 8-hour paid shift and a 30-minute unpaid lunch
            means you clock out at 5:30 PM — your paid hours stay at 8, but you spend 8.5 hours at
            work in total.
          </p>
          <p>
            <strong className="text-foreground">Overtime thresholds</strong> follow the U.S. Fair Labor Standards Act (FLSA)
            for the federal 40-hour weekly rule (1.5x), plus California Labor Code §510 daily
            overtime (8h/day at 1.5x) and double-time (12h/day at 2x). State laws vary — we surface
            the most common rules but always recommend confirming with your state's labor board.
          </p>
          <p>
            <strong className="text-foreground">Privacy:</strong> all math runs client-side. We don't log inputs, results,
            or send anything to a server.
          </p>
        </section>

        <section className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <h2 className="text-lg font-semibold text-foreground">Disclaimer</h2>
          <p>
            ClockOut is provided for informational and personal scheduling purposes only. It is
            not legal, tax, payroll, or HR advice. Verify your hours and overtime against your
            employer's official timekeeping system and your state's labor laws before relying on
            any number from this site for pay disputes or legal action.
          </p>
        </section>

        <div className="flex flex-wrap gap-3">
          <Link href="/" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Use the calculator
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
            Contact us
          </Link>
          <Link href="/privacy-policy" className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
            Privacy policy
          </Link>
        </div>
      </div>
    </>
  );
}
