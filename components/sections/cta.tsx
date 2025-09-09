import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export function CTASection() {
  return (
    <section
      id="cta"
      className="from-background via-primary/10 to-background dark:via-primary/25 relative mx-auto w-full max-w-5xl overflow-hidden rounded-2xl border bg-gradient-to-br px-6 py-16 text-center shadow-md sm:px-10"
    >
      <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_30%_55%,oklch(0.94_0.035_259_/_0.45)_0%,oklch(1_0_0_/_0)_65%),radial-gradient(circle_at_80%_35%,oklch(0.97_0.015_260_/_0.35)_0%,oklch(1_0_0_/_0)_60%)] dark:[background:radial-gradient(circle_at_55%_50%,oklch(0.33_0.04_260_/_0.55)_0%,oklch(0.2046_0_0_/_0)_75%)]" />
      <Badge variant="accent" className="mb-4">
        Ready When You Are
      </Badge>
      <h2 className="from-foreground to-foreground/85 bg-gradient-to-b bg-clip-text font-serif text-3xl font-bold tracking-tight text-transparent md:text-4xl">
        Let&apos;s Ship Something Great
      </h2>
      <p className="text-primary/75 dark:text-primary/60 mt-2 text-[10px] font-semibold tracking-[0.3em] md:text-[11px]">
        YOUR EXPONENTIAL GROWTH PARTNER
      </p>
      <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
        We plug into your roadmap or help you define it. Senior engineers,
        pragmatic processes, measurable outcomes.
      </p>
      <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
        <Button className="shadow-primary/25 px-8 shadow-md">
          Book a Call
        </Button>
        <Button
          variant="outline"
          className="border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10"
        >
          Download Capability Deck
        </Button>
      </div>
    </section>
  );
}
