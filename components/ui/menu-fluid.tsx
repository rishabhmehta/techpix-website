'use client';

import Link from 'next/link';
import { ReactNode, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

type MenuItem = {
  label: string;
  href: string;
};

interface MenuFluidProps {
  menuItems: MenuItem[];
  className?: string;
  indicatorClassName?: string;
  leftContent?: ReactNode;
  rightContent?: ReactNode;
}

export const MenuFluid = ({
  menuItems,
  className,
  indicatorClassName,
  leftContent,
  rightContent,
}: MenuFluidProps) => {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div
      className={cn(
        'flex items-center rounded-full border border-zinc-300 p-1 dark:border-zinc-600',
        className,
      )}
    >
      {leftContent && (
        <div className="flex items-center gap-2 pr-2 pl-1">{leftContent}</div>
      )}
      {menuItems.map((item, index) => (
        <Link
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
          className="relative px-4 py-2 text-zinc-900 md:px-8 md:py-3 dark:text-zinc-50"
          key={`${item.label}-${index}`}
          href={item.href}
        >
          {hovered === index && (
            <motion.div
              layoutId="fluid"
              transition={{ duration: 0.2, ease: 'linear' }}
              className={cn(
                'absolute inset-0 rounded-full bg-zinc-100 dark:bg-zinc-700',
                indicatorClassName,
              )}
            />
          )}
          <span className="relative z-20 text-sm font-semibold">
            {item.label}
          </span>
        </Link>
      ))}
      {rightContent && (
        <div className="flex items-center gap-2 pr-1 pl-2">{rightContent}</div>
      )}
    </div>
  );
};
