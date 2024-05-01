import { expect, it } from 'vitest'
import { addUnit } from '../src/format'

it('addUnit', () => {
  expect(addUnit(undefined, 'px', true)).toBe('0px')
  expect(addUnit(0, 'rem')).toBe('0rem')
  expect(addUnit(0, 'rem', true)).toBe('0rem')
})
