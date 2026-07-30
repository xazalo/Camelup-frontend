import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SpaceComponent from '../../components/game/board/SpaceComponent.vue'

describe('SpaceComponent', () => {
  const createWrapper = (space: any, index = 5) =>
    mount(SpaceComponent, {
      props: {
        space,
        index,
      },
      global: {
        stubs: {
          CamelComponent: {
            template: '<div class="camel-stub" />',
            props: ['camel', 'level'],
          },
          TileComponent: {
            template: '<div class="tile-stub" />',
            props: ['tile'],
          },
        },
      },
    })

  it('renders the board position number', () => {
    const wrapper = createWrapper({
      camels: [],
      tile: { tileType: 0 },
    })

    expect(wrapper.find('.number').text()).toBe('5')
  })

  it('renders one CamelComponent for each camel', () => {
    const wrapper = createWrapper({
      camels: [
        { color: 'red' },
        { color: 'blue' },
        { color: 'green' },
      ],
      tile: { tileType: 0 },
    })

    expect(wrapper.findAll('.camel-stub')).toHaveLength(3)
  })

  it('renders the TileComponent when a tile exists', () => {
    const wrapper = createWrapper({
      camels: [],
      tile: { tileType: 1 },
    })

    expect(wrapper.find('.tile-stub').exists()).toBe(true)
  })

  it('does not render the TileComponent when tileType is 0', () => {
    const wrapper = createWrapper({
      camels: [],
      tile: { tileType: 0 },
    })

    expect(wrapper.find('.tile-stub').exists()).toBe(false)
  })

  it('renders both camels and tile together', () => {
    const wrapper = createWrapper({
      camels: [
        { color: 'red' },
        { color: 'yellow' },
      ],
      tile: { tileType: -1 },
    })

    expect(wrapper.findAll('.camel-stub')).toHaveLength(2)
    expect(wrapper.find('.tile-stub').exists()).toBe(true)
  })
})