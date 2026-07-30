import { describe, it, expect } from 'vitest'
import generatePayoutTable from '../../utils/generatePayoutTable' 

describe('generatePayoutTable', () => {
  it('returns the correct payout table for topValue = 5', () => {
    expect(generatePayoutTable(5)).toEqual({
      1: 5,
      2: 1,
      3: -1,
      4: -1,
    })
  })

  it('returns the correct payout table for topValue = 4', () => {
    expect(generatePayoutTable(4)).toEqual({
      1: 3,
      2: 1,
      3: -1,
      4: -1,
    })
  })

  it('returns the correct payout table for topValue = 3', () => {
    expect(generatePayoutTable(3)).toEqual({
      1: 2,
      2: 1,
      3: -1,
      4: -1,
    })
  })

  it('returns the default payout table for any other value', () => {
    expect(generatePayoutTable(2)).toEqual({
      1: 1,
      2: 1,
      3: -1,
      4: -1,
    })
  })

  it('returns the default payout table for 0', () => {
    expect(generatePayoutTable(0)).toEqual({
      1: 1,
      2: 1,
      3: -1,
      4: -1,
    })
  })

  it('returns the default payout table for negative values', () => {
    expect(generatePayoutTable(-1)).toEqual({
      1: 1,
      2: 1,
      3: -1,
      4: -1,
    })
  })
})