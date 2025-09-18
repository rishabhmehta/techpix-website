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
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from '@/components/ui/select';

// Simple media query hook (avoids extra deps)
function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);
  React.useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia === 'undefined'
    )
      return;
    const mql = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    function onChangeLegacy(this: MediaQueryList, ev: MediaQueryListEvent) {
      setMatches(ev.matches);
    }
    // init
    setMatches(mql.matches);
    // subscribe (fallback for older Safari)
    if (mql.addEventListener) mql.addEventListener('change', onChange);
    else mql.addListener(onChangeLegacy);
    return () => {
      if (mql.removeEventListener) mql.removeEventListener('change', onChange);
      else mql.removeListener(onChangeLegacy);
    };
  }, [query]);
  return matches;
}

// Responsive contact drawer: bottom on mobile, right on >=sm screens
export function ContactDrawer() {
  const [open, setOpen] = React.useState(false);
  const [budget, setBudget] = React.useState('');
  const [referral, setReferral] = React.useState('');

  const isDesktop = useMediaQuery('(min-width: 640px)'); // Tailwind 'sm'
  const direction: 'bottom' | 'right' = isDesktop ? 'right' : 'bottom';

  // Use CSS to control which content renders per breakpoint.
  // We render two Drawer instances that share state; only one is visible at a time.
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = (data.get('firstName') as string) || '';
    const lastName = (data.get('lastName') as string) || '';
    const email = (data.get('email') as string) || '';
    const phone = (data.get('phone') as string) || '';
    const company = (data.get('company') as string) || '';
    const message = (data.get('message') as string) || '';

    const subject = encodeURIComponent(
      `New inquiry from ${[firstName, lastName].filter(Boolean).join(' ') || 'Techpix website'}`,
    );
    const body = encodeURIComponent(
      `First name: ${firstName}\nLast name: ${lastName}\nEmail: ${email}\nPhone: ${phone}\nCompany: ${company}\nBudget: ${budget}\nHeard about us: ${referral}\n\nMessage:\n${message}`,
    );
    window.location.href = `mailto:hi@techpix.in?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  const Form = (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="grid gap-4">
        {/* Hidden inputs for non-native Select values */}
        <input type="hidden" name="budget" value={budget} />
        <input type="hidden" name="referral" value={referral} />
        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="firstName" className="text-sm font-medium">
              First name
            </label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              required
              placeholder="Jane"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="lastName" className="text-sm font-medium">
              Last name
            </label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              required
              placeholder="Doe"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              placeholder="you@example.com"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="phone" className="text-sm font-medium">
              Phone
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              inputMode="tel"
              placeholder="+919876543210"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
          <div className="grid gap-2">
            <label htmlFor="company" className="text-sm font-medium">
              Company
            </label>
            <Input
              id="company"
              name="company"
              type="text"
              placeholder="Company name"
            />
          </div>
          <div className="grid gap-2">
            <label
              id="budget-label"
              htmlFor="budget-select"
              className="text-sm font-medium"
            >
              Budget
            </label>
            <Select value={budget} onValueChange={setBudget}>
              <SelectTrigger
                id="budget-select"
                aria-labelledby="budget-label"
                className="w-full"
              >
                <SelectValue placeholder="Select a range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="< ₹1L">Less than ₹1L</SelectItem>
                <SelectItem value="₹5L – ₹10L">₹5L – ₹10L</SelectItem>
                <SelectItem value="₹10L – ₹25L">₹10L – ₹25L</SelectItem>
                <SelectItem value="₹25L – ₹50L">₹25L – ₹50L</SelectItem>
                <SelectItem value="> ₹50L">More than ₹50L</SelectItem>
                <SelectItem value="Not sure">Not sure yet</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid gap-2 text-left">
          <label
            id="referral-label"
            htmlFor="referral-select"
            className="text-sm font-medium"
          >
            How did you hear about us?
          </label>
          <Select value={referral} onValueChange={setReferral}>
            <SelectTrigger
              id="referral-select"
              aria-labelledby="referral-label"
              className="w-full"
            >
              <SelectValue placeholder="Select an option" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Google">Google</SelectItem>
              <SelectItem value="LinkedIn">LinkedIn</SelectItem>
              <SelectItem value="Twitter/X">Twitter/X</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
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
            className="border-input bg-background placeholder:text-muted-foreground focus-visible:ring-ring w-full resize-y rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-[3px]"
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
