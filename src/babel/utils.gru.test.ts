/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as babel from '@babel/core'
import { beforeEach, describe, expect, it } from 'vitest'
import type { PluginOptions } from './utils.ts'
import { isAtom } from './utils.ts'

describe('isAtom', () => {
  let t: typeof babel.types

  beforeEach(() => {
    t = babel.types
  })

  it('should return true for core atom functions', () => {
    const callee = t.identifier('atom')
    expect(isAtom(t, callee)).toBe(true)
  })

  it('should return true for custom atom functions', () => {
    const callee = t.identifier('customAtom')
    const options: PluginOptions = { customAtomNames: ['customAtom'] }
    expect(isAtom(t, callee, options.customAtomNames)).toBe(true)
  })

  it('should return false for non-atom functions', () => {
    const callee = t.identifier('nonAtom')
    expect(isAtom(t, callee)).toBe(false)
  })

  it('should return true for member expression with core atom function', () => {
    const callee = t.memberExpression(t.identifier('obj'), t.identifier('atom'))
    expect(isAtom(t, callee)).toBe(true)
  })

  it('should return true for member expression with custom atom function', () => {
    const callee = t.memberExpression(
      t.identifier('obj'),
      t.identifier('customAtom'),
    )
    const options: PluginOptions = { customAtomNames: ['customAtom'] }
    expect(isAtom(t, callee, options.customAtomNames)).toBe(true)
  })

  it('should return false for member expression with non-atom function', () => {
    const callee = t.memberExpression(
      t.identifier('obj'),
      t.identifier('nonAtom'),
    )
    expect(isAtom(t, callee)).toBe(false)
  })
})
