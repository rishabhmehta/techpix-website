'use client';
import React, { useRef, useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { Badge } from './ui/badge';

const DEFAULT_PARTICLE_COUNT = 12;
const DEFAULT_SPOTLIGHT_RADIUS = 300;
const DEFAULT_GLOW_COLOR = '132, 0, 255';
const MOBILE_BREAKPOINT = 768;

type CardData = {
  title: string;
  headline?: string;
  description: string;
  label: string;
  color?: string;
  extraClass?: string;
  tags?: string[];
  image?: string;
};

type MagicBentoProps = {
  textAutoHide?: boolean;
  enableStars?: boolean;
  enableSpotlight?: boolean;
  enableBorderGlow?: boolean;
  disableAnimations?: boolean;
  spotlightRadius?: number;
  particleCount?: number;
  enableTilt?: boolean;
  glowColor?: string;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  cards?: CardData[];
};

const createParticleElement = (
  x: number,
  y: number,
  color = DEFAULT_GLOW_COLOR,
) => {
  const el = document.createElement('div');
  el.className = 'particle';
  el.style.cssText = `
    position: absolute;
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(${color}, 1);
    box-shadow: 0 0 6px rgba(${color}, 0.6);
    pointer-events: none;
    z-index: 100;
    left: ${x}px;
    top: ${y}px;
  `;
  return el;
};

const calculateSpotlightValues = (radius: number) => ({
  proximity: radius * 0.5,
  fadeDistance: radius * 0.75,
});

const updateCardGlowProperties = (
  card: HTMLElement,
  mouseX: number,
  mouseY: number,
  glow: number,
  radius: number,
) => {
  const rect = card.getBoundingClientRect();
  const relativeX = ((mouseX - rect.left) / rect.width) * 100;
  const relativeY = ((mouseY - rect.top) / rect.height) * 100;

  card.style.setProperty('--glow-x', `${relativeX}%`);
  card.style.setProperty('--glow-y', `${relativeY}%`);
  card.style.setProperty('--glow-intensity', glow.toString());
  card.style.setProperty('--glow-radius', `${radius}px`);
};

type ParticleCardProps = {
  children: React.ReactNode;
  className?: string;
  disableAnimations?: boolean;
  style?: React.CSSProperties;
  particleCount?: number;
  glowColor?: string;
  enableTilt?: boolean;
  clickEffect?: boolean;
  enableMagnetism?: boolean;
  showGlowBorder?: boolean;
};

const ParticleCard: React.FC<ParticleCardProps> = ({
  children,
  className = '',
  disableAnimations = false,
  style,
  particleCount = DEFAULT_PARTICLE_COUNT,
  glowColor = DEFAULT_GLOW_COLOR,
  enableTilt = true,
  clickEffect = false,
  enableMagnetism = false,
  showGlowBorder = false,
}) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement[]>([]);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const isHoveredRef = useRef(false);
  const memoizedParticles = useRef<HTMLDivElement[]>([]);
  const particlesInitialized = useRef(false);
  const magnetismAnimationRef = useRef<gsap.core.Tween | null>(null);

  // Inline replica of the ::after glow border using CSS variables
  const GlowBorder = () => (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 p-[6px]"
      style={
        {
          background: `radial-gradient(var(--glow-radius, 200px) circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(var(--glow-color, ${glowColor}), calc(var(--glow-intensity, 0) * 0.8)) 0%, rgba(var(--glow-color, ${glowColor}), calc(var(--glow-intensity, 0) * 0.4)) 30%, transparent 60%)`,
          borderRadius: 'inherit',
          // No mask: glow fills the whole card area
          transition: 'opacity 0.3s ease',
          zIndex: 1,
        } as React.CSSProperties
      }
    />
  );

  const initializeParticles = useCallback(() => {
    if (particlesInitialized.current || !cardRef.current) return;

    const { width, height } = cardRef.current.getBoundingClientRect();
    memoizedParticles.current = Array.from({ length: particleCount }, () =>
      createParticleElement(
        Math.random() * width,
        Math.random() * height,
        glowColor,
      ),
    );
    particlesInitialized.current = true;
  }, [particleCount, glowColor]);

  const clearAllParticles = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
    magnetismAnimationRef.current?.kill();

    particlesRef.current.forEach((particle) => {
      gsap.to(particle, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'back.in(1.7)',
        onComplete: () => {
          particle.parentNode?.removeChild(particle);
        },
      });
    });
    particlesRef.current = [];
  }, []);

  const animateParticles = useCallback(() => {
    if (!cardRef.current || !isHoveredRef.current) return;

    if (!particlesInitialized.current) {
      initializeParticles();
    }

    memoizedParticles.current.forEach((particle, index) => {
      const timeoutId = setTimeout(() => {
        if (!isHoveredRef.current || !cardRef.current) return;

        const clone = particle.cloneNode(true) as HTMLDivElement;
        cardRef.current.appendChild(clone);
        particlesRef.current.push(clone);

        gsap.fromTo(
          clone,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.3, ease: 'back.out(1.7)' },
        );

        gsap.to(clone, {
          x: (Math.random() - 0.5) * 100,
          y: (Math.random() - 0.5) * 100,
          rotation: Math.random() * 360,
          duration: 2 + Math.random() * 2,
          ease: 'none',
          repeat: -1,
          yoyo: true,
        });

        gsap.to(clone, {
          opacity: 0.3,
          duration: 1.5,
          ease: 'power2.inOut',
          repeat: -1,
          yoyo: true,
        });
      }, index * 100);

      timeoutsRef.current.push(timeoutId);
    });
  }, [initializeParticles]);

  useEffect(() => {
    if (disableAnimations || !cardRef.current) return;

    const element = cardRef.current;

    const handleMouseEnter = () => {
      isHoveredRef.current = true;
      animateParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 5,
          rotateY: 5,
          duration: 0.3,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }
      // Add colored glow similar to previous CSS on hover
      element.style.boxShadow = `0 8px 25px rgba(0,0,0,0.15), 0 0 30px rgba(${glowColor}, 0.25)`;
    };

    const handleMouseLeave = () => {
      isHoveredRef.current = false;
      clearAllParticles();

      if (enableTilt) {
        gsap.to(element, {
          rotateX: 0,
          rotateY: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }

      if (enableMagnetism) {
        gsap.to(element, {
          x: 0,
          y: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
      // Reset box shadow
      element.style.boxShadow = '';
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!enableTilt && !enableMagnetism) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      if (enableTilt) {
        const rotateX = ((y - centerY) / centerY) * -10;
        const rotateY = ((x - centerX) / centerX) * 10;

        gsap.to(element, {
          rotateX,
          rotateY,
          duration: 0.1,
          ease: 'power2.out',
          transformPerspective: 1000,
        });
      }

      if (enableMagnetism) {
        const magnetX = (x - centerX) * 0.05;
        const magnetY = (y - centerY) * 0.05;

        magnetismAnimationRef.current = gsap.to(element, {
          x: magnetX,
          y: magnetY,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    const handleClick = (e: MouseEvent) => {
      if (!clickEffect) return;

      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const maxDistance = Math.max(
        Math.hypot(x, y),
        Math.hypot(x - rect.width, y),
        Math.hypot(x, y - rect.height),
        Math.hypot(x - rect.width, y - rect.height),
      );

      const ripple = document.createElement('div');
      ripple.style.cssText = `
        position: absolute;
        width: ${maxDistance * 2}px;
        height: ${maxDistance * 2}px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(${glowColor}, 0.4) 0%, rgba(${glowColor}, 0.2) 30%, transparent 70%);
        left: ${x - maxDistance}px;
        top: ${y - maxDistance}px;
        pointer-events: none;
        z-index: 1000;
      `;

      element.appendChild(ripple);

      gsap.fromTo(
        ripple,
        {
          scale: 0,
          opacity: 1,
        },
        {
          scale: 1,
          opacity: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => ripple.remove(),
        },
      );
    };

    element.addEventListener('mouseenter', handleMouseEnter);
    element.addEventListener('mouseleave', handleMouseLeave);
    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('click', handleClick);

    return () => {
      isHoveredRef.current = false;
      element.removeEventListener('mouseenter', handleMouseEnter);
      element.removeEventListener('mouseleave', handleMouseLeave);
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('click', handleClick);
      clearAllParticles();
    };
  }, [
    animateParticles,
    clearAllParticles,
    disableAnimations,
    enableTilt,
    enableMagnetism,
    clickEffect,
    glowColor,
  ]);

  return (
    <div
      ref={cardRef}
      className={`${className} card relative overflow-hidden`}
      style={{ ...style }}
    >
      {showGlowBorder && <GlowBorder />}
      <div className="relative z-[2] h-full w-full">{children}</div>
    </div>
  );
};

type GlobalSpotlightProps = {
  gridRef: React.RefObject<HTMLDivElement | null>;
  disableAnimations?: boolean;
  enabled?: boolean;
  spotlightRadius?: number;
  glowColor?: string;
};

const GlobalSpotlight: React.FC<GlobalSpotlightProps> = ({
  gridRef,
  disableAnimations = false,
  enabled = true,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  glowColor = DEFAULT_GLOW_COLOR,
}) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);
  const isInsideSection = useRef(false);

  useEffect(() => {
    if (disableAnimations || !gridRef?.current || !enabled) return;

    const spotlight = document.createElement('div');
    spotlight.className = 'global-spotlight';
    spotlight.style.cssText = `
      position: fixed;
      width: 800px;
      height: 800px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle,
        rgba(${glowColor}, 0.15) 0%,
        rgba(${glowColor}, 0.08) 15%,
        rgba(${glowColor}, 0.04) 25%,
        rgba(${glowColor}, 0.02) 40%,
        rgba(${glowColor}, 0.01) 65%,
        transparent 70%
      );
      z-index: 200;
      opacity: 0;
      transform: translate(-50%, -50%);
      mix-blend-mode: screen;
      will-change: transform, opacity;
    `;
    document.body.appendChild(spotlight);
    spotlightRef.current = spotlight;

    const handleMouseMove = (e: MouseEvent) => {
      if (!spotlightRef.current || !gridRef.current) return;

      const section = gridRef.current.closest('.bento-section');
      const rect = section?.getBoundingClientRect();
      const mouseInside =
        rect &&
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      isInsideSection.current = mouseInside || false;
      const cards = gridRef.current.querySelectorAll<HTMLElement>('.card');

      if (!mouseInside) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
        cards.forEach((card) => {
          card.style.setProperty('--glow-intensity', '0');
        });
        return;
      }

      const { proximity, fadeDistance } =
        calculateSpotlightValues(spotlightRadius);
      let minDistance = Infinity;

      cards.forEach((card) => {
        const cardElement = card;
        const cardRect = cardElement.getBoundingClientRect();
        const centerX = cardRect.left + cardRect.width / 2;
        const centerY = cardRect.top + cardRect.height / 2;
        const distance =
          Math.hypot(e.clientX - centerX, e.clientY - centerY) -
          Math.max(cardRect.width, cardRect.height) / 2;
        const effectiveDistance = Math.max(0, distance);

        minDistance = Math.min(minDistance, effectiveDistance);

        let glowIntensity = 0;
        if (effectiveDistance <= proximity) {
          glowIntensity = 1;
        } else if (effectiveDistance <= fadeDistance) {
          glowIntensity =
            (fadeDistance - effectiveDistance) / (fadeDistance - proximity);
        }

        updateCardGlowProperties(
          cardElement,
          e.clientX,
          e.clientY,
          glowIntensity,
          spotlightRadius,
        );
      });

      gsap.to(spotlightRef.current, {
        left: e.clientX,
        top: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });

      const targetOpacity =
        minDistance <= proximity
          ? 0.8
          : minDistance <= fadeDistance
            ? ((fadeDistance - minDistance) / (fadeDistance - proximity)) * 0.8
            : 0;

      gsap.to(spotlightRef.current, {
        opacity: targetOpacity,
        duration: targetOpacity > 0 ? 0.2 : 0.5,
        ease: 'power2.out',
      });
    };

    const handleMouseLeave = () => {
      isInsideSection.current = false;
      gridRef.current
        ?.querySelectorAll<HTMLElement>('.card')
        .forEach((card) => {
          card.style.setProperty('--glow-intensity', '0');
        });
      if (spotlightRef.current) {
        gsap.to(spotlightRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'power2.out',
        });
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      spotlightRef.current?.parentNode?.removeChild(spotlightRef.current);
    };
  }, [gridRef, disableAnimations, enabled, spotlightRadius, glowColor]);

  return null;
};

type BentoCardGridProps = {
  children: React.ReactNode;
  gridRef: React.RefObject<HTMLDivElement | null>;
};

const BentoCardGrid: React.FC<BentoCardGridProps> = ({ children, gridRef }) => (
  <div
    ref={gridRef}
    className="bento-section mx-auto grid w-full max-w-[54em] grid-cols-1 gap-2 p-3 text-[clamp(1rem,0.9rem+0.5vw,1.5rem)] select-none sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-5"
  >
    {children}
  </div>
);

const useMobileDetection = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () =>
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

const MagicBento: React.FC<MagicBentoProps> = ({
  textAutoHide = true,
  enableStars = true,
  enableSpotlight = true,
  enableBorderGlow = true,
  disableAnimations = false,
  spotlightRadius = DEFAULT_SPOTLIGHT_RADIUS,
  particleCount = DEFAULT_PARTICLE_COUNT,
  enableTilt = false,
  glowColor = undefined,
  clickEffect = true,
  enableMagnetism = true,
  // Optional: pass custom cards to render instead of defaults
  cards,
}) => {
  const gridRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useMobileDetection();
  const shouldDisableAnimations = disableAnimations || isMobile;
  const cardsToRender: CardData[] =
    Array.isArray(cards) && cards.length > 0 ? cards : [];

  // Resolve theme primary color to an RGB triplet string for glow effects
  const [themePrimaryRGB, setThemePrimaryRGB] = useState(DEFAULT_GLOW_COLOR);
  useEffect(() => {
    try {
      const probe = document.createElement('span');
      probe.style.color = 'var(--color-primary)';
      probe.style.position = 'absolute';
      probe.style.visibility = 'hidden';
      document.body.appendChild(probe);
      const computed = getComputedStyle(probe).color; // e.g. rgb(25, 77, 179)
      document.body.removeChild(probe);
      const match = computed.match(/rgb[a]?\((\d+)\s*,\s*(\d+)\s*,\s*(\d+)/i);
      if (match) {
        const [, r, g, b] = match;
        setThemePrimaryRGB(`${r}, ${g}, ${b}`);
      }
    } catch {
      // use default fallback
    }
  }, []);

  const resolvedGlowColor = glowColor || themePrimaryRGB;

  return (
    <>
      {enableSpotlight && (
        <GlobalSpotlight
          gridRef={gridRef}
          disableAnimations={shouldDisableAnimations}
          enabled={enableSpotlight}
          spotlightRadius={spotlightRadius}
          glowColor={resolvedGlowColor}
        />
      )}

      <BentoCardGrid gridRef={gridRef}>
        {cardsToRender.map((card, index) => {
          // Grid positioning rules that previously relied on nth-child selectors
          const layoutClasses = [
            index === 0 ? 'lg:col-span-1 lg:row-span-2' : '',
            index === 1 ? 'lg:col-span-1 lg:row-span-2' : '',
            index === 2 ? 'lg:col-span-2 lg:row-span-3' : '',
            index === 3 ? 'lg:col-span-2 lg:row-span-3' : '',
            index === 4 ? 'lg:col-span-1 lg:row-span-2' : '',
            index === 5 ? 'lg:col-span-1 lg:row-span-2' : '',
          ]
            .filter(Boolean)
            .join(' ');

          const tailwindCardBase = [
            // container
            'relative overflow-hidden flex flex-col justify-between',
            'min-h-[200px] w-full max-w-full',
            'p-5 rounded-[20px] border',
            'transition-all duration-300',
            'hover:-translate-y-0.5',
            // subtle shadow on hover
            'hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)]',
          ].join(' ');

          const baseClassName = [
            tailwindCardBase,
            'card',
            enableBorderGlow ? 'card--border-glow' : '',
            card?.extraClass || '',
            layoutClasses,
          ]
            .filter(Boolean)
            .join(' ');

          const cardStyle: React.CSSProperties & { ['--glow-color']?: string } =
            {
              backgroundColor: card.color || 'var(--color-card)',
              borderColor: 'var(--color-border)' as unknown as string,
              ['--glow-color']: resolvedGlowColor,
            };

          if (enableStars) {
            return (
              <ParticleCard
                key={index}
                disableAnimations={shouldDisableAnimations}
                particleCount={particleCount}
                glowColor={resolvedGlowColor}
                enableTilt={enableTilt}
                clickEffect={clickEffect}
                enableMagnetism={enableMagnetism}
                className={baseClassName}
                style={cardStyle}
                showGlowBorder={enableBorderGlow}
              >
                <div className="mb-2 flex justify-between gap-3 text-[var(--color-card-foreground)]">
                  <Badge variant="default">{card.label}</Badge>
                </div>
                <div className="flex h-[90%] flex-col justify-between text-[var(--color-card-foreground)]">
                  <div>
                    <h2
                      className="m-0 mb-1 text-base font-normal"
                      style={
                        textAutoHide
                          ? ({
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 1,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {card.title}
                    </h2>

                    <h3
                      className="m-0 mb-1 text-sm font-normal italic opacity-90"
                      style={
                        textAutoHide
                          ? ({
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              WebkitLineClamp: 1,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {card.headline}
                    </h3>
                    <p
                      className="max-w-80 text-xs leading-tight opacity-90"
                      style={
                        textAutoHide
                          ? ({
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              // WebkitLineClamp: 2,
                            } as React.CSSProperties)
                          : undefined
                      }
                    >
                      {card.description}
                    </p>
                    {card.image && (
                      <div className="mt-3 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-black">
                        <div
                          className="relative w-full"
                          style={{ aspectRatio: '16 / 9' }}
                        >
                          <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-contain"
                            priority={false}
                          />
                        </div>
                      </div>
                    )}
                  </div>

                  {card.tags && card.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {card.tags.map((tag, idx) => (
                        <Badge
                          variant="outline"
                          key={idx}
                          // className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[0.7em] font-medium text-[var(--color-primary)]"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
              </ParticleCard>
            );
          }

          return (
            <div
              key={index}
              className={baseClassName}
              style={cardStyle}
              ref={(el) => {
                if (!el) return;

                const handleMouseMove = (e: MouseEvent) => {
                  if (shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const centerX = rect.width / 2;
                  const centerY = rect.height / 2;

                  if (enableTilt) {
                    const rotateX = ((y - centerY) / centerY) * -10;
                    const rotateY = ((x - centerX) / centerX) * 10;
                    gsap.to(el, {
                      rotateX,
                      rotateY,
                      duration: 0.1,
                      ease: 'power2.out',
                      transformPerspective: 1000,
                    });
                  }

                  if (enableMagnetism) {
                    const magnetX = (x - centerX) * 0.05;
                    const magnetY = (y - centerY) * 0.05;
                    gsap.to(el, {
                      x: magnetX,
                      y: magnetY,
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }
                };

                const handleMouseLeave = () => {
                  if (shouldDisableAnimations) return;

                  if (enableTilt) {
                    gsap.to(el, {
                      rotateX: 0,
                      rotateY: 0,
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }

                  if (enableMagnetism) {
                    gsap.to(el, {
                      x: 0,
                      y: 0,
                      duration: 0.3,
                      ease: 'power2.out',
                    });
                  }
                  // Reset box shadow
                  el.style.boxShadow = '';
                };

                const handleClick = (e: MouseEvent) => {
                  if (!clickEffect || shouldDisableAnimations) return;

                  const rect = el.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;

                  const maxDistance = Math.max(
                    Math.hypot(x, y),
                    Math.hypot(x - rect.width, y),
                    Math.hypot(x, y - rect.height),
                    Math.hypot(x - rect.width, y - rect.height),
                  );

                  const ripple = document.createElement('div');
                  ripple.style.cssText = `
                    position: absolute;
                    width: ${maxDistance * 2}px;
                    height: ${maxDistance * 2}px;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(${resolvedGlowColor}, 0.4) 0%, rgba(${resolvedGlowColor}, 0.2) 30%, transparent 70%);
                    left: ${x - maxDistance}px;
                    top: ${y - maxDistance}px;
                    pointer-events: none;
                    z-index: 1000;
                  `;

                  el.appendChild(ripple);

                  gsap.fromTo(
                    ripple,
                    {
                      scale: 0,
                      opacity: 1,
                    },
                    {
                      scale: 1,
                      opacity: 0,
                      duration: 0.8,
                      ease: 'power2.out',
                      onComplete: () => ripple.remove(),
                    },
                  );
                };

                el.addEventListener('mousemove', handleMouseMove);
                el.addEventListener('mouseleave', handleMouseLeave);
                el.addEventListener('click', handleClick);
                el.addEventListener('mouseenter', () => {
                  if (shouldDisableAnimations) return;
                  el.style.boxShadow = `0 8px 25px rgba(0,0,0,0.15), 0 0 30px rgba(${resolvedGlowColor}, 0.25)`;
                });
              }}
            >
              {enableBorderGlow && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 p-[6px]"
                  style={
                    {
                      background: `radial-gradient(var(--glow-radius, 200px) circle at var(--glow-x, 50%) var(--glow-y, 50%), rgba(var(--glow-color, ${resolvedGlowColor}), calc(var(--glow-intensity, 0) * 0.8)) 0%, rgba(var(--glow-color, ${resolvedGlowColor}), calc(var(--glow-intensity, 0) * 0.4)) 30%, transparent 60%)`,
                      borderRadius: 'inherit',
                      // No mask: glow fills the whole card area
                      transition: 'opacity 0.3s ease',
                      zIndex: 1,
                    } as React.CSSProperties
                  }
                />
              )}
              <div className="flex justify-between gap-3 text-[var(--color-card-foreground)]">
                <div className="text-base">{card.label}</div>
              </div>
              <div className="flex flex-col text-[var(--color-card-foreground)]">
                <h2
                  className="m-0 mb-1 text-base font-normal"
                  style={
                    textAutoHide
                      ? ({
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 1,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {card.title}
                </h2>
                <h3
                  className="m-0 mb-1 text-base font-normal italic"
                  style={
                    textAutoHide
                      ? ({
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          WebkitLineClamp: 1,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {card.headline}
                </h3>
                <p
                  className="text-xs leading-tight opacity-90"
                  style={
                    textAutoHide
                      ? ({
                          display: '-webkit-box',
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          // WebkitLineClamp: 2,
                        } as React.CSSProperties)
                      : undefined
                  }
                >
                  {card.description}
                </p>
                {card.image && (
                  <div className="mt-3 overflow-hidden rounded-xl border border-[var(--color-border)] bg-black/5">
                    <div
                      className="relative w-full"
                      style={{ aspectRatio: '16 / 9' }}
                    >
                      <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                      />
                    </div>
                  </div>
                )}
                {card.tags && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {card.tags.map((tag, idx) => (
                      <Badge
                        key={idx}
                        // className="rounded-full bg-[var(--color-primary)]/10 px-2 py-0.5 text-[0.7em] font-medium text-[var(--color-primary)]"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </BentoCardGrid>
    </>
  );
};

export default MagicBento;
