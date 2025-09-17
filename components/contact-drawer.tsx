'use client';

import * as React from 'react';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
} from '@/components/ui/drawer';
import { Button } from '@/components/ui/button';

// Responsive contact drawer: bottom on mobile, right on >=sm screens
export function ContactDrawer() {
  const [open, setOpen] = React.useState(false);

  // Media query hook to switch drawer direction responsively
  function useMediaQuery(query: string) {
    const [matches, setMatches] = React.useState(false);
    React.useEffect(() => {
      // Guard for SSR
      if (
        typeof window === 'undefined' ||
        typeof window.matchMedia === 'undefined'
      ) {
        return;
      }
      const mql = window.matchMedia(query);
      const onChange = (e: MediaQueryListEvent) => {
        setMatches(e.matches);
      };
      // Fallback typed handler for deprecated APIs (older Safari)
      function onChangeLegacy(this: MediaQueryList, ev: MediaQueryListEvent) {
        setMatches(ev.matches);
      }
      // Set initial
      setMatches(mql.matches);
      // Add listener with fallback for older Safari
      if (mql.addEventListener) {
        mql.addEventListener('change', onChange);
      } else {
        mql.addListener(onChangeLegacy);
      }
      return () => {
        if (mql.removeEventListener) {
          mql.removeEventListener('change', onChange);
        } else {
          mql.removeListener(onChangeLegacy);
        }
      };
    }, [query]);
    return matches;
  }

  const isDesktop = useMediaQuery('(min-width: 640px)'); // Tailwind 'sm'
  const direction: 'bottom' | 'right' = isDesktop ? 'right' : 'bottom';

  // Use CSS to control which content renders per breakpoint.
  // We render two Drawer instances that share state; only one is visible at a time.
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

  const Form = (
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
  );

  return (
    <Drawer direction={direction} open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="secondary" className="px-8">
          Get in Touch
        </Button>
      </DrawerTrigger>
      <DrawerContent className={isDesktop ? 'max-w-md' : undefined}>
        <DrawerHeader className="border-b">
          <DrawerTitle>Contact us</DrawerTitle>
          <DrawerDescription>
            Tell us a bit about your project and we&apos;ll get back to you.
          </DrawerDescription>
        </DrawerHeader>
        {Form}
      </DrawerContent>
    </Drawer>
  );
}
