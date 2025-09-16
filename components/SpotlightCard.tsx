'use client';
import React, { useRef } from 'react';

type SpotlightCardProps = {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
};

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
  spotlightColor,
}) => {
  const divRef = useRef<HTMLDivElement | null>(null);

  const resolveSpotlightColor = (value?: string): string | null => {
    if (!value) return null;
    // If it's already a CSS var or functional/hex color, pass through
    const v = String(value).trim();
    if (
      v.startsWith('var(') ||
      v.startsWith('#') ||
      v.startsWith('rgb') ||
      v.startsWith('hsl') ||
      v.includes('color-mix(')
    ) {
      return v;
    }
    // Map common theme tokens to CSS variables with a subtle alpha via color-mix
    const tokens = new Set([
      'primary',
      'secondary',
      'accent',
      'muted',
      'foreground',
      'background',
      'ring',
      'border',
      'card',
      'popover',
    ]);
    if (tokens.has(v)) {
      // Stronger mix so it shows on light bg; CSS handles dark via token values
      return `color-mix(in oklab, var(--${v}) 28%, transparent)`;
    }
    // Fallback: use as-is; if invalid, the CSS default remains
    return v;
  };

  const handleMouseMove: React.MouseEventHandler<HTMLDivElement> = (e) => {
    const el = divRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty('--mouse-x', `${x}px`);
    el.style.setProperty('--mouse-y', `${y}px`);
    const resolved = resolveSpotlightColor(spotlightColor);
    if (resolved) {
      el.style.setProperty('--spotlight-color', resolved);
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      // Tailwind replacement for old .card-spotlight styles
      className={`group relative overflow-hidden dark:[--spotlight-color:color-mix(in_oklab,white_25%,transparent)] ${className}`}
      style={
        {
          // Defaults similar to the removed CSS
          ['--mouse-x']: '50%',
          ['--mouse-y']: '50%',
          ['--spotlight-color']:
            'color-mix(in oklab, var(--foreground) 10%, transparent)',
        } as React.CSSProperties
      }
    >
      {/* Overlay that mirrors the ::before pseudo-element */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-focus-within:opacity-75 group-hover:opacity-75"
        style={{
          background:
            'radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%)',
        }}
      />
      {children}
    </div>
  );
};

export default SpotlightCard;
