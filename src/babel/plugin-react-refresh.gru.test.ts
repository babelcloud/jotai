/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { transformSync } from '@babel/core'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import reactRefreshPlugin from './plugin-react-refresh.ts'

vi.mock('./utils.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils.ts')>()
  return {
    ...actual,
    isAtom: vi.fn((t, callee) => callee.name === 'atom'),
  }
})

describe('reactRefreshPlugin', () => {
  const babel = { types: {} } as any

  it('should throw an error if filename is not provided', () => {
    expect(() => {
      transformSync('const x = 1;', {
        plugins: [[reactRefreshPlugin, { types: babel.types }]],
      })
    }).toThrow(
      'Configuration contains string/RegExp pattern, but no filename was passed to Babel',
    )
  })

  it('should add jotaiAtomCache to the program body', () => {
    const result = transformSync('const x = 1;', {
      filename: 'test.js',
      plugins: [[reactRefreshPlugin, { types: babel.types }]],
    })
    expect(result?.code).toContain('globalThis.jotaiAtomCache')
  })

  it('should transform default export atom', () => {
    const code = 'export default atom();'
    const result = transformSync(code, {
      filename: 'test.js',
      plugins: [[reactRefreshPlugin, { types: babel.types }]],
    })
    expect(result?.code).toContain(
      'exports.default = globalThis.jotaiAtomCache.get',
    )
  })

  it('should transform variable declarator atom', () => {
    const code = 'const myAtom = atom();'
    const result = transformSync(code, {
      filename: 'test.js',
      plugins: [[reactRefreshPlugin, { types: babel.types }]],
    })
    expect(result?.code).toContain(
      'const myAtom = globalThis.jotaiAtomCache.get',
    )
  })
})
