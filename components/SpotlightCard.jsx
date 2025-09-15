'use client';
import { useRef } from 'react';
import './SpotlightCard.css';

const SpotlightCard = ({ children, className = '', spotlightColor }) => {
  const divRef = useRef(null);

  const resolveSpotlightColor = (value) => {
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

  const handleMouseMove = (e) => {
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    const resolved = resolveSpotlightColor(spotlightColor);
    if (resolved) {
      divRef.current.style.setProperty('--spotlight-color', resolved);
    }
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      className={`card-spotlight ${className}`}
    >
      {children}
    </div>
  );
};

export default SpotlightCard;
