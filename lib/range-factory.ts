import { RangeFactory, arrToRangeFactory } from './util'
import { range } from './range'

export const rangeFactory = (
  first: number,
  second?: number,
  last?: number
): RangeFactory => () => range(first, second, last)

/**
 * Takes the first n elements from a range.
 */
export const take = (n: number) => (factory: RangeFactory): RangeFactory =>
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
 * Checks if a range is longer than `n`
 */
export const longerThan = (n: number) => (factory: RangeFactory) => {
  const r = factory()
  let length = 0
  for (const _ of r) {
    length++
    if (length > n) {
      return true
    }
  }

  // Handle empty ranges
  if (length > n) {
    return true
  }

  return false
}

/**
 * Checks if a range is not empty ie. has elements.
 */
export const nonEmpty = (factory: RangeFactory) => !factory().next().done

/**
 * Discards (drops) `n` elements from the start of the range.
 */
export const drop = (n: number) => (factory: RangeFactory) =>
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
export const concat = (...factories: RangeFactory[]) => function* concatGen() {
  for (const factory of factories) {
    for (const element of factory()) {
      yield element
    }
  }
}
