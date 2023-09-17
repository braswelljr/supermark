import { ReactNode } from 'react'
import localFont from 'next/font/local'
import RootWrapper from '~/wrappers/root'
import { siteConfig } from '~/config/site'
import { cn } from '~/utils/classNames'
import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: ['store', 'nextjs', 'react', 'typescript'],
  authors: [
    {
      name: 'braswelljr',
      url: 'https://github.com/braswelljr'
    }
  ],
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' }
  ],
  icons: {
    icon: '/vercel.svg',
    shortcut: '/vercel.svg',
    apple: '/vercel.svg'
  },
  manifest: `/manifest.json`
}

const jost = localFont({
  weight: 'variable',
  src: [
    { path: './jost.ttf', style: 'normal' },
    { path: './jost-italic.ttf', style: 'italic' }
  ],
  variable: '--font-jost',
  display: 'swap'
})
const satoshi = localFont({
  weight: 'variable',
  src: './Satoshi-Variable.woff2',
  variable: '--font-satoshi',
  display: 'swap'
})

const jetbrainsMono = localFont({
  src: [
    { path: './jetbrainsmono.ttf', style: 'normal' },
    { path: './jetbrainsmono-italic.ttf', style: 'italic' }
  ],
  variable: '--font-mono'
})

export default function Layout({ children }: { children: ReactNode }): React.JSX.Element {
  return (
    <html
      lang="en"
      className={cn(
        'bg-white text-black antialiased dark:bg-neutral-900 dark:text-white',
        jost.variable,
        satoshi.variable,
        jetbrainsMono.variable
      )}
      suppressHydrationWarning
    >
      <head />
      <body className="min-h-screen bg-white text-black dark:bg-neutral-900 dark:text-white">
        <RootWrapper>{children}</RootWrapper>
      </body>
    </html>
  )
}
