import { Link } from "wouter";

interface Crumb {
  name: string;
  path: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items.length < 2) return null;
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground" data-testid="breadcrumbs">
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={c.path} className="flex items-center gap-1.5">
              {last ? (
                <span className="text-foreground font-medium" aria-current="page">{c.name}</span>
              ) : (
                <>
                  <Link href={c.path} className="hover:text-accent underline-offset-2 hover:underline">{c.name}</Link>
                  <span aria-hidden="true" className="text-muted-foreground/50">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
