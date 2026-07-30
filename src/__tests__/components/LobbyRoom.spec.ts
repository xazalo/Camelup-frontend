import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { ref } from 'vue'
import LobbyRoom from '../../components/lobby/LobbyRoom.vue'

const lobby = ref<any>(null)

const addOneAI = vi.fn()
const start = vi.fn()
const show = vi.fn()
const writeText = vi.fn()

vi.mock('pinia', () => ({
  storeToRefs: () => ({
    lobby,
  }),
}))

vi.mock('@/stores/lobby', () => ({
  useLobbyStore: vi.fn(),
}))

vi.mock('@/composables/useLobby', () => ({
  useLobby: () => ({
    addOneAI,
  }),
}))

vi.mock('@/composables/useGame', () => ({
  useGame: () => ({
    start,
  }),
}))

vi.mock('@/composables/useToast', () => ({
  useToast: () => ({
    show,
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({}),
  RouterLink: RouterLinkStub,
}))

describe('LobbyRoom', () => {
  beforeEach(() => {
    vi.clearAllMocks()

    Object.assign(navigator, {
      clipboard: {
        writeText,
      },
    })

    lobby.value = {
      id: 'ABC123',
      players: [
        {
          name: 'Alice',
          isAI: false,
        },
        {
          name: 'Bot',
          isAI: true,
        },
      ],
    }
  })

  const createWrapper = () =>
    mount(LobbyRoom, {
      global: {
        stubs: {
          Icon: true,
        },
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders the lobby title', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('lobby.title')
  })

  it('renders the lobby code', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('ABC123')
  })

  it('renders all players', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.player-item')).toHaveLength(2)
  })

  it('renders player names', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Bot')
  })

  it('applies the ai badge class', () => {
    const wrapper = createWrapper()

    const badges = wrapper.findAll('.player-badge')

    expect(badges[0].classes()).not.toContain('ai')
    expect(badges[1].classes()).toContain('ai')
  })

  it('copies the lobby url', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.lobby-code button').trigger('click')

    expect(writeText).toHaveBeenCalledWith(
      'http://localhost:4173/?code=ABC123'
    )
  })

  it('shows a toast after copying the code', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.lobby-code button').trigger('click')

    expect(show).toHaveBeenCalledWith({
      type: 'INFO',
      message: 'logs.copied',
    })
  })

  it('calls addOneAI', async () => {
    const wrapper = createWrapper()

    const buttons = wrapper.findAll('footer button')

    await buttons[0].trigger('click')

    expect(addOneAI).toHaveBeenCalledWith('ABC123')
  })

  it('starts the game', async () => {
    const wrapper = createWrapper()

    const buttons = wrapper.findAll('footer button')

    await buttons[1].trigger('click')

    expect(start).toHaveBeenCalledOnce()
  })

  it('renders the empty state when there is no lobby', () => {
    lobby.value = null

    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('lobby.noLobby')
  })

  it('does not call addOneAI when there is no lobby', async () => {
    lobby.value = null

    const wrapper = createWrapper()

    expect(wrapper.find('footer').exists()).toBe(false)

    expect(addOneAI).not.toHaveBeenCalled()
  })

  it('does not call start when there is no lobby', () => {
    lobby.value = null

    createWrapper()

    expect(start).not.toHaveBeenCalled()
  })
})