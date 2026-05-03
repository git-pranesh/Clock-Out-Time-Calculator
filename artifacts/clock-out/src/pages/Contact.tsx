import { useState } from "react";
import { SEOHead } from "@/components/SEOHead";
import { CheckCircle } from "lucide-react";

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
        title="Contact - Clock Out Time Calculator"
        description="Contact the Clock Out Time Calculator team with questions, feedback, or suggestions."
        path="/contact"
        faqs={[]}
        breadcrumbs={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact" }]}
      />
      <div className="space-y-8 max-w-lg">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Contact Us</h1>
          <p className="text-muted-foreground">Questions, feedback, or spotted an error in our calculations? Let us know.</p>
        </div>

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
