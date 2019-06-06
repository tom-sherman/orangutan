export type Range = IterableIterator<number>
export type RangeFactory = () => Range
/**
 * A function that is returned from other range factory methods.
 */
export type PartialRangeFactory = (factory: RangeFactory) => RangeFactory

/**
 * Converts an array to a generator.
 */
export const arrToRangeFactory = (array: number[]): RangeFactory =>
  array[Symbol.iterator].bind(array)

/**
 * Converts an array to an iterator.
 */
export const arrToRange = (array: number[]): Range => arrToRangeFactory(array)()

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
