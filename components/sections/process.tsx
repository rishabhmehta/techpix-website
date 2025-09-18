import { Badge } from '@/components/ui/badge';
import {
  Compass,
  FileText,
  Bot,
  Palette,
  Repeat,
  Rocket,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';

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

      {/* Foundational timeline */}
      <div className="bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Foundational Process</h3>
          <span className="text-muted-foreground text-xs">
            Duration: 1–2 weeks
          </span>
        </div>

        <div className="-mx-2 pb-2">
          <ol
            className="mx-2 flex flex-wrap items-start justify-center gap-6 md:gap-8"
            aria-label="Foundational steps timeline"
          >
            {FOUNDATION.map(({ icon: Icon, title, points }, idx) => (
              <li key={title} className="flex items-center">
                <div className="flex w-[130px] flex-col items-center text-center sm:w-[146px] md:w-[160px]">
                  <div className="bg-primary/10 text-primary ring-primary/20 flex size-16 items-center justify-center rounded-full ring-1 md:size-20">
                    <Icon className="size-6" />
                  </div>
                  <div className="mt-3 text-sm font-medium md:text-[15px]">
                    {title}
                  </div>
                  <p className="text-muted-foreground mt-1 text-xs md:text-[13px]">
                    {points[0]}
                  </p>
                </div>
                {idx < FOUNDATION.length - 1 && (
                  <div className="mx-2 hidden items-center md:flex">
                    <div className="bg-border h-px w-8" />
                    <ChevronRight className="text-muted-foreground/70 ml-1 size-4" />
                    <div className="bg-border ml-1 h-px w-8" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Down arrow separator */}
      <div className="my-8 flex items-center justify-center">
        <div className="bg-border h-px w-10" />
        <ArrowDown className="text-muted-foreground/70 mx-3 size-5" />
        <div className="bg-border h-px w-10" />
      </div>

      {/* Iterative process – circular dashed items */}
      <div className="bg-card/60 relative overflow-hidden rounded-2xl border p-6 shadow-sm">
        <div className="mb-8 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Iterative Process</h3>
          <span className="text-muted-foreground text-xs">
            Duration: 1–2 weeks sprint
          </span>
        </div>

        <div className="flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-12">
          {ITERATION.map(({ icon: Icon, title, points }, idx) => (
            <div
              key={title}
              className="relative flex flex-col items-center text-center"
            >
              <div className="border-primary/30 bg-background/60 flex size-28 items-center justify-center rounded-full border-2 border-dashed md:size-32">
                <Icon className="text-primary size-7" />
              </div>
              <div className="mt-3 text-sm font-medium md:text-[15px]">
                {title}
              </div>
              <p className="text-muted-foreground mt-1 max-w-[14rem] text-xs md:text-[13px]">
                {points[2] || points[0]}
              </p>

              {/* subtle curved/looping hint between items on larger screens */}
              {idx === 0 && (
                <Repeat className="text-muted-foreground/50 absolute top-8 -right-8 hidden rotate-12 md:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
