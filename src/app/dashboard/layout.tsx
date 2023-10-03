'use client'

import { Fragment, ReactNode, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { HiMenu, HiPlus } from 'react-icons/hi'
import useStore from '~/store/index'
import Navbar from '~/components/dashboard/navbar'
import Sidebar from '~/components/dashboard/sidebar'
import Footer from '~/components/shared/footer'
import useAuthentication from '~/context/useAuthentication'
import { cn } from '~/utils/classNames'

export default function Layout({ children }: { children?: ReactNode }): React.JSX.Element {
  const [open, setOpen] = useStore(state => [state.dashboardnavIsOpen, state.setDashboardnavIsOpen])
  const { user } = useAuthentication()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    const t = setTimeout(() => {
      if (!user) router.push('/login')
    }, 15000)

    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  if (!user) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>
  }

  return (
    <main className="md:divide-x-1 fixed inset-0 z-40 grid h-full bg-neutral-50 text-neutral-900 dark:divide-neutral-500 dark:bg-neutral-800 dark:text-white md:grid-cols-[200px_minmax(0,1fr)] lg:grid-cols-[245px_minmax(0,1fr)] xl:grid-cols-[320px_minmax(0,1fr)]">
      <Sidebar
        className={cn(
          'fixed inset-0 z-[15] w-full overflow-y-auto overflow-x-hidden bg-white text-neutral-950 transition-all dark:bg-neutral-900 dark:text-white md:relative md:inset-x-auto md:inset-y-0 md:left-0 md:w-full',
          open === 'closed' && '-translate-x-full md:translate-x-0',
          open === 'opened' && 'md:translate-x-0'
        )}
      />
      <div className="fixed inset-0 flex flex-col overflow-y-auto overflow-x-hidden max-md:z-[14] md:relative md:inset-x-auto md:left-0 md:bg-neutral-50 dark:md:bg-neutral-800">
        <Navbar className="flex items-center justify-between bg-white px-2 dark:bg-neutral-900 md:px-4">
          {/* menu button */}
          <button
            type="button"
            className={cn(
              'grid h-7 w-7 place-content-center overflow-hidden text-current hover:cursor-pointer focus:outline-none dark:text-white sm:h-10 sm:w-10 md:hidden'
            )}
            onClick={() => setOpen(open === 'opened' ? 'closed' : 'opened')}
          >
            <span className="relative block h-10 w-10">
              <HiMenu
                className={cn(
                  'absolute left-0 top-0 h-6 w-auto translate-y-1/3 transition-all',
                  open === 'closed' ? 'translate-x-2' : '-translate-x-7'
                )}
              />
              <HiPlus
                className={cn(
                  'absolute right-0 top-0 h-6 w-auto translate-y-1/3 rotate-45 transition-all',
                  open === 'opened' ? '-translate-x-2' : 'translate-x-7'
                )}
              />
            </span>
          </button>
          {/* title */}
          <h1 className="text-center  text-xl font-bold uppercase dark:text-white md:text-justify">
            {pathname.split('/')[2] ? pathname.split('/')[2].replace(/-/g, ' ') : 'Dashboard'}
          </h1>
        </Navbar>
        <div className="flex h-full flex-1 flex-col justify-between">
          <Fragment>{children}</Fragment>
          <Footer className="" />
        </div>
      </div>
    </main>
  )
}
