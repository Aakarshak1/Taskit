import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 capitalize',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // list
        personal: 'border-transparent mx-1 bg-blue-700 text-white hover:bg-blue-700/80 cursor-pointer',
        work: 'border-transparent mx-1 bg-green-700 text-white hover:bg-green-700/80 cursor-pointer',
        // status
        todo: 'border-transparent mx-1 bg-zinc-500 text-white hover:bg-zinc-500/80 cursor-pointer',
        inprogress: 'border-transparent mx-1 bg-yellow-400 text-gray-800 hover:bg-yellow-500/80 cursor-pointer',
        done: 'border-transparent mx-1 bg-red-700 text-white hover:bg-red-700/80 cursor-pointer',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return <div className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { Badge, badgeVariants };
