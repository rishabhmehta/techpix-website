import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export function SiteHeader() {
  return (
    <header className="supports-[backdrop-filter]:bg-background/70 sticky top-0 z-40 w-full border-b backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-6 px-4">
        <Link href="/" className="font-semibold tracking-tight">
          <span className="text-primary">Techpix</span>
        </Link>
        <nav className="ml-auto hidden gap-6 text-sm md:flex">
          <Link
            href="#services"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Services
          </Link>
          <Link
            href="#process"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Process
          </Link>
          <Link
            href="#projects"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Projects
          </Link>
          <Link
            href="#team"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Team
          </Link>
          <Link
            href="#contact"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Contact
          </Link>
          <Link
            href="#cta"
            className="text-muted-foreground hover:text-foreground transition"
          >
            Start a Project
          </Link>
        </nav>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
