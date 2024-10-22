/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { atom } from '../../vanilla.ts'
import { atomWithRefresh } from './atomWithRefresh.ts'

vi.mock('../../vanilla.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../vanilla.ts')>()
  return {
    ...actual,
    atom: vi.fn(actual.atom),
  }
})

describe('atomWithRefresh', () => {
  let mockRead: any
  let mockWrite: any

  beforeEach(() => {
    vi.clearAllMocks()
    mockRead = vi.fn((get) => get({} as any)) // Use type assertion to bypass type error
    mockWrite = vi.fn()
  })

  it('should create a refreshable atom with read', () => {
    const refreshableAtom = atomWithRefresh(mockRead)
    expect(typeof refreshableAtom.read).toBe('function')
    expect(typeof refreshableAtom.write).toBe('function')
  })

  it('should call read function on get', () => {
    const refreshableAtom = atomWithRefresh(mockRead)
    const get = vi.fn()
    refreshableAtom.read(get, {} as any) // Use type assertion to bypass type error
    expect(mockRead).toHaveBeenCalledWith(get, {})
  })

  it('should increment refresh counter on write with no args', () => {
    const refreshableAtom = atomWithRefresh(mockRead, mockWrite)
    const set = vi.fn()
    refreshableAtom.write(vi.fn(), set)
    expect(set).toHaveBeenCalledWith(expect.anything(), expect.any(Function))
  })

  it('should call write function on write with args', () => {
    const refreshableAtom = atomWithRefresh(mockRead, mockWrite)
    const get = vi.fn()
    const set = vi.fn()
    const args = [1, 2, 3]
    refreshableAtom.write(get, set, ...args)
    expect(mockWrite).toHaveBeenCalledWith(get, set, ...args)
  })
})
