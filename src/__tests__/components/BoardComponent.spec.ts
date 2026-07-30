import { describe, it, expect, vi, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref } from 'vue'
import BoardComponent from '../../components/game/board/BoardComponent.vue'

beforeAll(() => {
  global.ResizeObserver = class {
    observe = vi.fn()
    disconnect = vi.fn()
  } as any
})

const board = ref<any>(null)

vi.mock('@/composables/useGame', () => ({
  useGame: () => ({
    board,
  }),
}))

vi.mock('@iconify/vue', () => ({
  Icon: {
    template: '<svg class="icon" />',
  },
}))

describe('BoardComponent', () => {
  const createWrapper = () =>
    mount(BoardComponent, {
      global: {
        stubs: {
          SpaceComponent: {
            template: '<div class="space-stub" />',
            props: ['space', 'index'],
          },
        },
      },
    })

  beforeEach(() => {
    board.value = {
      spaces: [
        { camels: [], tile: { tileType: 0 } },
        { camels: [], tile: { tileType: 0 } },
        { camels: [], tile: { tileType: 1 } },
        { camels: [], tile: { tileType: 0 } },
      ],
    }
  })

  it('renders the board when board data exists', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.board').exists()).toBe(true)
  })

  it('renders one SpaceComponent for each board space', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.space-stub')).toHaveLength(4)
  })

  it('renders the desert', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.desert').exists()).toBe(true)
  })

  it('renders the track', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.track').exists()).toBe(true)
  })

  it('renders the three palm icons', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.icon')).toHaveLength(3)
  })

  it('does not render the board when board is null', () => {
    board.value = null

    const wrapper = createWrapper()

    expect(wrapper.find('.board').exists()).toBe(false)
  })

  it('renders no spaces when board is null', () => {
    board.value = null

    const wrapper = createWrapper()

    expect(wrapper.findAll('.space-stub')).toHaveLength(0)
  })
})