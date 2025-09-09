import {
  Code,
  Smartphone,
  Server,
  BarChart3,
  Layers,
  Gauge,
} from 'lucide-react';

const FEATURES = [
  {
    icon: Code,
    title: 'Web Applications',
    desc: 'Modern, accessible and SEO‑driven React/Next.js apps optimized for performance.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Apps',
    desc: 'Cross‑platform native experiences for iOS & Android with smooth UX.',
  },
  {
    icon: Server,
    title: 'Backend Services',
    desc: 'Low‑latency APIs, microservices & event pipelines that scale predictably.',
  },
  {
    icon: Layers,
    title: 'ERP & Integrations',
    desc: 'Custom ERP modules, data sync & workflow automation across systems.',
  },
  {
    icon: BarChart3,
    title: 'Dashboards & Data',
    desc: 'Real‑time analytics, metrics visualization & operational intelligence.',
  },
  {
    icon: Gauge,
    title: 'SRE & Optimization',
    desc: 'Observability, performance tuning & cost efficiency baked in.',
  },
];

export function FeaturesSection() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl px-4 py-10 md:py-16"
    >
      <div className="mb-10 flex flex-col items-center text-center md:mb-14">
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          What We Build
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
          End‑to‑end product engineering: from concept to launch to reliable
          operation.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group bg-card/60 hover:border-primary/40 hover:bg-card relative overflow-hidden rounded-xl border p-5 shadow-sm backdrop-blur-sm transition"
          >
            <div className="border-primary/30 bg-background/60 text-primary group-hover:border-primary/50 group-hover:text-primary/90 mb-4 flex size-10 items-center justify-center rounded-full border shadow-sm group-hover:scale-110">
              <Icon className="size-5" />
            </div>
            <h3 className="font-medium">{title}</h3>
            <p className="text-muted-foreground mt-1 text-xs leading-relaxed md:text-sm">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
