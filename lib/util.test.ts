import { arrToRangeFactory, arrToRange, longerThan, nonEmpty } from './util'

const infiniteRangeFactory = function*() {
  let i = 0
  while (true) {
    yield (i += 1)
  }
}

const finiteRangeFactory = function*() {
  yield 1
  yield 2
  yield 3
}

const emptyRangeFactory = function*(): any {
  return
}

test('array to factory', () => {
  const factory = arrToRangeFactory([1, 2, 3])
  expect(factory).toBeInstanceOf(Function)
  expect(factory().next()).toEqual({ value: 1, done: false })
  expect(factory().next()).toEqual({ value: 1, done: false })

  const iterator = factory()
  expect(iterator.next()).toEqual({ value: 1, done: false })
  expect(iterator.next()).toEqual({ value: 2, done: false })
  expect(iterator.next()).toEqual({ value: 3, done: false })
  expect(iterator.next()).toEqual({ value: undefined, done: true })
})

test('array to range', () => {
  const r = arrToRange([1, 2, 3])
  expect(r.next()).toEqual({ value: 1, done: false })
  expect(r.next()).toEqual({ value: 2, done: false })
  expect(r.next()).toEqual({ value: 3, done: false })
  expect(r.next()).toEqual({ value: undefined, done: true })
})

describe('longer than', () => {
  test('returns true when the range is longer', () => {
    expect(longerThan(10)(infiniteRangeFactory)).toBe(true)
    expect(longerThan(1)(infiniteRangeFactory)).toBe(true)
    expect(longerThan(0)(infiniteRangeFactory)).toBe(true)
    expect(longerThan(-1)(infiniteRangeFactory)).toBe(true)
    expect(longerThan(-10)(infiniteRangeFactory)).toBe(true)

    expect(longerThan(2)(finiteRangeFactory)).toBe(true)
    expect(longerThan(1)(finiteRangeFactory)).toBe(true)
    expect(longerThan(0)(finiteRangeFactory)).toBe(true)
    expect(longerThan(-1)(finiteRangeFactory)).toBe(true)
    expect(longerThan(-10)(finiteRangeFactory)).toBe(true)

    expect(longerThan(-1)(emptyRangeFactory)).toBe(true)
  })

  test('returns false when range is same length', () => {
    expect(longerThan(3)(finiteRangeFactory)).toBe(false)

    expect(longerThan(0)(emptyRangeFactory)).toBe(false)
  })

  test('returns false when range is shorter', () => {
    expect(longerThan(4)(finiteRangeFactory)).toBe(false)
    expect(longerThan(5)(finiteRangeFactory)).toBe(false)

    expect(longerThan(1)(emptyRangeFactory)).toBe(false)
    expect(longerThan(2)(emptyRangeFactory)).toBe(false)
  })
})

describe('non empty', () => {
  test('returns true with non empty range', () => {
    expect(nonEmpty(finiteRangeFactory)).toBe(true)
    expect(nonEmpty(infiniteRangeFactory)).toBe(true)
  })

  test('returns false with empty range', () => {
    expect(nonEmpty(emptyRangeFactory)).toBe(false)
  })
})
