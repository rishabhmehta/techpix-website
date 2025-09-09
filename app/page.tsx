import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { CTASection } from '@/components/sections/cta';

export default function Home() {
  return (
    <main className="flex flex-col">
      <HeroSection />
      <FeaturesSection />
      <CTASection />
      <footer className="text-muted-foreground mx-auto mt-20 w-full max-w-6xl px-4 pb-16 text-center text-xs">
        <p>
          © {new Date().getFullYear()} Techpix. Built with care. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
