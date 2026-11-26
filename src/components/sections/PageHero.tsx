import type { CSSProperties, ReactNode } from "react";

type PageHeroProps = {
  id: string;
  lines: string[];
  lead: string;
  children?: ReactNode;
  tone?: "dark" | "wall";
};

/** Inner-page opening: a giant title whose lines rise out of a mask, then the lead. */
export function PageHero({ id, lines, lead, children, tone = "dark" }: PageHeroProps) {
  return (
    <section className={"page-hero page-hero--" + tone} aria-labelledby={id}>
      <div className="shell">
        <h1 id={id} className="page-hero__title" aria-label={lines.join(" ")}>
          {lines.map((line, index) => (
            <span className="line" key={line} aria-hidden="true">
              <span style={{ "--i": index } as CSSProperties}>{line}</span>
            </span>
          ))}
        </h1>
        <div className="page-hero__row">
          <p className="lead">{lead}</p>
          {children && <div className="page-hero__actions">{children}</div>}
        </div>
      </div>
    </section>
  );
}
