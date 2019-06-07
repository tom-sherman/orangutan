import {
  take,
  cycle,
  splitAt,
  drop,
  concat,
  map,
  entries
} from './range-factory'
import { range } from './range'
import { RangeFactory } from './util'

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

describe('take', () => {
  test('take from infinite range', () => {
    const r1 = take(3)(infiniteRangeFactory)()
    expect(Array.from(r1)).toEqual([1, 2, 3])

    const r2 = take(1)(infiniteRangeFactory)()
    expect(Array.from(r2)).toEqual([1])

    const r3 = take(5)(infiniteRangeFactory)()
    expect(Array.from(r3)).toEqual([1, 2, 3, 4, 5])

    const r4 = take(0)(infiniteRangeFactory)()
    expect(Array.from(r4)).toEqual([])

    const takeNegative = take(-1)(infiniteRangeFactory)()
    expect(Array.from(takeNegative)).toEqual([])
  })

  test('take from finite range, n < length', () => {
    const take0Range = take(0)(finiteRangeFactory)()
    expect(Array.from(take0Range)).toEqual([])

    const take1Range = take(1)(finiteRangeFactory)()
    expect(Array.from(take1Range)).toEqual([1])

    const takeNegativeRange = take(-1)(finiteRangeFactory)()
    expect(Array.from(takeNegativeRange)).toEqual([])
  })

  test('take from finite range, n = length', () => {
    expect(Array.from(take(3)(finiteRangeFactory)())).toEqual([1, 2, 3])
  })

  test('take from finite range, n > length', () => {
    expect(Array.from(take(4)(finiteRangeFactory)())).toEqual([1, 2, 3])
  })

  test('take from empty range', () => {
    const take0 = take(0)(emptyRangeFactory)()
    expect(Array.from(take0)).toEqual([])

    const take1 = take(1)(emptyRangeFactory)()
    expect(Array.from(take1)).toEqual([])

    const takeNegative = take(-1)(emptyRangeFactory)()
    expect(Array.from(takeNegative)).toEqual([])
  })
})

describe('cycle', () => {
  test('cycles finite range', () => {
    const c = cycle(finiteRangeFactory)()
    expect(c.next()).toEqual({ value: 1, done: false })
    expect(c.next()).toEqual({ value: 2, done: false })
    expect(c.next()).toEqual({ value: 3, done: false })
    expect(c.next()).toEqual({ value: 1, done: false })
    expect(c.next()).toEqual({ value: 2, done: false })
    expect(c.next()).toEqual({ value: 3, done: false })
    expect(c.next()).toEqual({ value: 1, done: false })
  })

  test('cycles infinite range', () => {
    const c = cycle(infiniteRangeFactory)()
    expect(c.next()).toEqual({ value: 1, done: false })
    expect(c.next()).toEqual({ value: 2, done: false })
    expect(c.next()).toEqual({ value: 3, done: false })
    expect(c.next()).toEqual({ value: 4, done: false })
    expect(c.next()).toEqual({ value: 5, done: false })
    expect(c.next()).toEqual({ value: 6, done: false })
    expect(c.next()).toEqual({ value: 7, done: false })
  })

  test('should throw when passing range', () => {
    const r = (range(1) as unknown) as RangeFactory
    expect(() => cycle(r)().next()).toThrow('factory is not a function')
  })
})

describe('drop', () => {
  test('infinite range, n > 0', () => {
    const drop1 = drop(1)(infiniteRangeFactory)()
    expect(drop1.next()).toEqual({ value: 2, done: false })

    const drop2 = drop(2)(infiniteRangeFactory)()
    expect(drop2.next()).toEqual({ value: 3, done: false })
  })

  test('infinite range, n == 0', () => {
    const drop0 = drop(0)(infiniteRangeFactory)()
    expect(drop0.next()).toEqual({ value: 1, done: false })
  })

  test('infinite range, n <= 0', () => {
    const dropNegative = drop(-1)(infiniteRangeFactory)()
    expect(dropNegative.next()).toEqual({ value: 1, done: false })
  })

  test('finite range, n > length', () => {
    const drop4 = drop(4)(finiteRangeFactory)()
    expect(Array.from(drop4)).toEqual([])
  })

  test('finite range, n < length', () => {
    const drop1 = drop(1)(finiteRangeFactory)()
    expect(Array.from(drop1)).toEqual([2, 3])
  })

  test('finite range, n == length', () => {
    const drop3 = drop(3)(finiteRangeFactory)()
    expect(Array.from(drop3)).toEqual([])
  })

  test('finite range, n < 0', () => {
    const dropNegative = drop(-1)(finiteRangeFactory)()
    expect(Array.from(dropNegative)).toEqual([1, 2, 3])
  })

  test('finite range, length == 0', () => {
    const drop0 = drop(0)(emptyRangeFactory)()
    expect(Array.from(drop0)).toEqual([])

    const drop1 = drop(1)(emptyRangeFactory)()
    expect(Array.from(drop1)).toEqual([])

    const dropNegative = drop(-1)(emptyRangeFactory)()
    expect(Array.from(dropNegative)).toEqual([])
  })
})

const expandSplitRange = (split: IterableIterator<RangeFactory>) =>
  Array.from(split).map(s => Array.from(s()))

