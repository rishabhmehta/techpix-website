'use client';
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export type PillNavItem = {
  label: string;
  href: string;
  ariaLabel?: string;
};

export interface PillNavProps {
  logo: string;
  logoAlt?: string;
  items: PillNavItem[];
  activeHref?: string;
  className?: string;
  ease?: string;
  baseColor?: string; // Track color behind pills/logo
  pillColor?: string;
  hoveredPillTextColor?: string;
  pillTextColor?: string;
  highlightColor?: string; // Hover circle and active dot
  onMobileMenuClick?: () => void;
  initialLoadAnimation?: boolean;
}

const PillNav: React.FC<PillNavProps> = ({
  logo,
  logoAlt = 'Logo',
  items,
  activeHref,
  className = '',
  ease = 'power3.easeOut',
  // Use theme tokens by default so nav follows light/dark themes
  baseColor = 'var(--muted)',
  pillColor = 'var(--card)',
  hoveredPillTextColor = 'var(--primary-foreground)',
  pillTextColor = 'var(--card-foreground)',
  highlightColor = 'var(--primary)',
  onMobileMenuClick,
  initialLoadAnimation = true,
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const tlRefs = useRef<Array<gsap.core.Timeline | null>>([]);
  const activeTweenRefs = useRef<Array<gsap.core.Tween | null>>([]);
  const logoImgRef = useRef<HTMLImageElement | null>(null);
  const logoTweenRef = useRef<gsap.core.Tween | null>(null);
  const hamburgerRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const navItemsRef = useRef<HTMLDivElement | null>(null);
  const logoRef = useRef<HTMLAnchorElement | HTMLElement | null>(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement as HTMLElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta =
          Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector<HTMLElement>('.pill-label');
        const white = pill.querySelector<HTMLElement>('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(
          circle,
          { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' },
          0,
        );

        if (label) {
          tl.to(
            label,
            { y: -(h + 8), duration: 2, ease, overwrite: 'auto' },
            0,
          );
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(
            white,
            { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' },
            0,
          );
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1 });
    }

    if (initialLoadAnimation) {
      const logo = logoRef.current;
      const navItems = navItemsRef.current;

      if (logo) {
        gsap.set(logo, { scale: 0 });
        gsap.to(logo, {
          scale: 1,
          duration: 0.6,
          ease,
        });
      }

      if (navItems) {
        gsap.set(navItems, { width: 0, overflow: 'hidden' });
        gsap.to(navItems, {
          width: 'auto',
          duration: 0.6,
          ease,
        });
      }
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLeave = (i: number) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, {
      rotate: 360,
      duration: 0.2,
      ease,
      overwrite: 'auto',
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center',
          },
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          },
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: resolvedPillTextColor,
    ['--highlight']: highlightColor,
    ['--nav-h']: '42px',
    ['--logo']: '36px',
    ['--pill-pad-x']: '18px',
    ['--pill-gap']: '3px',
  } as React.CSSProperties;

  return (
    <div className="fixed top-4 left-0 z-[99] w-full px-4 md:left-1/2 md:w-max md:-translate-x-1/2">
      <nav
        className={`box-border flex w-full items-center justify-between md:w-max md:justify-start ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <Link
          className="mr-2 inline-flex h-[var(--nav-h)] w-[var(--nav-h)] items-center justify-center overflow-hidden rounded-full bg-[var(--base,var(--muted))] p-2"
          href={items[0].href}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          role="menuitem"
          ref={(el) => {
            logoRef.current = el;
          }}
        >
          <Image
            src={logo}
            alt={logoAlt}
            ref={logoImgRef}
            width="100"
            height="100"
          />
        </Link>

        <div
          className="relative hidden h-[var(--nav-h)] items-center rounded-full border border-[var(--border)] [box-shadow:0_6px_16px_color-mix(in_oklab,var(--color-ring),transparent_88%)] [background:var(--base,var(--background))] md:flex dark:[border-color:color-mix(in_oklab,var(--border),transparent_20%)] dark:[box-shadow:0_4px_12px_rgba(0,0,0,0.18)] dark:[background:var(--base,var(--muted))]"
          ref={navItemsRef}
        >
          <ul
            className="m-0 flex h-full list-none items-stretch [gap:var(--pill-gap)] p-[3px]"
            role="menubar"
          >
            {items.map((item, i) => (
              <li key={item.href} role="none">
                <Link
                  role="menuitem"
                  href={item.href}
                  className="relative inline-flex h-full cursor-pointer items-center justify-center overflow-hidden rounded-full bg-[var(--pill-bg,var(--card))] px-[var(--pill-pad-x)] text-[14px] leading-[0] font-medium whitespace-nowrap text-[var(--pill-text,var(--card-foreground))] dark:border dark:border-[var(--border)] dark:bg-[var(--background)]"
                  aria-label={item.ariaLabel || item.label}
                  onMouseEnter={() => handleEnter(i)}
                  onMouseLeave={() => handleLeave(i)}
                >
                  <span
                    className="hover-circle pointer-events-none absolute bottom-0 left-1/2 z-[1] rounded-full will-change-transform [background:var(--highlight,var(--primary))]"
                    aria-hidden="true"
                    ref={(el) => {
                      circleRefs.current[i] = el;
                    }}
                  />
                  <span className="label-stack relative z-[2] inline-block leading-none">
                    <span className="pill-label relative z-[2] inline-block leading-none will-change-transform">
                      {item.label}
                    </span>
                    <span
                      className="pill-label-hover absolute top-0 left-0 z-[3] inline-block text-[var(--hover-text,var(--primary-foreground))] will-change-[transform,opacity]"
                      aria-hidden="true"
                    >
                      {item.label}
                    </span>
                  </span>
                  {activeHref === item.href && (
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-[6px] left-1/2 z-[4] h-3 w-3 -translate-x-1/2 rounded-full [background:var(--highlight,var(--primary))]"
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <button
          className="relative flex h-[var(--nav-h)] w-[var(--nav-h)] items-center justify-center gap-1 rounded-full [background:var(--base,var(--muted))] md:hidden"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          ref={hamburgerRef}
        >
          <span className="hamburger-line block h-[2px] w-4 origin-center rounded transition-all duration-75 [background:var(--pill-text,var(--card-foreground))]" />
          <span className="hamburger-line block h-[2px] w-4 origin-center rounded transition-all duration-75 [background:var(--pill-text,var(--card-foreground))]" />
        </button>
        <div className="ml-2">
          <ThemeToggle />
        </div>
      </nav>

      <div
        className="absolute top-[3em] right-4 left-4 z-[998] rounded-[27px] opacity-0 [box-shadow:0_8px_32px_rgba(0,0,0,0.12)] [background:var(--popover)] md:hidden"
        ref={mobileMenuRef}
        style={cssVars}
      >
        <ul className="m-0 flex list-none flex-col gap-[3px] p-[3px]">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block rounded-[50px] bg-[var(--pill-bg,var(--card))] px-4 py-3 text-[14px] font-medium text-[var(--pill-text,var(--card-foreground))] transition-all duration-200 hover:[background-color:var(--highlight,var(--primary))] hover:text-[var(--hover-text,var(--primary-foreground))] dark:border dark:border-[var(--border)] dark:bg-[var(--background)]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
