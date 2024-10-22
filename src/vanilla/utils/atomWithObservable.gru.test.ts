/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { atom } from '../../vanilla.ts'
import { atomWithObservable } from './atomWithObservable.ts'

describe('atomWithObservable', () => {
  let mockObservable: any
  let mockSubject: any

  beforeEach(() => {
    mockObservable = {
      subscribe: vi.fn(() => ({
        unsubscribe: vi.fn(),
      })),
    }

    mockSubject = {
      ...mockObservable,
      next: vi.fn(),
    }
  })

  it('should create an atom with observable', () => {
    const observableAtom = atomWithObservable(() => mockObservable, {
      initialValue: 'initial',
    })
    expect(observableAtom).toBeDefined()
  })

  it('should handle next calls on subject', () => {
    const observableAtom = atomWithObservable(() => mockSubject, {
      initialValue: 'initial',
    })
    const mockGet = vi.fn(() => ['initial'])
    const result = atom((get) =>
      observableAtom.read(get, { get: mockGet } as any),
    )
    mockSubject.next('test')
    expect(mockSubject.next).toHaveBeenCalledWith('test')
  })

  it('should handle errors', () => {
    const error = new Error('Test error')
    mockObservable.subscribe = vi.fn((observer: any) => {
      observer.error?.(error)
      return { unsubscribe: vi.fn() }
    })
    const observableAtom = atomWithObservable(() => mockObservable, {
      initialValue: 'initial',
    })
    const mockGet = vi.fn(() => ['initial'])
    try {
      atom((get) => observableAtom.read(get, { get: mockGet } as any))
    } catch (e) {
      expect(e).toBe(error)
    }
  })
})
