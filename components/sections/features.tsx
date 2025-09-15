'use client';
import dynamic from 'next/dynamic';
const MagicBento = dynamic(() => import('@/components/MagicBento.jsx'), {
  ssr: false,
});

const FEATURES = [
  {
    title: 'Web Applications',
    description:
      'Modern, accessible and SEO‑driven React/Next.js apps optimized for performance.',
    label: 'Service',
  },
  {
    title: 'Mobile Apps',
    description:
      'Cross‑platform native experiences for iOS & Android with smooth UX.',
    label: 'Service',
  },
  {
    title: 'AI Systems & Agents',
    description:
      'RAG, fine‑tuning, realtime agents and AI copilots integrated into your product.',
    label: 'Intelligence',
    extraClass: 'card--ai',
  },
  {
    title: 'Backend Services',
    description:
      'Low‑latency APIs, microservices & event pipelines that scale predictably.',
    label: 'Service',
  },
  {
    title: 'ERP & Integrations',
    description:
      'Custom ERP modules, data sync & workflow automation across systems.',
    label: 'Service',
  },
  {
    title: 'Dashboards & Data',
    description:
      'Real‑time analytics, metrics visualization & operational intelligence.',
    label: 'Service',
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
