import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Clock, Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/timecard-calculator", label: "Timecard" },
  { href: "/overtime-calculator", label: "Overtime" },
  { href: "/about", label: "About" },
];

const footerLinks = [
  { href: "/8-hour-shift-calculator", label: "8-Hour Shift" },
  { href: "/10-hour-shift-calculator", label: "10-Hour Shift" },
  { href: "/12-hour-shift-calculator", label: "12-Hour Shift" },
  { href: "/night-shift-calculator", label: "Night Shift" },
  { href: "/work-hours-calculator", label: "Work Hours" },
  { href: "/timecard-calculator", label: "Timecard" },
  { href: "/overtime-calculator", label: "Overtime" },
  { href: "/time-and-a-half-calculator", label: "Time & a Half" },
  { href: "/double-time-calculator", label: "Double Time" },
  { href: "/break-time-calculator", label: "Break Time" },
  { href: "/what-time-do-i-clock-out", label: "What Time Do I Clock Out" },
  { href: "/how-many-hours-did-i-work", label: "How Many Hours Did I Work" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [location] = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-md">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl hover:opacity-90 transition-opacity">
            <Clock className="w-6 h-6 text-accent" />
            <span>ClockOut</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" data-testid="main-nav">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-accent ${location === link.href ? "text-accent" : "text-primary-foreground/80"}`}
                data-testid={`nav-${link.label.toLowerCase()}`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            className="md:hidden p-2 rounded-md hover:bg-primary-foreground/10 transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            data-testid="button-mobile-menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden border-t border-primary-foreground/20 bg-primary" data-testid="mobile-nav">
            <nav className="max-w-4xl mx-auto px-4 py-3 flex flex-col gap-1">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`py-2 px-3 rounded-md text-sm font-medium transition-colors hover:bg-primary-foreground/10 ${location === link.href ? "text-accent" : "text-primary-foreground/80"}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {children}
        </div>
      </main>

      <footer className="bg-primary text-primary-foreground mt-12">
        <div className="max-w-4xl mx-auto px-4 py-10">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="w-5 h-5 text-accent" />
            <span className="font-bold text-lg">ClockOut</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 mb-8">
            {footerLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-primary-foreground/70 hover:text-accent transition-colors py-1"
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="border-t border-primary-foreground/20 pt-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-primary-foreground/60">
            <p>© {new Date().getFullYear()} ClockOut Time Calculator. Free to use.</p>
            <div className="flex gap-4">
              <Link href="/about" className="hover:text-accent transition-colors">About</Link>
              <Link href="/privacy-policy" className="hover:text-accent transition-colors">Privacy</Link>
              <Link href="/contact" className="hover:text-accent transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
