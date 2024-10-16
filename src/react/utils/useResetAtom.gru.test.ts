/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { renderHook } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useSetAtom } from '../../react.ts'
import { RESET } from '../../vanilla/utils.ts'
import { useResetAtom } from './useResetAtom.ts'

vi.mock('../../react.ts', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../../react.ts')>()
  return {
    ...actual,
    useSetAtom: vi.fn(),
  }
})

describe('useResetAtom', () => {
  const mockSetAtom = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
    vi.mocked(useSetAtom).mockReturnValue(mockSetAtom)
  })

  it('should return a function', () => {
    const { result } = renderHook(() => useResetAtom({} as any))
    expect(typeof result.current).toBe('function')
  })

  it('should call setAtom with RESET when invoked', () => {
    const { result } = renderHook(() => useResetAtom({} as any))
    result.current()
    expect(mockSetAtom).toHaveBeenCalledWith(RESET)
  })
})
