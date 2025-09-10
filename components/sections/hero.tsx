import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Rocket, Sparkles } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative mx-auto flex w-full max-w-6xl flex-col items-center gap-9 overflow-hidden px-4 pt-24 pb-24 text-center md:pt-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        {/* Soft radial glow background (adapts to theme) */}
        <div className="absolute inset-0 [background:radial-gradient(ellipse_at_top,_color-mix(in_srgb,_var(--color-primary)_24%,_transparent)_0%,_transparent_60%)] dark:[background:radial-gradient(ellipse_at_top,_color-mix(in_srgb,_var(--color-primary)_32%,_transparent)_0%,_transparent_55%)]" />

        {/* Blurred color orbs for depth */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[color-mix(in_oklab,_var(--color-accent)_35%,_transparent)] blur-3xl" />
        <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-[color-mix(in_oklab,_var(--color-primary)_30%,_transparent)] blur-3xl" />

        {/* Subtle grid texture with radial mask fade */}
        <svg
          className="text-foreground/70 absolute inset-0 h-full w-full [mask-image:radial-gradient(100%_100%_at_50%_20%,_black,_transparent)] opacity-[0.08]"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
          aria-hidden
        >
          <defs>
            <pattern
              id="grid"
              width="40"
              height="40"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M 40 0 L 0 0 0 40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-9">
        <Badge variant="accent" className="gap-1">
          <Sparkles className="size-3" /> Building Digital Experiences
        </Badge>
        <p className="text-primary/80 dark:text-primary/70 text-xs font-medium tracking-[0.25em]">
          YOUR EXPONENTIAL GROWTH PARTNER
        </p>
        <h1 className="from-foreground via-foreground to-foreground/80 max-w-5xl bg-gradient-to-b bg-clip-text font-serif text-4xl leading-tight font-bold tracking-tight text-balance text-transparent md:text-5xl lg:text-6xl">
          Engineering Websites, Mobile Apps & Real‑time Platforms
        </h1>
        <p className="text-muted-foreground max-w-2xl text-sm leading-relaxed text-balance md:text-base">
          Techpix is a product engineering studio crafting fast, scalable and
          delightful software: marketing sites, SaaS web apps, iOS & Android
          apps, backend services, ERPs and data‑rich dashboards.
        </p>
        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <Button className="shadow-primary/25 gap-2 text-sm shadow-md md:text-base">
            <Rocket className="size-4" /> Start a Project
          </Button>
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10 text-sm md:text-base"
          >
            View Work
          </Button>
        </div>
        <ul className="mt-12 grid w-full grid-cols-2 gap-4 text-left text-xs md:grid-cols-4">
          {[
            ['50+ Projects', 'Delivered across domains'],
            ['<150ms', 'Global median response time'],
            ['99.95% Uptime', 'Reliability focused'],
            ['Senior Team', 'Craft + speed'],
          ].map(([stat, label]) => (
            <li
              key={stat}
              className="bg-card/60 hover:bg-primary/5 hover:border-primary/40 rounded-lg border p-3 backdrop-blur-sm transition-colors"
            >
              <p className="font-semibold">{stat}</p>
              <p className="text-muted-foreground text-[11px]">{label}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
