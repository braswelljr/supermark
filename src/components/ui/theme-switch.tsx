'use client'

import { Fragment, useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { HiDesktopComputer, HiMoon, HiSun } from 'react-icons/hi'
import { LayoutGroup, motion } from 'framer-motion'
import { cva } from 'class-variance-authority'
import { cn } from '~/utils/classNames'

export const themeSwitchVariants = cva({
  default: {
    container: 'flex items-center space-x-2',
    item: 'relative block cursor-pointer p-2',
    pointer: 'bg-blue-500 absolute inset-0',
    pointerFirst: 'rounded-l-sm',
    pointerLast: 'rounded-r-sm',
    icon: 'relative z-[1] block h-full w-full'
  },
  dark: {
    pointer: 'bg-blue-500 absolute inset-0',
    pointerFirst: 'rounded-l-sm',
    pointerLast: 'rounded-r-sm'
  }
})

export function ThemeSwitch({ className, layoutId }: { className?: string; layoutId?: string }): React.JSX.Element {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return <Fragment />

  return (
    <LayoutGroup>
      <ul className={cn('flex items-center space-x-2', className)}>
        {Object.entries({
          system: <HiDesktopComputer className={cn('h-3 w-auto')} />,
          dark: <HiMoon className={cn('h-3 w-auto')} />,
          light: <HiSun className={cn('h-3 w-auto')} />
        }).map(([key, value], i, self) => (
          <li key={key} className={cn('relative block cursor-pointer p-2')} onClick={() => setTheme(key)}>
            {key === theme && (
              <motion.div
                layoutId={layoutId || 'themeIdPointer'}
                initial={false}
                className={cn(
                  'absolute inset-0 bg-blue-500',
                  i === 0 && 'rounded-l-sm',
                  i === self.length - 1 && 'rounded-r-sm'
                )}
              />
            )}
            <span className={cn('relative z-[1] block h-full w-full')}>{value}</span>
          </li>
        ))}
      </ul>
    </LayoutGroup>
  )
}
