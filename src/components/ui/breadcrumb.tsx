import { ReactNode } from 'react'
import { cn } from '~/utils/classNames'

export function BreadCrumb({
  children,
  separator,
  className
}: {
  children: ReactNode
  separator?: string | JSX.Element
  className?: string
}) {
  // check if children is an array
  if (!Array.isArray(children) || children.length < 2) {
    return children
  }

  // push the children into an array
  let c = Array.isArray(children) ? children : [children]

  c = c?.reduce((accumulator: ReactNode[], child, index, self) => {
    // add a separator between the two items
    index < self.length - 1 ? accumulator.push(child, <span>{separator ?? '/'}</span>) : accumulator.push(child)

    // return the accumulator
    return accumulator
  }, [])

  return (
    <ol className={cn(className)}>
      {c?.map((child, i) => (
        <li key={i} className="list-none">
          {child}
        </li>
      ))}
    </ol>
  )
}
