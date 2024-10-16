/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useAtom } from './useAtom.ts'
import { useAtomValue } from './useAtomValue.ts'
import { useSetAtom } from './useSetAtom.ts'

vi.mock('./useAtomValue', () => ({
  useAtomValue: vi.fn(),
}))

vi.mock('./useSetAtom', () => ({
  useSetAtom: vi.fn(),
}))

describe('useAtom', () => {
  const mockAtomValue = 'mockValue'
  const mockSetAtom = vi.fn()

  beforeEach(() => {
    vi.mocked(useAtomValue).mockReturnValue(mockAtomValue)
    vi.mocked(useSetAtom).mockReturnValue(mockSetAtom)
    vi.clearAllMocks()
  })

  it('should return atom value and setAtom function for WritableAtom', () => {
    const writableAtom = {} as any // Mock WritableAtom
    const [value, setAtom] = useAtom(writableAtom)

    expect(useAtomValue).toHaveBeenCalledWith(writableAtom, undefined)
    expect(useSetAtom).toHaveBeenCalledWith(writableAtom, undefined)
    expect(value).toBe(mockAtomValue)
    expect(setAtom).toBe(mockSetAtom)
  })

  it('should return atom value and never for PrimitiveAtom', () => {
    const primitiveAtom = {} as any // Mock PrimitiveAtom
    const [value, setAtom] = useAtom(primitiveAtom)

    expect(useAtomValue).toHaveBeenCalledWith(primitiveAtom, undefined)
    expect(useSetAtom).toHaveBeenCalledWith(primitiveAtom, undefined)
    expect(value).toBe(mockAtomValue)
    expect(setAtom).toBe(mockSetAtom)
  })

  it('should handle options parameter', () => {
    const atom = {} as any
    const options = { delay: 100 }
    useAtom(atom, options)

    expect(useAtomValue).toHaveBeenCalledWith(atom, options)
    expect(useSetAtom).toHaveBeenCalledWith(atom, options)
  })
})
