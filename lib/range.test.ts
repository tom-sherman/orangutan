import { range } from './range'

describe('range', () => {
  test('infinite ranges with step = 1', () => {
    const r1a = range(1)
    expect(r1a.next()).toEqual({ value: 1, done: false })
    expect(r1a.next()).toEqual({ value: 2, done: false })
    expect(r1a.next()).toEqual({ value: 3, done: false })
    expect(r1a.next()).toEqual({ value: 4, done: false })

    const r1b = range(1, 2)
    expect(r1b.next()).toEqual({ value: 1, done: false })
    expect(r1b.next()).toEqual({ value: 2, done: false })
    expect(r1b.next()).toEqual({ value: 3, done: false })
    expect(r1b.next()).toEqual({ value: 4, done: false })

    const r2a = range(2)
    expect(r2a.next()).toEqual({ value: 2, done: false })
    expect(r2a.next()).toEqual({ value: 3, done: false })
    expect(r2a.next()).toEqual({ value: 4, done: false })
    expect(r2a.next()).toEqual({ value: 5, done: false })

    const r2b = range(2, 3)
    expect(r2b.next()).toEqual({ value: 2, done: false })
    expect(r2b.next()).toEqual({ value: 3, done: false })
    expect(r2b.next()).toEqual({ value: 4, done: false })
    expect(r2b.next()).toEqual({ value: 5, done: false })

    const r3 = range(-2)
    expect(r3.next()).toEqual({ value: -2, done: false })
    expect(r3.next()).toEqual({ value: -1, done: false })
    expect(r3.next()).toEqual({ value: 0, done: false })
    expect(r3.next()).toEqual({ value: 1, done: false })
  })

  test.todo('infinite range due to unreachable final number')

  test('infinite ranges with custom step', () => {
    const r1 = range(1, 3)
    expect(r1.next()).toEqual({ value: 1, done: false })
    expect(r1.next()).toEqual({ value: 3, done: false })
    expect(r1.next()).toEqual({ value: 5, done: false })
    expect(r1.next()).toEqual({ value: 7, done: false })

    const r2 = range(2, 1)
    expect(r2.next()).toEqual({ value: 2, done: false })
    expect(r2.next()).toEqual({ value: 1, done: false })
    expect(r2.next()).toEqual({ value: 0, done: false })
    expect(r2.next()).toEqual({ value: -1, done: false })

    const r3 = range(2, -1)
    expect(r3.next()).toEqual({ value: 2, done: false })
    expect(r3.next()).toEqual({ value: -1, done: false })
    expect(r3.next()).toEqual({ value: -4, done: false })
    expect(r3.next()).toEqual({ value: -7, done: false })
  })

  test('finite range with step = 1', () => {
    expect(Array.from(range(1, undefined, 5))).toEqual([1, 2, 3, 4, 5])
    expect(Array.from(range(2, undefined, 5))).toEqual([2, 3, 4, 5])
    expect(Array.from(range(-1, undefined, 5))).toEqual([-1, 0, 1, 2, 3, 4, 5])
    expect(Array.from(range(0, undefined, 5))).toEqual([0, 1, 2, 3, 4, 5])
  })

  test('finite range with custom step', () => {
    expect(Array.from(range(1, 3, 6))).toEqual([1, 3, 5])
    expect(Array.from(range(1, 3, 5))).toEqual([1, 3, 5])
    expect(Array.from(range(1, 3, 4))).toEqual([1, 3])
    expect(Array.from(range(1, -1, -4))).toEqual([1, -1, -3])
  })

  test('singleton range', () => {
    expect(Array.from(range(1, undefined, 1))).toEqual([1])
  })
})
