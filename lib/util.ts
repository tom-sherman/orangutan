export type Range = IterableIterator<number>
export type RangeFactory = () => Range

/**
 * Converts an array to a generator.
 */
export const arrToRangeFactory = (array: number[]): RangeFactory =>
  array[Symbol.iterator].bind(array)

/**
 * Converts an array to an iterator.
 */
export const arrToRange = (array: number[]): Range => arrToRangeFactory(array)()
