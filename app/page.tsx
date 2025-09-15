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
    </main>
  );
}
