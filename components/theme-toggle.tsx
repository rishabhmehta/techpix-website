'use client';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button, type ButtonProps } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function ThemeToggle(
  props: Partial<ButtonProps> & { className?: string } = {},
) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const current = (resolvedTheme || theme) as 'light' | 'dark' | undefined;

  return (
    <Button
      size={props.size ?? 'icon'}
      variant={props.variant ?? 'outline'}
      aria-label={props['aria-label'] ?? 'Toggle theme'}
      onClick={() => setTheme(current === 'dark' ? 'light' : 'dark')}
      className={cn('relative cursor-pointer', props.className)}
      disabled={!mounted}
      {...props}
    >
      {current === 'dark' ? (
        <Sun className="size-4" />
      ) : (
        <Moon className="size-4" />
      )}
    </Button>
  );
}
