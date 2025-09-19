// import PillNav from './PillNav';
import { MenuFluid } from './ui/menu-fluid';
import Link from 'next/link';
// import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from '@/components/ui/drawer';

const NavItems = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'Projects', href: '#projects' },
  // { label: 'Team', href: '#team' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  return (
    <>
      {/* Mobile Header */}
      <div className="fixed inset-x-0 top-4 z-50 h-16 md:hidden">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-between px-4">
          {/* Pill background container to keep header background on mobile */}
          <div className="flex w-full items-center justify-between rounded-full border border-[var(--border)] p-1 pr-2 pl-2 [box-shadow:0_6px_16px_color-mix(in_oklab,var(--color-ring),transparent_88%)] [background:var(--base,var(--background))] dark:[border-color:color-mix(in_oklab,var(--border),transparent_20%)] dark:[box-shadow:0_4px_12px_rgba(0,0,0,0.18)] dark:[background:var(--base,var(--muted))]">
            {/* Left: Logo with text */}
            <Link
              href="/"
              aria-label="Home"
              className="inline-flex h-10 w-fit items-center justify-center overflow-hidden rounded-full p-2"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logo.png"
                alt="Company Logo"
                width={40}
                height={40}
                className="size-7"
              />
              <span className="ml-2 text-base font-semibold text-zinc-900 dark:text-zinc-50">
                Techpix
              </span>
            </Link>

            {/* Right: Theme toggle + Hamburger */}
            <div className="flex items-center gap-1">
              <ThemeToggle
                variant="ghost"
                className="h-10 w-10 border-0 bg-transparent"
              />

              <Drawer direction="right">
                <DrawerTrigger asChild>
                  <button
                    type="button"
                    aria-label="Open menu"
                    className="text-foreground hover:bg-muted/60 inline-flex h-10 w-10 items-center justify-center rounded-full"
                  >
                    {/* Hamburger Icon */}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-5"
                    >
                      <line x1="3" y1="6" x2="21" y2="6" />
                      <line x1="3" y1="12" x2="21" y2="12" />
                      <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                  </button>
                </DrawerTrigger>
                <DrawerContent className="p-2">
                  <nav className="space-y-1 p-2">
                    {NavItems.map((item) => (
                      <DrawerClose asChild key={item.label}>
                        <Link
                          href={item.href}
                          className="text-foreground hover:bg-muted block rounded-lg px-4 py-3 text-base font-medium"
                        >
                          {item.label}
                        </Link>
                      </DrawerClose>
                    ))}
                  </nav>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Header */}
      <div className="fixed inset-x-0 top-4 z-50 hidden h-16 md:block">
        <div className="relative mx-auto flex h-full max-w-7xl items-center justify-center px-4">
          <MenuFluid
            menuItems={NavItems}
            className="border border-[var(--border)] [box-shadow:0_6px_16px_color-mix(in_oklab,var(--color-ring),transparent_88%)] [background:var(--base,var(--background))] dark:[border-color:color-mix(in_oklab,var(--border),transparent_20%)] dark:[box-shadow:0_4px_12px_rgba(0,0,0,0.18)] dark:[background:var(--base,var(--muted))]"
            indicatorClassName="hover:text-accent-foreground"
            leftContent={
              <Link
                href="/"
                aria-label="Home"
                className="inline-flex h-10 w-fit items-center justify-center overflow-hidden rounded-full p-2"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logo.png"
                  alt="Company Logo"
                  width={100}
                  height={100}
                  className="size-8"
                />
                <span className="ml-2 hidden text-base font-semibold text-zinc-900 sm:block dark:text-zinc-50">
                  Techpix
                </span>
              </Link>
            }
            rightContent={
              <ThemeToggle
                variant="ghost"
                className="h-10 w-10 border-0 bg-transparent"
              />
            }
          />
        </div>
      </div>
    </>
  );
}
