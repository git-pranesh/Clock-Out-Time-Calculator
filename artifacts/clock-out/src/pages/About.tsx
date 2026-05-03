import { SEOHead } from "@/components/SEOHead";
import { Link } from "wouter";

export default function About() {
  return (
    <>
      <SEOHead
        title="About - Clock Out Time Calculator"
        description="Learn about the Clock Out Time Calculator — a free tool for shift workers, nurses, retail employees, and hourly workers to calculate their clock-out time and overtime."
        path="/about"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "About", path: "/about" }]}
      />
      <div className="space-y-8">
        <h1 className="text-3xl font-bold text-foreground">About ClockOut</h1>
        <div className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <p>
            ClockOut is a free, fast calculator designed for hourly workers, shift employees, nurses, retail 
            associates, and anyone who needs to know exactly when their shift ends.
          </p>
          <p>
            The calculator was built around one simple question that millions of workers ask every day: 
            "What time do I get off?" Our goal is to answer that question in under 5 seconds, with no 
            account required, no ads blocking the tool, and no unnecessary complexity.
          </p>
          <p>
            Beyond the core clock-out calculator, we've built tools for weekly timecards, overtime pay 
            calculation, hours-between-times, and specialized calculators for common shift lengths (4, 6, 
            8, 10, and 12-hour shifts). All calculations run locally in your browser — no data is sent 
            to any server.
          </p>
          <p>
            We follow federal FLSA guidelines and California overtime law for our overtime calculations. 
            Labor law varies by state and industry — always consult your state's labor board or an employment 
            attorney for specific legal guidance.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href="/" className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-opacity">
            Use the Calculator
          </Link>
          <Link href="/contact" className="px-4 py-2 rounded-lg border border-border text-foreground text-sm font-medium hover:bg-muted/50 transition-colors">
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
