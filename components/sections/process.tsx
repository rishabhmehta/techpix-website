import { Badge } from '@/components/ui/badge';
import { Compass, FileText, Bot, Palette, Repeat, Rocket } from 'lucide-react';

const FOUNDATION = [
  { icon: Compass, label: 'Requirement analysis' },
  { icon: FileText, label: 'Project documentation' },
  { icon: Bot, label: 'Rapid AI prototyping' },
  { icon: Palette, label: 'Design & UX' },
];

const ITERATION = [
  { icon: Rocket, label: 'AI‑assisted development' },
  { icon: Repeat, label: '1–2 week sprints' },
  { icon: FileText, label: 'Feedback & QA cycle' },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="mb-10 text-center md:mb-14">
        <Badge variant="accent" className="mb-3">
          How We Deliver
        </Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          A Pragmatic, Outcome‑Focused Process
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
          Foundations first, then rapid iteration with measurable impact.
        </p>
      </div>

      <div className="grid items-stretch gap-4 md:grid-cols-2">
        <div className="bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Foundational Stage</h3>
            <span className="text-muted-foreground text-xs">1–2 weeks</span>
          </div>
          <ul className="grid gap-3">
            {FOUNDATION.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="border-primary/30 text-primary/80 bg-background/60 flex size-8 items-center justify-center rounded-md border">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm md:text-[15px]">{label}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Iterative Delivery</h3>
            <span className="text-muted-foreground text-xs">
              1–2 week sprints
            </span>
          </div>
          <ul className="grid gap-3">
            {ITERATION.map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="border-primary/30 text-primary/80 bg-background/60 flex size-8 items-center justify-center rounded-md border">
                  <Icon className="size-4" />
                </span>
                <span className="text-sm md:text-[15px]">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
