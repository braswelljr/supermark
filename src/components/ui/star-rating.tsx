'use client'

import { RiStarFill, RiStarHalfFill, RiStarLine } from 'react-icons/ri'
import { cn } from '~/utils/classNames'

/**
 * StarRate - a component to display a star rating
 *
 * @param {object} props - the props
 * @param {keyof React.JSX.IntrinsicElements} props.Component - the component to render
 * @param {string | undefined} props.className - additional class names for container
 * @param {string | undefined} props.starClassName - additional class names  for stars
 * @param {number} props.rating - the rating to display
 * @param {number | undefined} props.totalRate - the total rationg (default: 5)
 * @param {React.JSX.ElementAttributesProperty} props.props - additional props for container
 *
 * @returns {React.JSX.Element}
 */
export function StarRate({
  Component = 'div',
  className,
  starClassName,
  rating,
  totalRate = 5,
  props
}: {
  Component?: keyof JSX.IntrinsicElements
  className?: string
  starClassName?: string
  rating: number
  totalRate?: number
  props?: React.JSX.ElementAttributesProperty
}): React.JSX.Element {
  // get the decimal part of the rating
  const decimalPart = rating % 1
  // get the integer part of the rating
  const fullStars = Math.floor(rating)
  // get the half star
  const halfStars = decimalPart >= 0.25 && decimalPart < 0.75 ? 1 : 0
  // get the empty stars
  const emptyStars = totalRate - fullStars - halfStars

  // get an array of stars
  const stars: ('full' | 'half' | 'empty')[] = [
    ...Array(fullStars).fill('full'),
    ...Array(halfStars).fill('half'),
    ...Array(emptyStars).fill('empty')
  ]

  return (
    <Component className={cn(className)} {...props}>
      {stars.map((star, index) => {
        // full star
        if (star === 'full') {
          return (
            <RiStarFill key={index} className={cn(starClassName ? starClassName : 'text-primary-700 h-2 w-auto')} />
          )
        } else if (star === 'half') {
          return (
            <RiStarHalfFill key={index} className={cn(starClassName ? starClassName : 'text-primary-700 h-2 w-auto')} />
          )
        }

        return <RiStarLine key={index} className={cn(starClassName ? starClassName : 'text-primary-700 h-2 w-auto')} />
      })}
    </Component>
  )
}
