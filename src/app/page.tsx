import { siteConfig } from '~/config/site'
import { ThemeSwitch } from '~/components/ui/theme-switch'

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col justify-between">
      <div className="">
        <main className="min-h-screen">
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
