import { describe, it, expect } from 'vitest'
import { getLogMessageKey } from '../../utils/getLogMessage'
import { LOG_MESSAGE_KEYS } from '../../utils/logMessages'

describe('getLogMessageKey', () => {
  it('returns the mapped key when the message starts with a known prefix', () => {
    const prefix = Object.keys(LOG_MESSAGE_KEYS)[0]
    const expected = LOG_MESSAGE_KEYS[prefix]

    expect(getLogMessageKey(`${prefix} some extra text`)).toBe(expected)
  })

  it('returns the mapped key when the message exactly matches the prefix', () => {
    const prefix = Object.keys(LOG_MESSAGE_KEYS)[0]
    const expected = LOG_MESSAGE_KEYS[prefix]

    expect(getLogMessageKey(prefix)).toBe(expected)
  })

  it('returns the original message when no prefix matches', () => {
    const message = 'This message is not mapped'

    expect(getLogMessageKey(message)).toBe(message)
  })

  it('returns an empty string when given an empty string', () => {
    expect(getLogMessageKey('')).toBe('')
  })
})