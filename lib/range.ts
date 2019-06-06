import { Range } from './util'

export function* range(first: number, second?: number, last = Infinity): Range {
  const step = typeof second === 'undefined' ? 1 : second - first

  yield first
  let current = first + step

  // We use Math.abs here to handle negative numbers.
  // If we did a simple current <= last then we would get last(2,1,-5) => [2]
  while (Math.abs(current) <= Math.abs(last)) {
    yield current
    current += step
  }
}
