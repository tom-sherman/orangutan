import { RangeFactory, arrToRangeFactory, PartialRangeFactory } from './util'
import { range } from './range'

export const rangeFactory = (
  first: number,
  second?: number,
  last?: number
): RangeFactory => () => range(first, second, last)

/**
 * Takes the first n elements from a range.
 */
export const take = (n: number): PartialRangeFactory => (
  factory: RangeFactory
) =>
  function* takeGen() {
    if (Array.isArray(factory)) {
      factory = arrToRangeFactory(factory)
    }
    const r = factory()
    let count = 0
    let current = r.next()
    while (count < n && current.done === false) {
      yield current.value
      current = r.next()
      count++
    }
  }

/**
 * Repeats a range indefinitely.
 */
export const cycle = (factory: RangeFactory): RangeFactory =>
  function* cycleGen() {
    let r = factory()

    let current = r.next()
    while (true) {
      if (current.done) {
        r = factory()
        current = r.next()
        continue
      }
      yield current.value
      current = r.next()
    }
  }

/**
 * Discards (drops) `n` elements from the start of the range.
 */
export const drop = (n: number): PartialRangeFactory => (
  factory: RangeFactory
) =>
  function* dropGen() {
    const r = factory()
    let count = 0

    // Skip n elements
    while (count < n) {
      r.next()
      count++
    }

    // Yield the remaining elements
    for (const element of r) {
      yield element
    }
  }

/**
 * Split the range at `n`, yielding the left side followed by the right side.
 */
export const splitAt = (n: number) => (factory: RangeFactory) =>
  function* splitAtGen() {
    yield take(n)(() => factory())
    yield drop(n)(() => factory())
  }

/**
 * Concat multiple ranges together.
 */
export const concat = (...factories: RangeFactory[]) =>
  function* concatGen() {
    for (const factory of factories) {
      for (const element of factory()) {
        yield element
      }
    }
  }

/**
 * Yields an array of the element and the index. [i, element]
 * Similar to `Array.prototype.entries`.
 */
export const entries = (factory: RangeFactory) =>
  function* entriesGen(): IterableIterator<[number, number]> {
    let i = 0
    for (const element of factory()) {
      yield [i, element]
      i++
    }
  }

type MapCallback = (element: number, index: number) => any

/**
 * Maps over every element in the array.
 * Similar to `Array.prototype.map`.
 *
 * An example of an infinite range of repeating 1s and 0s:
 * ```js
 * map(x => x % 2)(range(1))
 * ```
 */
export const map = (cb: MapCallback): PartialRangeFactory => (
  factory: RangeFactory
) =>
  function* mapGen() {
    for (const [i, element] of entries(factory)()) {
      yield cb(element, i)
    }
  }
