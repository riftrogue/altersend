import { describe, expect, it } from 'vitest'
import { extractJoinCode, isValidJoinCode } from './joinCode'

const validCode = 'a'.repeat(64)

describe('isValidJoinCode', () => {
  it('accepts a 64-char hex string', () => {
    expect(isValidJoinCode(validCode)).toBe(true)
  })

  it('accepts surrounding whitespace', () => {
    expect(isValidJoinCode(`  ${validCode}\n`)).toBe(true)
  })

  it('rejects wrong length', () => {
    expect(isValidJoinCode('abc')).toBe(false)
    expect(isValidJoinCode(validCode + '0')).toBe(false)
  })

  it('rejects non-hex characters', () => {
    expect(isValidJoinCode('z'.repeat(64))).toBe(false)
  })
})

describe('extractJoinCode', () => {
  it('returns null on empty input', () => {
    expect(extractJoinCode('')).toBeNull()
    expect(extractJoinCode('   ')).toBeNull()
  })

  it('extracts a 64-char hex substring from a longer string', () => {
    expect(extractJoinCode(`prefix-${validCode}-suffix`)).toBe(validCode)
  })

  it('normalizes the result to lowercase', () => {
    expect(extractJoinCode('F'.repeat(64))).toBe('f'.repeat(64))
  })

  it('returns null when no hex sequence of the right length is present', () => {
    expect(extractJoinCode('abc-def')).toBeNull()
  })
})
