// import PillNav from './PillNav';
import { MenuFluid } from './ui/menu-fluid';
import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

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
      {/* Using MenuFluid for the nav bar, with logo and theme toggle inside */}
      <div className="fixed inset-x-0 top-4 z-50 h-16">
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
                <Image
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
