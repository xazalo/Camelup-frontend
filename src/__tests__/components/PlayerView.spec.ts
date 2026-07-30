import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PlayerView from '../../components/game/playerSchedule/PlayerView.vue'

describe('PlayerView', () => {
  const players = [
    {
      name: 'Alice',
      money: 12,
      isAI: false,
    },
    {
      name: 'Bot',
      money: 7,
      isAI: true,
    },
  ]

  const createWrapper = () =>
    mount(PlayerView, {
      props: {
        players,
      },
      global: {
        stubs: {
          Icon: {
            name: 'Icon',
            props: ['icon'],
            template: '<div class="icon" />',
          },
        },
      },
    })

  it('renders all players', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.player')).toHaveLength(2)
  })

  it('renders player names', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Bot')
  })

  it('renders player money', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('12 💰')
    expect(wrapper.text()).toContain('7 💰')
  })

  it('emits the selected player when clicked', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('.player')[1].trigger('click')

    expect(wrapper.emitted('select')).toEqual([
      [players[1]],
    ])
  })

  it('renders no players when the array is empty', () => {
    const wrapper = mount(PlayerView, {
      props: {
        players: [],
      },
      global: {
        stubs: {
          Icon: true,
        },
      },
    })

    expect(wrapper.findAll('.player')).toHaveLength(0)
  })
})