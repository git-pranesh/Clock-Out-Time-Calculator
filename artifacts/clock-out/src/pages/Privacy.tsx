import { SEOHead } from "@/components/SEOHead";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy - Clock Out Time Calculator"
        description="Privacy policy for Clock Out Time Calculator. We don't collect personal data. All calculations run in your browser."
        path="/privacy-policy"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        <div className="bg-card border border-card-border rounded-xl p-6 space-y-4 text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Last updated: {new Date().getFullYear()}</p>
          <section>
            <h2 className="font-semibold text-foreground mb-2">Data Collection</h2>
            <p>ClockOut does not collect, store, or transmit any personal data. All calculations are performed locally in your browser. We do not have access to the times you enter or any results the calculator produces.</p>
          </section>
          <section>
            <h2 className="font-semibold text-foreground mb-2">Cookies</h2>
            <p>We do not use tracking cookies. The site may use essential cookies for basic functionality (such as remembering your 12h/24h preference), but these are stored locally on your device and not shared with any third party.</p>
          </section>
          <section>
            <h2 className="font-semibold text-foreground mb-2">Analytics</h2>
            <p>We may use anonymized page view analytics to understand which calculator pages are most useful. This data is aggregated and cannot be used to identify individual users.</p>
          </section>
          <section>
            <h2 className="font-semibold text-foreground mb-2">Third Parties</h2>
            <p>We do not sell or share your data with any third parties. We do not run targeted advertising or behavioral tracking.</p>
          </section>
          <section>
            <h2 className="font-semibold text-foreground mb-2">Contact</h2>
            <p>If you have questions about this privacy policy, please use our contact page.</p>
          </section>
        </div>
      </div>
    </>
  );
}
