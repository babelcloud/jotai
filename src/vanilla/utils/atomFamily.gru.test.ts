/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { type Atom } from '../../vanilla.ts'
import { atomFamily } from './atomFamily.ts'

describe('atomFamily', () => {
  let mockAtom: Atom<unknown>

  beforeEach(() => {
    mockAtom = { read: vi.fn(), write: vi.fn() } as any
  })

  it('should create an atom', () => {
    const family = atomFamily(() => mockAtom)
    const atom = family('param1')
    expect(atom).toBe(mockAtom)
  })

  it('should return the same atom for the same parameter', () => {
    const family = atomFamily(() => mockAtom)
    const atom1 = family('param1')
    const atom2 = family('param1')
    expect(atom1).toBe(atom2)
  })

  it('should remove an atom', () => {
    const family = atomFamily(() => mockAtom)
    family('param1')
    family.remove('param1')
    const atom = family('param1')
    expect(atom).toBe(mockAtom)
  })

  it('should notify listeners on atom creation', () => {
    const family = atomFamily(() => mockAtom)
    const listener = vi.fn()
    family.unstable_listen(listener)
    family('param1')
    expect(listener).toHaveBeenCalledWith({
      type: 'CREATE',
      param: 'param1',
      atom: mockAtom,
    })
  })

  it('should notify listeners on atom removal', () => {
    const family = atomFamily(() => mockAtom)
    const listener = vi.fn()
    family.unstable_listen(listener)
    family('param1')
    family.remove('param1')
    expect(listener).toHaveBeenCalledWith({
      type: 'REMOVE',
      param: 'param1',
      atom: mockAtom,
    })
  })
})
