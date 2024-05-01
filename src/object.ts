import { isObject } from './is'

export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends (infer U)[]
    ? DeepPartial<U>[]
    : T[P] extends object
      ? DeepPartial<T[P]>
      : T[P];
}

export function mergeDeep<T>(original: T, patch: DeepPartial<T>, mergeArray = false): T {
  const o = original as any
  const p = patch as any

  if (Array.isArray(p)) {
    if (mergeArray && Array.isArray(p))
      return [...o, ...p] as any
    else
      return [...p] as any
  }

  const output = { ...o }
  if (isObject(o) && isObject(p)) {
    Object.keys(p).forEach((key) => {
      if (((isObject(o[key]) && isObject(p[key])) || (Array.isArray(o[key]) && Array.isArray(p[key]))))
        output[key] = mergeDeep(o[key], p[key], mergeArray)
      else
        Object.assign(output, { [key]: p[key] })
    })
  }
  return output
}

export function clone<T>(val: T): T {
  let k: any, out: any, tmp: any

  if (Array.isArray(val)) {
    out = Array(k = val.length)
    // eslint-disable-next-line no-cond-assign
    while (k--) out[k] = ((tmp = val[k]) && typeof tmp === 'object') ? clone(tmp) : tmp
    return out as any
  }

  if (Object.prototype.toString.call(val) === '[object Object]') {
    out = {} // null
    for (k in val) {
      if (k === '__proto__') {
        Object.defineProperty(out, k, {
          value: clone((val as any)[k]),
          configurable: true,
          enumerable: true,
          writable: true,
        })
      }
      else {
        // eslint-disable-next-line no-cond-assign
        out[k] = ((tmp = (val as any)[k]) && typeof tmp === 'object') ? clone(tmp) : tmp
      }
    }
    return out
  }

  return val
}

export function omit<T extends Record<string, any>, K extends keyof T>(object: T, keys: K[]): Omit<T, K> {
  if (isObject(object)) {
    return Object.fromEntries(
      Object.entries(object).filter(([key]) => !keys.includes(key as K)),
    ) as Omit<T, K>
  }

  return object
}
