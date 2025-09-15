import { Badge } from '@/components/ui/badge';
import SpotlightCard from '@/components/SpotlightCard';

type Project = {
  name: string;
  blurb: string;
  stack: string[];
};

const PROJECTS: Project[] = [
  {
    name: 'AI Product for Secondary Sales Statements',
    blurb:
      'Digitizes secondary sales statements, detects anomalies and automates insights.',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'CuratePro',
    blurb:
      'AI product to extract product info from furniture catalog PDFs (variants, pricing).',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'DrDerm',
    blurb:
      'Skin & Hair consultation and e‑commerce app for dermatologists and patients.',
    stack: ['Node.js', 'Flutter', 'PostgreSQL', 'Figma'],
  },
  {
    name: 'Sarathi',
    blurb:
      'Hindu Prayer App with AI chat, daily rosary and classics. Admin console for content.',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'Fyn Mobility',
    blurb:
      'Super app for blue‑collar workers: jobs, health, document verification + admin.',
    stack: [
      'Node.js',
      'Next.js',
      'DynamoDB',
      'Serverless',
      'PostgreSQL',
      'Figma',
    ],
  },
  {
    name: 'HUES',
    blurb: 'SAAS ERP for SMEs covering sales orders, inventory, purchases.',
    stack: ['PostgreSQL', 'Node.js', 'Next.js', 'Figma'],
  },
  {
    name: 'AAA Tech',
    blurb:
      'Mobile app for operations plus website for diversified business divisions.',
    stack: [
      'Node.js',
      'Next.js',
      'PostgreSQL',
      'DynamoDB',
      'Serverless',
      'Figma',
    ],
  },
  {
    name: 'Samay',
    blurb: 'Scheduling tool for course planning and management at IMS.',
    stack: ['Python', 'Django', 'Next.js', 'Figma'],
  },
  {
    name: 'Mod Or',
    blurb:
      'Modular platform for Study Abroad Consulting: appointments and documents.',
    stack: ['Python', 'Django', 'Next.js', 'Figma'],
  },
  {
    name: 'ChemistMitra',
    blurb: 'ERP + Marketplace for chemists: orders, inventory, customers.',
    stack: ['Node.js', 'React Native', 'Next.js', 'PostgreSQL', 'Figma'],
  },
  {
    name: 'Aavyooh',
    blurb:
      'Transparent, circular manufacturing network with risk shield, waste lens and alternatives.',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'MyVisaPal',
    blurb: 'Online visa booking service.',
    stack: ['Node.js', 'Next.js', 'Firebase', 'Figma'],
  },
  {
    name: 'Vidyame',
    blurb:
      'Access and learn Indian local literature across audio/video/text, transliteration, commentary. Creator and subscription management + scraping pipeline.',
    stack: [
      'Node.js',
      'Next.js',
      'PostgreSQL',
      'Python',
      'MongoDB',
      'Web‑Scraping',
      'Figma',
    ],
  },
  {
    name: 'Ornate Solar',
    blurb:
      'B2B Solar Trading & Installation ERP/CRM/service platform for projects.',
    stack: ['Python', 'Django', 'Node.js', 'Android', 'Next.js', 'Figma'],
  },
  {
    name: 'Truemind Capital',
    blurb:
      'Wealth management site and PMS for HNIs, Ultra HNIs, NRIs and foreign nationals.',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'August.ai',
    blurb:
      'AI health agents enabling empathetic, accurate engagement for patients.',
    stack: ['Node.js', 'Next.js', 'DynamoDB', 'Serverless'],
  },
  {
    name: 'Pursueit',
    blurb:
      'Hobby platform with AI search/chatbot for recommendations and class listings.',
    stack: ['Socket.io', 'React'],
  },
  {
    name: 'Trampoline',
    blurb:
      'Cross‑border B2B Furniture Store with OMS, Vendor Platform and Scraping Tool.',
    stack: ['FastAPI', 'Python', 'Next.js', 'MongoDB', 'Figma'],
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
          Projects & Case Studies
        </h2>
        <p className="text-muted-foreground mx-auto mt-3 max-w-2xl text-sm md:text-base">
          A snapshot of products and platforms we&apos;ve partnered on.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((p) => (
          <SpotlightCard
            key={p.name}
            className="bg-card/60 hover:border-primary/40 rounded-xl border p-5 shadow-sm backdrop-blur-sm transition"
            spotlightColor="primary"
          >
            <h3 className="text-base leading-tight font-semibold">{p.name}</h3>
            <p className="text-muted-foreground mt-1 text-xs md:text-sm">
              {p.blurb}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {p.stack.map((s) => (
                <span
                  key={s}
                  className="text-muted-foreground/90 border-border bg-background/60 rounded-full border px-2 py-0.5 text-[10px]"
                >
                  {s}
                </span>
              ))}
            </div>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}
