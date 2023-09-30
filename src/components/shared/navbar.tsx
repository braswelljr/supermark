import Link from 'next/link'
import { PiFlagBannerFill } from 'react-icons/pi'
import { siteConfig } from '~/config/site'
import { buttonVariants } from '~/components/ui/button'
import { cn } from '~/utils/classNames'

export default function Navbar({ className }: { className?: string }) {
  return (
    <>
      <div className="w-full bg-neutral-950 px-4 py-2 text-center text-white">
        <p className="inline-flex items-center justify-center space-x-2">
          <PiFlagBannerFill className="" /> <span>Trade as much as you can!</span>
        </p>
      </div>
      <nav
        className={cn(
          'sticky inset-x-0 top-0 flex w-full items-center justify-between bg-white/80 px-4 py-4 backdrop-blur dark:bg-neutral-900/80 sm:px-8',
          className
        )}
      >
        <h1 className="text-xl font-bold uppercase">{siteConfig.name}</h1>
        <ul className="flex justify-between space-x-4">
          <Link href="/login" className={cn(buttonVariants({ variant: 'outline' }))}>
            Login
          </Link>
          <Link href="/register" className={cn(buttonVariants({ variant: 'default' }))}>
            Register
          </Link>
        </ul>
      </nav>
    </>
  )
}
