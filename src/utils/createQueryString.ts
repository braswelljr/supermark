import { ReadonlyURLSearchParams } from 'next/navigation'
import { Primitive } from '~/types/types'

export function createQueryString(
  searchParams: ReadonlyURLSearchParams | URLSearchParams,
  name: string,
  value: Primitive
) {
  const params = new URLSearchParams(searchParams)

  if (!value) return params.toString()

  params.set(name, value.toString())

  return params.toString()
}
