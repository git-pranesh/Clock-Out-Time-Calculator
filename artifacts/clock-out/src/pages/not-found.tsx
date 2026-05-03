import { Link } from "wouter";
import { AlertCircle } from "lucide-react";
import { SEOHead } from "@/components/SEOHead";

export default function NotFound() {
  return (
    <>
      <SEOHead
        title="Page Not Found | Clock Out Time Calculator"
        description="The page you're looking for doesn't exist. Return to the Clock Out Time Calculator home page."
        path="/404"
        noindex
      />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-accent/10 text-accent mb-6">
          <AlertCircle className="w-8 h-8" aria-hidden="true" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
          Page not found
        </h1>
        <p className="text-muted-foreground mb-8">
          The page you're looking for doesn't exist or may have moved.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Back to home
          </Link>
          <Link
            href="/timecard-calculator"
            className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            Timecard calculator
          </Link>
          <Link
            href="/overtime-calculator"
            className="inline-flex items-center justify-center min-h-11 px-5 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium hover:bg-muted transition-colors"
          >
            Overtime calculator
          </Link>
        </div>
      </main>
    </>
  );
}
