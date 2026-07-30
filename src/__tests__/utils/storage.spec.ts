import { describe, it, expect, beforeEach } from 'vitest'
import { storage } from '../../utils/storage'

describe('storage', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('saves and retrieves the playerId', () => {
    storage.savePlayerId('123')

    expect(storage.getPlayerId()).toBe('123')
  })

  it('saves and retrieves the id', () => {
    storage.saveId('456')

    expect(storage.getId()).toBe('456')
  })

  it('saves and retrieves the name', () => {
    storage.saveName('John')

    expect(storage.getName()).toBe('John')
  })

  it('returns null when playerId does not exist', () => {
    expect(storage.getPlayerId()).toBeNull()
  })

  it('returns null when id does not exist', () => {
    expect(storage.getId()).toBeNull()
  })

  it('returns null when name does not exist', () => {
    expect(storage.getName()).toBeNull()
  })
})