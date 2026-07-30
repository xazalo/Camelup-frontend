import { describe, it, expect } from 'vitest'
import { parseGameLogs } from '../../utils/logsParser'

describe('parseGameLogs', () => {
  it('returns an empty array when there are no log tags', () => {
    expect(parseGameLogs('Just plain text')).toEqual([])
  })

  it('parses a single log entry', () => {
    const input = '[LOG] Game started'

    expect(parseGameLogs(input)).toEqual([
      {
        type: 'LOG',
        message: 'Game started',
      },
    ])
  })

  it('parses multiple log entries', () => {
    const input = `
      [STARTED] Match started
      [INFO] Loading assets
      [SUCCESS] Ready
    `

    expect(parseGameLogs(input)).toEqual([
      {
        type: 'STARTED',
        message: 'Match started',
      },
      {
        type: 'INFO',
        message: 'Loading assets',
      },
      {
        type: 'SUCCESS',
        message: 'Ready',
      },
    ])
  })

  it('trims whitespace around messages', () => {
    const input = '[WARNING]   Low health   '

    expect(parseGameLogs(input)).toEqual([
      {
        type: 'WARNING',
        message: 'Low health',
      },
    ])
  })

  it('handles consecutive log entries correctly', () => {
    const input = '[LOG] First[ERROR] Second'

    expect(parseGameLogs(input)).toEqual([
      {
        type: 'LOG',
        message: 'First',
      },
      {
        type: 'ERROR',
        message: 'Second',
      },
    ])
  })

  it('parses all supported log types', () => {
    const input = `
      [LOG] Log
      [ERROR] Error
      [STARTED] Started
      [FINISHED] Finished
      [SUCCESS] Success
      [INFO] Info
      [WARNING] Warning
    `

    expect(parseGameLogs(input).map(log => log.type)).toEqual([
      'LOG',
      'ERROR',
      'STARTED',
      'FINISHED',
      'SUCCESS',
      'INFO',
      'WARNING',
    ])
  })

  it('keeps the remaining text as the last message', () => {
    const input = '[INFO] Last message without another tag'

    expect(parseGameLogs(input)).toEqual([
      {
        type: 'INFO',
        message: 'Last message without another tag',
      },
    ])
  })
})