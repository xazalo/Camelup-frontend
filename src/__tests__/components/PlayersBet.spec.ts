import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerBets from '../../components/game/playerSchedule/PlayerBets.vue'

describe('PlayerBets', () => {
  const player = {
    name: 'Alice',
    money: 12,
    isAI: false,
    cards: [
      {
        camel: {
          color: 'red',
        },
        payouts: {
          1: 5,
          2: 3,
          3: 1,
          4: -1,
        },
      },
      {
        camel: {
          color: 'blue',
        },
        payouts: {
          1: 3,
          2: 2,
          3: 1,
          4: -1,
        },
      },
    ],
  }

  const createWrapper = (customPlayer = player) =>
    mount(PlayerBets, {
      props: {
        player: customPlayer,
      },
      global: {
        mocks: {
          $t: (key: string, params?: any) =>
            params?.player ?? key,
        },
      },
    })

  it('renders the player name in the title', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('h2').text()).toContain('Alice')
  })

  it('renders all bet cards', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.bet-card')).toHaveLength(2)
  })

  it('renders camel colors', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('red')
    expect(wrapper.text()).toContain('blue')
  })

  it('renders payout values', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('5')
    expect(wrapper.text()).toContain('-1')
  })

  it('shows the empty state when the player has no cards', () => {
    const wrapper = createWrapper({
      ...player,
      cards: [],
    })

    expect(wrapper.find('.empty').exists()).toBe(true)
    expect(wrapper.text()).toContain('playerBets.noCards')
  })

  it('emits close when clicking the overlay', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.overlay').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when clicking the close button', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.close-btn').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close when clicking inside the dialog', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.dialog').trigger('click')

    expect(wrapper.emitted('close')).toBeUndefined()
  })
})