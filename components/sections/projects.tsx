import { Badge } from '@/components/ui/badge';
import SpotlightCard from '@/components/SpotlightCard';

type Industry = {
  name: string;
  tagline: string;
  description: string;
  tags: string[];
};

const INDUSTRIES: Industry[] = [
  {
    name: 'Finance & Wealth Management',
    tagline: 'Secure platforms for financial growth.',
    description:
      'Built fintech ecosystems—portfolio management, wealth advisory, and AI-driven sales automation.',
    tags: ['Node.js', 'DynamoDB', 'PostgreSQL', 'Serverless'],
  },
  {
    name: 'Healthcare & Wellness',
    tagline: 'Smart digital platforms for modern care.',
    description:
      'Launched AI-powered health apps enabling patient consultations, intelligent engagement, and secure digital delivery.',
    tags: ['Node.js', 'Flutter', 'DynamoDB', 'Figma'],
  },
  {
    name: 'Retail & eCommerce',
    tagline: 'Next-gen commerce for global markets.',
    description:
      'Engineered AI catalog extraction, modular e-stores, and cross-border marketplaces.',
    tags: ['Next.js', 'MongoDB', 'Python', 'React', 'FastAPI'],
  },
  {
    name: 'Manufacturing & Supply Chain',
    tagline: 'Digital networks for efficient operations.',
    description:
      'Transformed workflows with ERP systems and platforms driving automation and transparency.',
    tags: ['React Native', 'PostgreSQL', 'Figma', 'APIs'],
  },
  {
    name: 'Education & Learning',
    tagline: 'Tech-driven solutions for accessible learning.',
    description:
      'Delivered EdTech systems—AI study tools, scheduling apps, and global consulting platforms.',
    tags: ['Python', 'Django', 'Node.js', 'React', 'PostgreSQL'],
  },
  {
    name: 'Mobility & Workforce',
    tagline: 'Scalable platforms for workforce empowerment.',
    description:
      'Designed mobility-first solutions—job marketplaces, operational tools, and super apps.',
    tags: ['Node.js', 'Figma', 'PostgreSQL', 'DynamoDB'],
  },
  {
    name: 'Consumer Platforms',
    tagline: 'Personalized apps for everyday use.',
    description:
      'Launched AI-driven hobby platforms, chatbots, and user engagement tools.',
    tags: ['React', 'Socket.IO', 'Python', 'Figma'],
  },
  {
    name: 'Religion & Culture',
    tagline: 'AI solutions for cultural engagement.',
    description:
      'Digitized traditions with AI-powered prayer apps and scripture access platforms.',
    tags: ['Node.js', 'Next.js', 'Python', 'MongoDB'],
  },
];

export function ProjectsSection() {
  return (
    <section
      id="projects"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-12 md:py-20"
    >
      <div className="mb-8 text-center md:mb-12">
        <Badge variant="accent" className="mb-3">
          Selected Work
        </Badge>
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          Projects & Case Studies (By Industry)
        </h2>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {INDUSTRIES.map((i) => (
          <SpotlightCard
            key={i.name}
            className="bg-card/60 hover:border-primary/40 rounded-xl border p-5 shadow-sm backdrop-blur-sm transition"
            spotlightColor="primary"
          >
            <h3 className="text-base leading-tight font-semibold">{i.name}</h3>
            <p className="text-muted-foreground mt-1 text-xs md:text-sm">
              {i.tagline}
            </p>
            <p className="text-muted-foreground/90 mt-2 text-[12px] md:text-sm">
              {i.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {i.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-muted-foreground/90 border-border bg-background/60 rounded-full border px-2 py-0.5 text-[10px]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
