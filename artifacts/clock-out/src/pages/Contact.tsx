import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { CheckCircle, Mail, MessageSquare, Bug } from "lucide-react";

const LAST_UPDATED = "May 2026";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <SEOHead
        title="Contact ClockOut - Send Us Feedback or Report a Bug"
        description="Contact the ClockOut team. Send feedback, report a calculation issue, or suggest a new tool. We read every message and reply within a few business days."
        path="/contact"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />
      <div className="space-y-6 max-w-2xl">
        <Breadcrumbs items={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]} />

        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Questions, feedback, or spotted an error in our calculations? Let us know.</p>
          <p className="text-xs text-muted-foreground/80 mt-1">Last updated {LAST_UPDATED}</p>
        </div>

        <section className="grid sm:grid-cols-3 gap-3">
          <div className="bg-card border border-card-border rounded-xl p-4 space-y-1.5">
            <Bug className="w-4 h-4 text-accent" />
            <p className="font-medium text-sm text-foreground">Report an error</p>
            <p className="text-xs text-muted-foreground">Calculation off? Tell us the inputs and the result you expected — we'll fix it fast.</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-4 space-y-1.5">
            <MessageSquare className="w-4 h-4 text-accent" />
            <p className="font-medium text-sm text-foreground">Suggest a calculator</p>
            <p className="text-xs text-muted-foreground">Have a shift pattern we don't cover yet? We add new tools every month based on requests.</p>
          </div>
          <div className="bg-card border border-card-border rounded-xl p-4 space-y-1.5">
            <Mail className="w-4 h-4 text-accent" />
            <p className="font-medium text-sm text-foreground">General questions</p>
            <p className="text-xs text-muted-foreground">Press, partnership, or anything else — we usually reply within 2 business days.</p>
          </div>
        </section>

        {submitted ? (
          <div className="bg-card border border-card-border rounded-xl p-8 text-center">
            <CheckCircle className="w-10 h-10 text-accent mx-auto mb-3" />
            <h2 className="font-semibold text-foreground text-lg mb-1">Message sent</h2>
            <p className="text-sm text-muted-foreground">Thanks for reaching out. We'll get back to you shortly.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-card border border-card-border rounded-xl p-6 space-y-4" data-testid="contact-form">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                placeholder="Your name"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="w-full h-11 px-4 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                data-testid="input-email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Message</label>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
                rows={5}
                placeholder="Your message..."
                className="w-full px-4 py-3 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                data-testid="input-message"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
              data-testid="button-submit"
            >
              Send Message
            </button>
          </form>
        )}
      </div>
    </>
  );
}
