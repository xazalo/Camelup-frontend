import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import BetCards from '../../components/game/pyramid/BetCards.vue'

const availableBetCards = ref({})

vi.mock('@/composables/useGame', () => ({
  useGame: () => ({
    availableBetCards,
  }),
}))

describe('BetCards', () => {
  beforeEach(() => {
    availableBetCards.value = {
      red: {
        1: 5,
        2: 3,
        3: 2,
        4: 1,
      },
      blue: null,
      green: {
        1: 3,
        2: 2,
        3: 1,
        4: -1,
      },
      yellow: {
        1: 2,
        2: 1,
        3: -1,
        4: -1,
      },
    }
  })

  const createWrapper = () =>
    mount(BetCards, {
      global: {
        stubs: {
          Icon: true,
        },
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders one card per camel color', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.card')).toHaveLength(4)
  })

  it('renders rewards for available cards', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('3')
    expect(wrapper.text()).toContain('2')
  })

  it('renders the empty message for unavailable cards', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('betCards.noCards')
  })

  it('applies the disabled class when a card is unavailable', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.card.disabled').exists()).toBe(true)
  })

  it('emits close when clicking the overlay', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.overlay').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when clicking the close button', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.cancel-btn').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })
})