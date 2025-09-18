'use client';
import dynamic from 'next/dynamic';
const MagicBento = dynamic(() => import('@/components/MagicBento'), {
  ssr: false,
});

const FEATURES = [
  {
    title: 'Enterprise Platforms',
    headline: 'Scale with confidence.',
    description:
      'Robust ERP and enterprise-grade systems that streamline operations, enhance collaboration, and ensure compliance at scale. Built for resilience, built for growth.',
    label: 'Enterprise',
    tags: ['ERP', 'CRM', 'Integrations'],
  },
  {
    title: 'Cloud & DevOps',
    headline: 'Future-proof infrastructure.',
    description:
      'Optimized deployments and automated workflows that keep your systems fast, reliable, and ready for scale.',
    label: 'Service',
    tags: ['AWS', 'Azure', 'GCP', 'CI/CD'],
  },
  {
    title: 'AI-Powered Applications',
    headline: 'Launch smarter, scale faster',
    description:
      'Tailored AI solutions that transform ideas into intelligent products — from chatbots to predictive analytics. Give your startup the edge with automation, personalization, and data-driven growth.',
    label: 'Startups',
    tags: ['AI', 'Machine Learning', 'Automation'],
    image: '/ai.jpg',
  },
  {
    title: 'Mobile Apps',
    headline: ' Go where your customers are.',
    description:
      'Sleek, user-first mobile apps built to drive adoption, retention, and revenue. From MVPs to full-scale launches, we help startups win in competitive markets.',
    label: 'Service',
    tags: ['IOS', 'Android', 'Flutter'],
    image: '/mobile.jpg',
  },

  {
    title: 'Web Applications',
    headline: ' Build once, scale everywhere.',
    description:
      'Fast, secure, and versatile platforms — from SaaS tools to e-commerce portals. Perfect for startups validating their business model.',
    label: 'Service',
    tags: ['Web', 'Full-Stack'],
  },

  {
    title: 'Product Design',
    headline: 'Design that converts.',
    description:
      'Engaging UI/UX that turns first-time users into loyal customers. Research-driven, pixel-perfect, and business-aligned.',
    label: 'Service',
    tags: ['UI/UX', 'Figma', 'Prototyping'],
  },
];

export function FeaturesSection() {
  return (
    <section
      id="services"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-10 md:py-16"
    >
      <div className="mb-10 flex flex-col items-center text-center md:mb-14">
        <h2 className="font-serif text-3xl font-bold tracking-tight md:text-4xl">
          What We Build
        </h2>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm md:text-base">
          End‑to‑end product engineering: from concept to launch to reliable
          operation.
        </p>
      </div>
      <div className="mt-6">
        <MagicBento
          enableTilt
          enableMagnetism
          clickEffect
          enableSpotlight
          enableBorderGlow
          textAutoHide
          cards={FEATURES}
        />
      </div>
    </section>
  );
}
