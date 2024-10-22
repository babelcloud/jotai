/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import jotaiPreset from './preset.ts'

vi.mock('./plugin-debug-label.ts', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('./plugin-debug-label.ts')>()
  return {
    ...actual,
    default: 'pluginDebugLabelMock',
  }
})

vi.mock('./plugin-react-refresh.ts', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('./plugin-react-refresh.ts')>()
  return {
    ...actual,
    default: 'pluginReactRefreshMock',
  }
})

describe('jotaiPreset', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should return plugins with default options', () => {
    const result = jotaiPreset({} as any)
    expect(result.plugins).toEqual([
      ['pluginDebugLabelMock', undefined],
      ['pluginReactRefreshMock', undefined],
    ])
  })

  it('should return plugins with provided options', () => {
    const options = { customAtomNames: ['atom1'] }
    const result = jotaiPreset({} as any, options)
    expect(result.plugins).toEqual([
      ['pluginDebugLabelMock', options],
      ['pluginReactRefreshMock', options],
    ])
  })
})
