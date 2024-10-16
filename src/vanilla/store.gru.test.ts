/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Atom, WritableAtom } from './atom'
import { createStore, getDefaultStore } from './store.ts'

describe('store', () => {
  let store: ReturnType<typeof createStore>

  beforeEach(() => {
    store = createStore()
  })

  describe('createStore', () => {
    it('should create a store with default methods', () => {
      expect(store).toHaveProperty('get')
      expect(store).toHaveProperty('set')
      expect(store).toHaveProperty('sub')
      expect(store).toHaveProperty('unstable_derive')
    })
  })

  describe('getDefaultStore', () => {
    it('should return the default store instance', () => {
      const defaultStore = getDefaultStore()
      expect(defaultStore).toBeDefined()
      expect(defaultStore).toHaveProperty('get')
      expect(defaultStore).toHaveProperty('set')
    })
  })

  describe('atom operations', () => {
    let testAtom: WritableAtom<number, [number], void>

    beforeEach(() => {
      testAtom = {
        read: () => 1,
        write: (get, set, value) => set(testAtom, value),
        init: 1, // Adding initial value to make it writable
      } as WritableAtom<number, [number], void>
    })

    it('should get the initial value of an atom', () => {
      const value = store.get(testAtom)
      expect(value).toBe(1)
    })

    it('should set a new value to an atom', () => {
      store.set(testAtom, 2)
      const value = store.get(testAtom)
      expect(value).toBe(2)
    })
  })
})
