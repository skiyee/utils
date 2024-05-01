import type { Ref } from 'vue'

export type Numeric = number | string

export type MaybeRef<T> = T | Ref<T>

export type MaybeRefOrGetter<T> = MaybeRef<T> | (() => T)
