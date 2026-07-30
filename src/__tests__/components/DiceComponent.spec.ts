import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Dice from '../../components/game/pyramid/DiceComponent.vue'

describe('Dice', () => {
  const createWrapper = (
    color = 'red',
    value = 1
  ) =>
    mount(Dice, {
      props: {
        color,
        value,
      },
    })

  it('renders the dice background color', () => {
    const wrapper = createWrapper('blue', 1)

    expect(wrapper.find('.dice').attributes('style'))
      .toContain('background: blue')
  })

  it('renders one dot', () => {
    const wrapper = createWrapper('red', 1)

    expect(wrapper.findAll('.dot')).toHaveLength(1)
  })

  it('renders two dots', () => {
    const wrapper = createWrapper('red', 2)

    expect(wrapper.findAll('.dot')).toHaveLength(2)
  })

  it('renders three dots', () => {
    const wrapper = createWrapper('red', 3)

    expect(wrapper.findAll('.dot')).toHaveLength(3)
  })

  it('uses dark dots on yellow dice', () => {
    const wrapper = createWrapper('yellow', 1)

    expect(wrapper.find('.dot').attributes('style'))
      .toContain('background: rgb(74, 53, 34);')
  })

  it('uses dark dots on white dice', () => {
    const wrapper = createWrapper('white', 1)

    expect(wrapper.find('.dot').attributes('style'))
      .toContain('background: rgb(255, 255, 255);')
  })

  it('uses white dots on dark dice', () => {
    const wrapper = createWrapper('red', 1)

    expect(wrapper.find('.dot').attributes('style'))
      .toContain('background: rgb(255, 255, 255);')
  })
})