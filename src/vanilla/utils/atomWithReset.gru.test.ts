/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { atom } from '../../vanilla.ts'
import { atomWithReset } from './atomWithReset.ts'
import { RESET } from './constants.ts'

vi.mock('../../vanilla.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../vanilla.ts')>()
  return {
    ...actual,
    atom: vi.fn(actual.atom),
  }
})

describe('atomWithReset', () => {
  let initialValue: number
  let testAtom: any

  beforeEach(() => {
    vi.clearAllMocks()
    initialValue = 10
    testAtom = atomWithReset(initialValue)
  })

  it('should create an atom with initial value', () => {
    const { init } = testAtom
    expect(init).toBe(initialValue)
  })

  it('should reset to initial value using RESET', () => {
    const set = vi.fn()
    const get = vi.fn(() => 20)
    testAtom.write(get, set, RESET)
    expect(set).toHaveBeenCalledWith(testAtom, initialValue)
  })

  it('should update atom with a new value', () => {
    const set = vi.fn()
    const get = vi.fn(() => 20)
    testAtom.write(get, set, 30)
    expect(set).toHaveBeenCalledWith(testAtom, 30)
  })

  it('should update atom using a function', () => {
    const set = vi.fn()
    const get = vi.fn(() => 20)
    const updateFn = (prev: number) => prev + 10
    testAtom.write(get, set, updateFn)
    expect(set).toHaveBeenCalledWith(testAtom, 30)
  })
})
