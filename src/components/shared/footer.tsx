'use client'

import { usePathname } from 'next/navigation'
import { siteConfig } from '~/config/site'
import { ThemeSwitch } from '~/components/ui/theme-switch'
import { cn } from '~/utils/classNames'

export default function Footer({ className }: { className?: string }) {
  const pathname = usePathname()

  if ([`/login`, `/register`].includes(pathname)) return null

  return (
    <footer className={cn('px-4 py-2 sm:px-8 sm:py-4', className)}>
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="">
          @{new Date().getFullYear()} {siteConfig.name}
        </h1>
        <ThemeSwitch className="" />
      </div>
    </footer>
  )
}
