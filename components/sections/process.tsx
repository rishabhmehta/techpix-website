import { Badge } from '@/components/ui/badge';
import { Compass, FileText, Bot, Palette, Repeat, Rocket } from 'lucide-react';

type Step = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  points: string[];
};

const FOUNDATION: Step[] = [
  {
    icon: Compass,
    title: 'Requirement Analysis',
    points: [
      'Understand project objectives clearly.',
      'Discuss project requirements thoroughly.',
      'Align expectations with deliverables.',
    ],
  },
  {
    icon: FileText,
    title: 'Project Documentation',
    points: [
      'Create a detailed AI-assisted PRD.',
      'Outline all project stages.',
      'Set clear milestones and goals.',
    ],
  },
  {
    icon: Bot,
    title: 'Rapid AI Prototyping',
    points: [
      'Validate AI-driven business ideas.',
      'Draft wireframes & mockups.',
      'Showcase core features with AI.',
    ],
  },
  {
    icon: Palette,
    title: 'Design Phase',
    points: [
      'Create wireframes for clarity.',
      'Define the brand language.',
      'Finalize and refine the designs.',
    ],
  },
];

const ITERATION: Step[] = [
  {
    icon: Rocket,
    title: 'AI‑Assisted Development',
    points: [
      'Build fast with AI tools.',
      'Develop business photography.',
      'Integrate features using AI.',
    ],
  },
  {
    icon: Repeat,
    title: 'Feedback Cycle',
    points: [
      'Conduct regular internal sprints.',
      'Test features after implementation.',
      'Gather and integrate feedback.',
    ],
  },
];

export function ProcessSection() {
  return (
    <section
      id="process"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="mb-10 text-center md:mb-14">
        <Badge variant="accent" className="mb-3">
          How we Deliver
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
            <h3 className="text-lg font-semibold">Foundational Process</h3>
            <span className="text-muted-foreground text-xs">
              Duration: 1–2 weeks
            </span>
          </div>
          <ul className="grid gap-4">
            {FOUNDATION.map(({ icon: Icon, title, points }) => (
              <li key={title} className="flex gap-3">
                <span className="border-primary/30 text-primary/80 bg-background/60 mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border">
                  <Icon className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-medium md:text-[15px]">
                    {title}
                  </div>
                  <ul className="text-muted-foreground mt-1 ml-4 list-disc space-y-0.5 text-xs md:text-[13px]">
                    {points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Iterative Process</h3>
            <span className="text-muted-foreground text-xs">
              Duration: 1–2 weeks sprint
            </span>
          </div>
          <ul className="grid gap-4">
            {ITERATION.map(({ icon: Icon, title, points }) => (
              <li key={title} className="flex gap-3">
                <span className="border-primary/30 text-primary/80 bg-background/60 mt-1 flex size-8 shrink-0 items-center justify-center rounded-md border">
                  <Icon className="size-4" />
                </span>
                <div>
                  <div className="text-sm font-medium md:text-[15px]">
                    {title}
                  </div>
                  <ul className="text-muted-foreground mt-1 ml-4 list-disc space-y-0.5 text-xs md:text-[13px]">
                    {points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
