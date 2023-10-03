'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { HiMenu, HiPlus } from 'react-icons/hi'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import useStore from '~/store/index'
import { DASHBOARD_NAV_LINKS } from '~/config/navigation'
import { siteConfig } from '~/config/site'
import { cn } from '~/utils/classNames'

/**
 * Sidbar - A navigation component for the dashboard
 * @param className - The className of the component
 * @returns {React.JSX.Element} A navigation component for the dashboard
 */
export default function Sidebar({ className }: { className?: string }): React.JSX.Element {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useStore(state => [state.dashboardnavIsOpen, state.setDashboardnavIsOpen])
  const [tab, setTab] = useState(Object.values(DASHBOARD_NAV_LINKS).map(values => Object.values(values)[0].href)[0])

  // Set the active tab based on the current route
  useEffect(() => {
    const routerTab = pathname.split('/')[2] ? pathname.split('/')[2] : pathname.split('/')[1]
    if (routerTab) {
      Object.values(DASHBOARD_NAV_LINKS).forEach(({ page }) => {
        const pageTab = page.split('/')[2] ? page.split('/')[2] : page.split('/')[1]
        if (pageTab === routerTab) {
          setTab(page)
          // console.log(tab)
          setIsOpen('closed')
        }
      })
    }
  }, [pathname, setIsOpen])

  return (
    <aside
      aria-roledescription="navigation"
      role="navigation"
      className={cn('flex flex-col justify-between', className)}
    >
      {/* header */}
      <div className="">
        {/* TITLE */}
        <div className="flex items-center justify-between px-3 py-3">
          <Link
            href="/dashboard"
            className="text-primary-900 group flex items-center space-x-1 font-mono text-2xl font-semibold uppercase"
          >
            <span className="group-hover:animate-spin">
              <Image src="/icons/icon.png" alt="" height={35} width={35} />
            </span>
            <span>{siteConfig.name}</span>
          </Link>
          {/* menu button */}
          <button
            type="button"
            role="navigation"
            className={cn(
              'bg-primary-900 text-primary-100 absolute bottom-5 right-5 grid h-10 w-10 place-content-center overflow-hidden rounded-sm hover:cursor-pointer focus:outline-none md:hidden'
            )}
            onClick={() => setIsOpen(isOpen === 'opened' ? 'closed' : 'opened')}
          >
            <span className="relative block h-10 w-10">
              <HiMenu
                className={cn(
                  'absolute left-0 top-0 h-6 w-auto translate-y-1/3 transition-all',
                  isOpen === 'closed' ? 'translate-x-2' : '-translate-x-7'
                )}
              />
              <HiPlus
                className={cn(
                  'absolute right-0 top-0 h-6 w-auto translate-y-1/3 rotate-45 transition-all',
                  isOpen === 'opened' ? '-translate-x-2' : 'translate-x-7'
                )}
              />
            </span>
          </button>
        </div>
        {/* Links */}
        <div className="py-3">
          <LayoutGroup>
            <motion.ul>
              {Object.entries(DASHBOARD_NAV_LINKS).map(([key, val]) => (
                <Link key={key} className="relative block px-2 py-1.5 text-sm font-bold" href={val.page}>
                  <AnimatePresence>
                    {tab === val.page && (
                      <motion.div
                        layoutId="highlightMenu"
                        className={cn('absolute inset-0 rounded-md bg-neutral-900 dark:bg-neutral-100')}
                      />
                    )}
                  </AnimatePresence>
                  <span
                    className={cn(
                      'relative z-10 flex w-full transform items-center space-x-2 transition-colors duration-300 focus:outline-none',
                      tab === val.page && 'translate-x-3'
                    )}
                  >
                    {val.icon}
                    <span className="">{key}</span>
                  </span>
                </Link>
              ))}
            </motion.ul>
          </LayoutGroup>
        </div>
      </div>
    </aside>
  )
}
