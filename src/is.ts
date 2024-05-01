import type { Numeric } from './types'

export function isUndef(v: any): v is undefined | null {
  return v === undefined || v === null
}

export function isDef<T>(v: T): v is NonNullable<T> {
  return !(isUndef(v))
}

export function isString(value: any): value is string {
  return isDef(value) && typeof value === 'string'
}

export function isFn(value: any): value is Function {
  return isDef(value) && typeof value === 'function'
}

export function isArray(arg: any): arg is any[] {
  return isDef(arg) && Array.isArray(arg)
}

export function isObject(arg: any): arg is Record<string, any> {
  return isDef(arg) && typeof arg === 'object' && !isArray(arg)
}

export function isNumber(value: any): value is number {
  return isDef(value) && typeof value === 'number'
}

export function isBoolean(value: any): value is boolean {
  return isDef(value) && typeof value === 'boolean'
}

export function isEmptyArray(arg: any): arg is [] {
  return isArray(arg) && arg.length === 0
}

export function isEmptyObject(arg: any): arg is Record<string, any> {
  return isObject(arg) && Object.keys(arg).length === 0
}

export function isNumeric(value: any): value is Numeric {
  return isDef(value) && !Number.isNaN(value)
}
