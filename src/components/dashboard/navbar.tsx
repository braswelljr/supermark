'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiUser } from 'react-icons/fi'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { HiBellAlert } from 'react-icons/hi2'
import { LuLogOut } from 'react-icons/lu'
import { BreadCrumb } from '~/components/ui/breadcrumb'
import { Button } from '~/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '~/components/ui/dropdown-menu'
import { ThemeSwitch } from '~/components/ui/theme-switch'
import useAuthentication from '~/context/useAuthentication'
import { cn } from '~/utils/classNames'
import pathsWithLinks from '~/utils/pathWithLink'

/**
 * Navbar - A header component for the dashboard
 *
 * @param title - The title of the component
 * @param subtitle - The subtitle of the component
 * @param className - The className of the component
 * @returns {React.JSX.Element} A header component for the dashboard
 */
export default function Navbar({
  children,
  className
}: {
  children: ReactNode
  className?: string
}): React.JSX.Element {
  const { logout } = useAuthentication()
  const pathname = usePathname()

  const pathWithLinks = pathsWithLinks(pathname, ['/dashboard'])

  return (
    <header
      className={cn(
        'sticky inset-x-0 top-0 z-[7] divide-y-[0.02px] divide-neutral-300 border-b-[0.02px] border-neutral-300 dark:divide-neutral-700 dark:border-neutral-700 dark:bg-neutral-950'
      )}
    >
      <nav className={cn('py-3', className)}>
        {children}
        <div className="flex items-center space-x-2 sm:space-x-4">
          <Button type="button" className="h-8 w-8 rounded-full p-0 text-white">
            <HiBellAlert className="h-4 w-auto" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button type="button" className="h-8 w-8 rounded-full p-0 text-white">
                <FiUser className="h-4 w-auto" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-neutral-900" align="end">
              <DropdownMenuLabel>Profile</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => {}} className="cursor-pointer justify-between">
                <span className="">View</span>
                <HiOutlineExternalLink className="h-4 w-auto" />
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => logout()} className="cursor-pointer justify-between">
                <span className="">Logout</span>
                <LuLogOut className="h-4 w-auto" />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <div className="flex justify-center">
                <ThemeSwitch layoutId="--top--button---" />
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
      {pathWithLinks && pathWithLinks.length > 1 && pathWithLinks && (
        <BreadCrumb
          className={cn(
            'flex items-center space-x-2 overflow-x-auto whitespace-nowrap bg-white px-4 py-3 text-xs not-last:font-semibold dark:bg-neutral-900 lg:text-sm'
          )}
          separator={'/'}
        >
          {pathWithLinks.map((path, i, self) => {
            path.name = path.name.replace(/#*/g, '')

            // let name = path.name.includes('-') ? `<${path.name.replace(/-/g, ' ')}>` : path.name
            const name = path.name

            if (i === self.length - 1) {
              return (
                <span key={i} className="text-neutral-500">
                  {name}
                </span>
              )
            }

            return (
              <Link key={i} href={path.link} className={cn('group/breadlink relative cursor-pointer px-1 py-0.5')}>
                {name}
                <span className="absolute inset-x-0 bottom-0 block h-[3px] w-0 rounded-md bg-neutral-900 transition-width group-hover/breadlink:w-full dark:bg-white" />
              </Link>
            )
          })}
        </BreadCrumb>
      )}
    </header>
  )
}
