import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pyramid from '../../components/game/pyramid/PyramidComponent.vue'

describe('Pyramid', () => {
  const createWrapper = () =>
    mount(Pyramid, {
      global: {
        stubs: {
          BetCards: {
            template: '<div class="bet-cards" />',
          },
        },
      },
    })

  it('does not render BetCards initially', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.bet-cards').exists()).toBe(false)
  })

  it('shows BetCards when the pyramid is clicked', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.pyramid').trigger('click')

    expect(wrapper.find('.bet-cards').exists()).toBe(true)
  })
})