import { HeroSection } from '@/components/sections/hero';
import { FeaturesSection } from '@/components/sections/features';
import { ProcessSection } from '@/components/sections/process';
import { TeamSection } from '@/components/sections/team';
import { ProjectsSection } from '@/components/sections/projects';
import { ContactSection } from '@/components/sections/contact';

export default function Home() {
  return (
    <main className="flex flex-col scroll-smooth">
      <HeroSection />
      <FeaturesSection />
      <ProcessSection />
      <ProjectsSection />
      <TeamSection />
      <ContactSection />
      <footer className="text-muted-foreground mx-auto mt-20 w-full max-w-6xl px-4 pb-16 text-center text-xs">
        <p>
          © {new Date().getFullYear()} Techpix. Built with care. All rights
          reserved.
        </p>
      </footer>
    </main>
  );
}
