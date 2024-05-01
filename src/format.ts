import type { Numeric } from './types'
import { isArray, isNumeric, isUndef } from './is'

export function addUnit(
  value: Numeric | undefined,
  unit = 'px',
  hasZeroValue = false,
): string {
  if (isUndef(value))
    return hasZeroValue ? `0${unit}` : ''

  if (!isNumeric(value))
    return value

  return `${value}${unit}`
}

export function toArray<T>(value: T | T[] | undefined | null): T[] {
  if (isUndef(value))
    return []

  return isArray(value) ? value : [value]
}

export function toKebabCase(key: string) {
  return (
    key && key
      .replace(/([A-Z])/g, ' $1')
      .trim()
      .split(' ')
      .join('-')
      .toLowerCase()
  )
}
