import { siteConfig } from '~/config/site'
import { ThemeSwitch } from '~/components/ui/theme-switch'

export default function Footer() {
  return (
    <footer className="px-4 py-2 sm:px-8 sm:py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="">
          @{new Date().getFullYear()} {siteConfig.name}
        </h1>
        <ThemeSwitch className="" />
      </div>
    </footer>
  )
}
