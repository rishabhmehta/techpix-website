import * as React from 'react';
import { cn } from '@/lib/utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline' | 'accent';
}

export function Badge({
  className,
  variant = 'default',
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-[11px] font-medium tracking-wide',
        variant === 'default' &&
          'bg-primary text-primary-foreground border-transparent',
        variant === 'outline' && 'border-border text-foreground',
        variant === 'accent' &&
          'bg-accent text-accent-foreground border-transparent',
        className,
      )}
      {...props}
    />
  );
}
