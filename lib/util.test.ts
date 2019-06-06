import { arrToRangeFactory, arrToRange } from './util'

describe('util', () => {
  test('array to factory', () => {
    const factory = arrToRangeFactory([1, 2, 3])
    expect(factory).toBeInstanceOf(Function)
    expect(factory()).toMatchSnapshot()
  })

  test('array to range', () => {
    const r = arrToRange([1, 2, 3])
    expect(r.next()).toEqual({ value: 1, done: false })
    expect(r.next()).toEqual({ value: 2, done: false })
    expect(r.next()).toEqual({ value: 3, done: false })
    expect(r.next()).toEqual({ value: undefined, done: true })
  })
})
