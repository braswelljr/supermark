import { Fragment, ReactNode } from 'react'
import { ThemeProvider } from '~/providers/theme'
import { Toaster } from '~/components/ui/toaster'

export default function RootWrapper({ children }: { children?: ReactNode }): React.JSX.Element {
  return (
    <Fragment>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </Fragment>
  )
}
