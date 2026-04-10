import { ReactNode } from "react";

export function SectionHeader({ eyebrow, title, description, action }: { eyebrow: string; title: ReactNode; description?: string; action?: ReactNode }) {
  return (
    <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div className="max-w-3xl">
        <div className="eyebrow">{eyebrow}</div>
        <h2 className="heading-lg">{title}</h2>
        {description ? <p className="subtle-text mt-3 max-w-2xl">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}
