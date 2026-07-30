import { describe, it, expect } from 'vitest'
import { getSongVolume, getFxVolume } from '../../utils/getSongVolume'

describe('getSongVolume', () => {
  it('returns the configured volume for a known song', () => {
    expect(getSongVolume('atlas.mp3')).toBe(0.7)
  })

  it('returns the configured volume for a song in a path', () => {
    expect(getSongVolume('/music/egypt.mp3')).toBe(0.6)
  })

  it('returns the configured volume for a hashed filename', () => {
    expect(getSongVolume('/assets/atlas-a1b2c3d4.mp3')).toBe(0.7)
  })

  it('returns 1 for an unknown song', () => {
    expect(getSongVolume('unknown.mp3')).toBe(1)
  })

  it('returns 1 for an empty path', () => {
    expect(getSongVolume('')).toBe(1)
  })
})

describe('getFxVolume', () => {
  it('returns the configured volume for a known sound effect', () => {
    expect(getFxVolume('bet')).toBe(0.5)
  })

  it('returns the configured volume for a sound effect in a path', () => {
    expect(getFxVolume('/audio/winner')).toBe(0.7)
  })

  it('returns 1 for an unknown sound effect', () => {
    expect(getFxVolume('unknown')).toBe(1)
  })

  it('returns 1 for an empty path', () => {
    expect(getFxVolume('')).toBe(1)
  })
})