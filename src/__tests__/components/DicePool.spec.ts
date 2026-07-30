import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import DicePool from '../../components/game/pyramid/DicePool.vue' 

describe('DicePool', () => {
  const createWrapper = (dice = []) =>
    mount(DicePool, {
      props: {
        dice,
      },
      global: {
        stubs: {
          DiceComponent: {
            name: 'DiceComponent',
            props: ['color', 'value'],
            template: '<div class="dice-component" />',
          },
        },
      },
    })

  it('always renders five slots', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.dice-slot')).toHaveLength(5)
  })

  it('renders one DiceComponent for each die', () => {
    const wrapper = createWrapper([
      { color: 'red', value: 1 },
      { color: 'blue', value: 3 },
      { color: 'green', value: 2 },
    ])

    expect(wrapper.findAll('.dice-component')).toHaveLength(3)
  })

  it('passes the correct props to DiceComponent', () => {
    const wrapper = createWrapper([
      { color: 'yellow', value: 2 },
      { color: 'red', value: 3 },
    ])

    const dice = wrapper.findAllComponents({ name: 'DiceComponent' })

    expect(dice[0].props()).toEqual({
      color: 'yellow',
      value: 2,
    })

    expect(dice[1].props()).toEqual({
      color: 'red',
      value: 3,
    })
  })

  it('renders no DiceComponent when there are no dice', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.dice-component').exists()).toBe(false)
  })

  it('renders five DiceComponents when the pool is full', () => {
    const wrapper = createWrapper([
      { color: 'red', value: 1 },
      { color: 'blue', value: 2 },
      { color: 'green', value: 3 },
      { color: 'yellow', value: 1 },
      { color: 'white', value: 2 },
    ])

    expect(wrapper.findAll('.dice-component')).toHaveLength(5)
  })
})