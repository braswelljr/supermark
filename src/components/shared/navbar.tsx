'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FiUser } from 'react-icons/fi'
import { HiOutlineExternalLink } from 'react-icons/hi'
import { LuLogOut } from 'react-icons/lu'
import { PiFlagBannerFill } from 'react-icons/pi'
import { siteConfig } from '~/config/site'
import { Avatar, AvatarFallback, AvatarImage } from '~/components/ui/avatar'
import { buttonVariants } from '~/components/ui/button'
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

export default function Navbar({ className }: { className?: string }) {
  const { user, logout } = useAuthentication()
  const pathname = usePathname()

  if ([`/login`, `/register`, '/'].includes(pathname) || pathname.startsWith('/dashboard')) return null

  return (
    <>
      <div className="w-full bg-neutral-950 px-4 py-2 text-center text-white">
        <p className="inline-flex items-center justify-center space-x-2">
          <PiFlagBannerFill className="" /> <span>Trade as much as you can!</span>
        </p>
      </div>
      <nav
        className={cn(
          'sticky inset-x-0 top-0 flex w-full items-center justify-between bg-white/60 px-4 py-4 shadow backdrop-blur dark:bg-neutral-900/80 sm:px-8',
          className
        )}
      >
        <h1 className="text-xl font-bold uppercase">{siteConfig.name}</h1>
        <ul className="flex justify-between space-x-4">
          {user ? (
            <Fragment>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="bg-primary-800 h-8 w-8 cursor-pointer rounded-full p-0 text-white">
                    <AvatarImage src={user.avatar || ''} alt="" />
                    <AvatarFallback className="bg-primary-800">
                      {user ? user.name.charAt(0).toUpperCase() : <FiUser className="h-4 w-auto" />}
                    </AvatarFallback>
                  </Avatar>
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
                    <ThemeSwitch layoutId="--top-theme-switch-button--" />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
            </Fragment>
          ) : (
            <Fragment>
              <Link href="/login" className={cn(buttonVariants({ variant: 'outline', size: 'md' }))}>
                Login
              </Link>
              <Link href="/register" className={cn(buttonVariants({ variant: 'default', size: 'md' }))}>
                Register
              </Link>
            </Fragment>
          )}
        </ul>
      </nav>
    </>
  )
}
