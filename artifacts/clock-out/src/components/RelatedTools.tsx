import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

interface RelatedPage {
  path: string;
  label: string;
}

interface RelatedToolsProps {
  pages: RelatedPage[];
}

export function RelatedTools({ pages }: RelatedToolsProps) {
  return (
    <section className="mt-10 pt-8 border-t border-border" data-testid="related-tools">
      <h2 className="text-lg font-semibold text-foreground mb-4">Related Tools</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {pages.map(page => (
          <Link
            key={page.path}
            href={page.path}
            className="flex items-center justify-between gap-2 px-4 py-3 rounded-lg border border-border bg-card hover:border-accent hover:bg-accent/5 transition-colors group"
            data-testid={`link-related-${page.path.replace(/\//g, "")}`}
          >
            <span className="text-sm font-medium text-foreground group-hover:text-accent transition-colors">
              {page.label}
            </span>
            <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors flex-shrink-0" />
          </Link>
        ))}
      </div>
    </section>
  );
}
