import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '~/utils/classNames'

export const inputVariants = cva(
  'block w-full rounded transition-colors focus-visible:outline-none focus:outline-none border focus-visible:ring-opacity-50 focus-visible:ring-[0.5px] focus:ring-opacity-50 placeholder-neutral-400 bg-white dark:bg-neutral-900 dark:text-white dark:placeholder-neutral-500 focus:ring-[0.5px]',
  {
    variants: {
      variant: {
        default: 'border-neutral-500 focus:border-neutral-600 focus:ring-neutral-600',
        secondary: 'border-neutral-300 focus:border-neutral-200 focus:ring-neutral-200',
        error: 'border-red-500 focus:border-red-500 focus:ring-red-500'
      },
      Size: {
        sm: 'px-2 py-1 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
      },
      defaultVariant: {
        variant: 'default',
        Size: 'md'
      }
    }
  }
)

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, VariantProps<typeof inputVariants> {
  asChild?: boolean
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant = 'default', Size = 'md', asChild = false, ...props }, ref) => {
    const Component = asChild ? Slot : 'input'
    return <Component className={cn(inputVariants({ variant, Size, className }))} ref={ref} {...props} />
  }
)

Input.displayName = 'Input'
