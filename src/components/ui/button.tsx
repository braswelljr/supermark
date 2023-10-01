'use client'

import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/classNames'

export const buttonVariants = cva(
  'inline-flex cursor-pointer items-center justify-center rounded transition-colors focus-visible:outline-none',
  {
    variants: {
      variant: {
        default:
          'bg-neutral-900 hover:bg-neutral-800 focus:bg-neutral-700 disabled:bg-neutral-800 text-white dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 dark:focus:bg-neutral-300 dark:disabled:bg-neutral-200',
        outline: 'border border-neutral-800 text-neutral-800 dark:border-neutral-200 dark:text-neutral-200',
        ghost: '',
        link: 'text-neutral-900 underline-offset-4 hover:underline dark:text-white',
        secondary:
          'bg-neutral-300 text-neutral-900 hover:bg-neutral-400 focus:bg-neutral-400 dark:bg-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-600 dark:focus:bg-neutral-600',
        danger: 'bg-red-500 text-white hover:bg-red-500/90'
      },
      size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      },
      defaultVariant: {
        variant: 'default',
        size: 'md'
      }
    }
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'button'
    return <Component className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />
  }
)

Button.displayName = 'Button'