describe('split at', () => {
  test('finite range, n < length', () => {
    const split0 = splitAt(0)(finiteRangeFactory)()
    expect(expandSplitRange(split0)).toEqual([[], [1, 2, 3]])

    const splitNegative = splitAt(-1)(finiteRangeFactory)()
    expect(expandSplitRange(splitNegative)).toEqual([[], [1, 2, 3]])

    const split1 = splitAt(1)(finiteRangeFactory)()
    expect(expandSplitRange(split1)).toEqual([[1], [2, 3]])

    const split2 = splitAt(2)(finiteRangeFactory)()
    expect(expandSplitRange(split2)).toEqual([[1, 2], [3]])
  })

  test('finite range, n > length', () => {
    const split4 = splitAt(4)(finiteRangeFactory)()
    expect(expandSplitRange(split4)).toEqual([[1, 2, 3], []])
  })

  test('infinite range, n = 0', () => {
    const [left, right] = splitAt(0)(infiniteRangeFactory)()
    const leftIterator = left()
    const rightIterator = right()

    expect(Array.from(leftIterator)).toEqual([])
    expect(rightIterator.next()).toEqual({ value: 1, done: false })
    expect(rightIterator.next()).toEqual({ value: 2, done: false })
    expect(rightIterator.next()).toEqual({ value: 3, done: false })
    expect(rightIterator.next()).toEqual({ value: 4, done: false })
  })

  test('infinite range, n > 0', () => {
    const [left, right] = splitAt(3)(infiniteRangeFactory)()
    const leftIterator = left()
    const rightIterator = right()

    expect(Array.from(leftIterator)).toEqual([1, 2, 3])
    expect(rightIterator.next()).toEqual({ value: 4, done: false })
    expect(rightIterator.next()).toEqual({ value: 5, done: false })
    expect(rightIterator.next()).toEqual({ value: 6, done: false })
  })

  test('infinite range, n < 0', () => {
    const [left, right] = splitAt(-1)(infiniteRangeFactory)()
    const leftIterator = left()
    const rightIterator = right()

    expect(Array.from(leftIterator)).toEqual([])
    expect(rightIterator.next()).toEqual({ value: 1, done: false })
    expect(rightIterator.next()).toEqual({ value: 2, done: false })
    expect(rightIterator.next()).toEqual({ value: 3, done: false })
    expect(rightIterator.next()).toEqual({ value: 4, done: false })
  })

  test('empty range', () => {
    const expected = [[], []]

    const split0 = splitAt(0)(emptyRangeFactory)()
    expect(expandSplitRange(split0)).toEqual(expected)

    const split1 = splitAt(1)(emptyRangeFactory)()
    expect(expandSplitRange(split1)).toEqual(expected)

    const splitNegative = splitAt(-1)(emptyRangeFactory)()
    expect(expandSplitRange(splitNegative)).toEqual(expected)
  })
})

describe('concat', () => {
  test('concat single range', () => {
    expect(Array.from(concat(finiteRangeFactory)())).toEqual([1, 2, 3])
    expect(Array.from(concat(emptyRangeFactory)())).toEqual([])

    const infinite = concat(infiniteRangeFactory)()
    expect(infinite.next()).toEqual({ value: 1, done: false })
    expect(infinite.next()).toEqual({ value: 2, done: false })
    expect(infinite.next()).toEqual({ value: 3, done: false })
    expect(infinite.next()).toEqual({ value: 4, done: false })
  })

  test('concat to make infinite range', () => {
    const r1 = concat(finiteRangeFactory, infiniteRangeFactory)()
    expect(r1.next()).toEqual({ value: 1, done: false })
    expect(r1.next()).toEqual({ value: 2, done: false })
    expect(r1.next()).toEqual({ value: 3, done: false })
    expect(r1.next()).toEqual({ value: 1, done: false })

    const r2 = concat(emptyRangeFactory, infiniteRangeFactory)()
    expect(r2.next()).toEqual({ value: 1, done: false })
    expect(r2.next()).toEqual({ value: 2, done: false })
    expect(r2.next()).toEqual({ value: 3, done: false })
    expect(r2.next()).toEqual({ value: 4, done: false })
  })

  test('concat to make finite range', () => {
    expect(
      Array.from(concat(finiteRangeFactory, finiteRangeFactory)())
    ).toEqual([1, 2, 3, 1, 2, 3])

    const expected = Array.from(finiteRangeFactory())
    expect(Array.from(concat(emptyRangeFactory, finiteRangeFactory)())).toEqual(
      expected
    )
    expect(Array.from(concat(finiteRangeFactory, emptyRangeFactory)())).toEqual(
      expected
    )
  })
})

describe('entries', () => {
  test('entries on empty range', () => {
    expect(Array.from(entries(emptyRangeFactory)())).toEqual([])
  })

  test('entries on finite range', () => {
    expect(Array.from(entries(finiteRangeFactory)())).toEqual([
      [0, 1],
      [1, 2],
      [2, 3]
    ])
  })
  test('entries on infinite range', () => {
    const infinite = entries(infiniteRangeFactory)()
    expect(infinite.next()).toEqual({ value: [0, 1], done: false })
    expect(infinite.next()).toEqual({ value: [1, 2], done: false })
    expect(infinite.next()).toEqual({ value: [2, 3], done: false })
  })
})

describe('map', () => {
  test('map with noop', () => {
    const noop = () => {}
    expect(Array.from(map(noop)(finiteRangeFactory)())).toEqual([
      undefined,
      undefined,
      undefined
    ])
  })

  test('map element', () => {
    const mod2 = map(x => x % 2)(finiteRangeFactory)()
    expect(Array.from(mod2)).toEqual([1, 0, 1])
  })

  test('map element with index', () => {
    const mapped = map((x, i) => x + i)(finiteRangeFactory)()
    expect(Array.from(mapped)).toEqual([1, 3, 5])
  })
})
