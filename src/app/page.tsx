import Link from 'next/link'
import { PiFlagBannerFill } from 'react-icons/pi'
import { siteConfig } from '~/config/site'
import { buttonVariants } from '~/components/ui/button'
import { ThemeSwitch } from '~/components/ui/theme-switch'
import { cn } from '~/utils/classNames'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="">
        <header className="">
          <div className="w-full bg-blue-400 px-4 py-2 text-center dark:text-neutral-900">
            <p className="inline-flex items-center justify-center space-x-2">
              <PiFlagBannerFill className="" /> <span>Trade as much as you can!</span>
            </p>
          </div>
          <nav className="sticky inset-x-0 top-0 flex w-full items-center justify-between bg-white/80 px-4 py-4 backdrop-blur dark:bg-neutral-900/80 sm:px-8">
            <h1 className="text-xl font-bold uppercase">{siteConfig.name}</h1>
            <ul className="flex justify-between space-x-4">
              <Link
                href="/login"
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'border-blue-500 bg-white text-blue-500 dark:bg-neutral-900'
                )}
              >
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: 'default' }))}>
                Register
              </Link>
            </ul>
          </nav>
        </header>
        <main className="">
          <section className="mx-auto max-w-7xl">hey</section>
        </main>
      </div>
      <footer className="px-4 py-2 sm:px-8 sm:py-4">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <h1 className="">
            @{new Date().getFullYear()} {siteConfig.name}
          </h1>
          <ThemeSwitch className="" />
        </div>
      </footer>
    </div>
  )
}
