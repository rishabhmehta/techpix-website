'use client';

import * as React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';

export function ContactSection() {
  const [open, setOpen] = React.useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = (data.get('name') as string) || '';
    const email = (data.get('email') as string) || '';
    const message = (data.get('message') as string) || '';

    const subject = encodeURIComponent(
      `New inquiry from ${name || 'Techpix website'}`,
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:hi@techpix.in?subject=${subject}&body=${body}`;
    setOpen(false);
  };

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

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <a
            href="https://calendly.com/techpix/30min"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="px-8">Schedule a Call</Button>
          </a>
          <a href="mailto:hi@techpix.in">
            <Button
              asChild
              variant="outline"
              className="border-primary/40 text-primary hover:border-primary/60 hover:bg-primary/10"
            >
              Email Us
            </Button>
          </a>

          <Drawer direction="right" open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="secondary" className="px-8">
                Get in Touch
              </Button>
            </DrawerTrigger>
            <DrawerContent className="max-w-md">
              <DrawerHeader className="border-b">
                <DrawerTitle>Contact us</DrawerTitle>
                <DrawerDescription>
                  Tell us a bit about your project and we&apos;ll get back to
                  you.
                </DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <form onSubmit={handleSubmit} className="grid gap-4">
                  <div className="grid gap-2 text-left">
                    <label htmlFor="name" className="text-sm font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus:ring-primary/30 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-2 text-left">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus:ring-primary/30 w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div className="grid gap-2 text-left">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      placeholder="Briefly describe your idea, timeline, and goals."
                      className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring focus:ring-primary/30 w-full resize-y rounded-md border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-end gap-2">
                    <DrawerClose asChild>
                      <Button type="button" variant="outline">
                        Cancel
                      </Button>
                    </DrawerClose>
                    <Button type="submit">Send</Button>
                  </div>
                </form>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </section>
  );
}
