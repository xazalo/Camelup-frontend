import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TileComponent from '../../components/game/board/TileComponent.vue'

describe('TileComponent', () => {
  it('renders the tile container', () => {
    const wrapper = mount(TileComponent, {
      props: {
        tile: {
          tileType: 1,
        },
      },
    })

    expect(wrapper.find('.tile').exists()).toBe(true)
  })

  it('renders the oasis icon when tileType is 1', () => {
    const wrapper = mount(TileComponent, {
      props: {
        tile: {
          tileType: 1,
        },
      },
    })

    const paths = wrapper.findAll('path')

    // Oasis SVG contains a filled blue drop and a white wave
    expect(paths).toHaveLength(2)
    expect(paths[0].attributes('fill')).toBe('#4fc3f7')
  })

  it('renders the mirage icon when tileType is not 1', () => {
    const wrapper = mount(TileComponent, {
      props: {
        tile: {
          tileType: -1,
        },
      },
    })

    const paths = wrapper.findAll('path')

    expect(paths).toHaveLength(3)

    paths.forEach(path => {
      expect(path.attributes('stroke')).toBe('#d4a017')
    })
  })
})