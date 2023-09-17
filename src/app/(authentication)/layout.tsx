'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { HiChevronLeft } from 'react-icons/hi'
import { Button, buttonVariants } from '~/components/ui/button'
import { cn } from '~/utils/classNames'

export default function Layout({ children }: { children: React.ReactNode }): React.JSX.Element {
  const router = useRouter()
  const pathname = usePathname()

  const useBack = ['/forgot-password'].includes(pathname)

  return (
    <Fragment>
      {/* Back */}
      {useBack ? (
        <Button
          type="button"
          className="fixed left-5 top-5 z-10 space-x-1 py-1.5 pl-0.5 pr-2.5 text-sm font-medium uppercase"
          onClick={() => router.back()}
        >
          <HiChevronLeft className="h-4 w-auto" />
          <span>Back</span>
        </Button>
      ) : (
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: 'default' }),
            'fixed left-5 top-5 z-10 space-x-1 rounded py-1.5 pl-1 pr-2.5 text-sm font-medium uppercase'
          )}
        >
          <HiChevronLeft className="h-4 w-auto" />
          <span>Back</span>
        </Link>
      )}
      <Fragment>{children}</Fragment>
    </Fragment>
  )
}
