import type { PropType, StyleValue } from 'vue-demi'
import type { Numeric } from './types'

type ClassValue = string | object | ClassValue[]

export const customClassProp = {
  type: [String, Object, Array] as PropType<ClassValue>,
  default: '',
}

export const customStyleProp = {
  type: [String, Object, Array] as PropType<StyleValue>,
  default: '',
}

export const numericProp = [Number, String]

export const truthProp = {
  type: Boolean,
  default: true as const,
}

export function genStringProp<T extends string>(defaultValue: T) {
  return {
    type: String as unknown as PropType<T>,
    default: defaultValue,
  }
}

export function genNumericProp<T extends Numeric>(defaultValue: T) {
  return {
    type: numericProp,
    default: defaultValue,
  }
}

export function genNumberProp<T>(defaultValue: T) {
  return {
    type: Number,
    default: defaultValue,
  }
}

export function genRequiredProp<T>(type: T) {
  return {
    type,
    required: true as const,
  }
}
