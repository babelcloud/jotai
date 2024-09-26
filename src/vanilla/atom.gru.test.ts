/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { atom } from './atom.ts'

describe('atom', () => {
  beforeEach(() => {
    // Reset any necessary state before each test
  })

  it('should create a writable derived atom', () => {
    const read = vi.fn()
    const write = vi.fn()
    const writableAtom = atom(read, write)

    expect(writableAtom.read).toBe(read)
    expect(writableAtom.write).toBe(write)
  })

  it('should create a read-only derived atom', () => {
    const read = vi.fn()
    const readOnlyAtom = atom(read)

    expect(readOnlyAtom.read).toBe(read)
    expect(readOnlyAtom.write).toBeUndefined()
  })

  it('should create a write-only derived atom with initial value', () => {
    const initialValue = 'initial'
    const write = vi.fn()
    const writeOnlyAtom = atom(initialValue, write)

    expect(writeOnlyAtom.init).toBe(initialValue)
    expect(writeOnlyAtom.write).toBe(write)
  })

  it('should create a primitive atom without initial value', () => {
    const primitiveAtom = atom()

    expect(primitiveAtom.init).toBeUndefined()
  })

  it('should create a primitive atom with initial value', () => {
    const initialValue = 'initial'
    const primitiveAtom = atom(initialValue)

    expect(primitiveAtom.init).toBe(initialValue)
  })
})
