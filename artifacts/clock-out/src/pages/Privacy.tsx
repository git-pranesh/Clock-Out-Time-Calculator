import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";

const LAST_UPDATED = "May 2026";

export default function Privacy() {
  return (
    <>
      <SEOHead
        title="Privacy Policy | Clock Out Time Calculator"
        description="Privacy policy for the Clock Out Time Calculator. We do not collect personal data. All calculations run locally in your browser — your shift times never leave your device."
        path="/privacy-policy"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]}
      />
      <div className="space-y-6">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy-policy" }]} />

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground/80">Last updated {LAST_UPDATED}</p>
        </div>

        <div className="bg-card border border-card-border rounded-xl p-6 space-y-5 text-sm text-muted-foreground">
          <p>
            ClockOut (clockouttime.com) is built with privacy as a foundational design choice. This
            policy explains exactly what we do and don't collect, and how the site works under the
            hood so you can verify our claims yourself.
          </p>

          <section>
            <h2 className="font-semibold text-foreground mb-2">1. Data we collect</h2>
            <p>
              <strong className="text-foreground">None of your inputs.</strong> Start times, shift
              lengths, break durations, hourly rates, and timecard entries are processed entirely
              in your browser using JavaScript. They are never transmitted to our servers, logged,
              or stored. You can verify this by opening your browser's network tab while using the
              calculator — no requests are sent when you change inputs.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">2. Cookies and local storage</h2>
            <p>
              We do not use tracking cookies or third-party advertising cookies. The site may store
              minimal preferences in your browser's local storage — for example, your 12-hour vs.
              24-hour format choice — so the tool remembers them on your next visit. These values
              never leave your device.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">3. Analytics</h2>
            <p>
              We may use privacy-respecting, anonymized page-view analytics (such as Plausible or a
              similar cookieless analytics tool) to understand which calculators are most useful.
              This data is aggregated and cannot be used to identify individual users. We do not
              run Google Analytics, Facebook Pixel, or any behavioral-tracking scripts.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">4. Third parties and ads</h2>
            <p>
              We do not sell, rent, or share user data with third parties. We do not run targeted
              advertising or behavioral retargeting. The site loads a single Google Fonts stylesheet
              (Inter) and otherwise has no third-party scripts.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">5. Contact form</h2>
            <p>
              If you fill out the contact form on /contact, the name, email, and message you enter
              are sent to our team email so we can respond to you. We use this only to reply and
              improve the tool — we do not add you to any marketing list.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">6. Children's privacy</h2>
            <p>
              ClockOut is intended for general audiences and is safe for use by people of all ages.
              We do not knowingly collect any personal information from children under 13.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">7. Changes to this policy</h2>
            <p>
              If we update this privacy policy, the "Last updated" date at the top of the page will
              change. Material changes will be summarized in a notice on the homepage for at least
              30 days.
            </p>
          </section>

          <section>
            <h2 className="font-semibold text-foreground mb-2">8. Contact</h2>
            <p>
              Questions about this privacy policy? Use the contact form at <a href="/contact" className="underline hover:text-accent">/contact</a> or
              reach us via the email address listed there.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
