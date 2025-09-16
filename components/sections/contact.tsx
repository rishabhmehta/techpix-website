import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ContactSection() {
  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-5xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="from-background via-primary/10 to-background dark:via-primary/25 relative overflow-hidden rounded-2xl border bg-gradient-to-br p-8 text-center shadow-md sm:p-12">
        <div className="pointer-events-none absolute inset-0 -z-10 [background:radial-gradient(circle_at_35%_55%,oklch(0.94_0.035_259_/_0.35)_0%,oklch(1_0_0_/_0)_60%),radial-gradient(circle_at_70%_35%,oklch(0.97_0.015_260_/_0.25)_0%,oklch(1_0_0_/_0)_55%)] dark:[background:radial-gradient(circle_at_55%_50%,oklch(0.33_0.04_260_/_0.55)_0%,oklch(0.2046_0_0_/_0)_75%)]" />
        <Badge variant="accent" className="mb-3">
          Contact Us
        </Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Ready to Turn Your Idea into Reality?
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
          We&apos;re here to listen and help you bring your project to life.
          Tell us how we can help.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 text-sm md:text-base">
          <a
            href="mailto:hi@techpix.in"
            className="text-primary hover:underline"
          >
            hi@techpix.in
          </a>
          <a href="tel:+919660099678" className="text-primary hover:underline">
            +91 966‑009‑9678
          </a>
          <a
            href="https://techpix.in"
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-foreground"
          >
            techpix.in
          </a>
        </div>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <Button className="px-8">Schedule a Call</Button>
          <Button
            variant="outline"
            className="border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10"
          >
            Email Us
          </Button>
          <Button variant="secondary" className="px-8">
            Get in Touch
          </Button>
        </div>
      </div>
    </section>
  );
}
