'use client'

import Link from 'next/link'
import { siteConfig } from '~/config/site'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/utils/classNames'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-white p-24 text-neutral-900 child:w-full dark:bg-neutral-900 dark:text-white md:justify-center">
      <section className="">
        <h1 className="mx-auto max-w-md text-3xl font-bold md:text-center">
          Welcome to <span className="text-primary-900">{siteConfig.name}</span> Administration Dashboard
        </h1>
      </section>

      <section className="mt-7 max-w-md">
        <Link
          href="/login"
          className={cn(
            buttonVariants({ variant: 'default', size: 'md' }),
            'mx-auto flex w-full max-w-xs font-semibold uppercase'
          )}
        >
          Login
        </Link>
      </section>
    </main>
  )
}
