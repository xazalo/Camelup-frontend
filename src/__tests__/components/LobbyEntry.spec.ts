import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import LobbyEntry from '@/components/lobby/LobbyEntry.vue'

const create = vi.fn()
const join = vi.fn()
const push = vi.fn()

const lobby = ref(null)

vi.mock('@/composables/useLobby', () => ({
  useLobby: () => ({
    create,
    join,
  }),
}))

vi.mock('@/stores/lobby', () => ({
  useLobbyStore: vi.fn(),
}))

vi.mock('pinia', () => ({
  storeToRefs: () => ({
    lobby,
  }),
}))

vi.mock('vue-router', () => ({
  useRouter: () => ({
    push,
  }),
}))

describe('LobbyEntry', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    lobby.value = null
  })

  const createWrapper = (props = {}) =>
    mount(LobbyEntry, {
      props,
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders the create form by default', () => {
    const wrapper = createWrapper()

    expect(wrapper.text()).toContain('lobbyEntry.createLobby')
  })

  it('renders the join form when a lobby code is provided', () => {
    const wrapper = createWrapper({
      lobbyCode: 'ABC123',
    })

    expect(wrapper.text()).toContain('lobbyEntry.enter')
  })

  it('switches to join mode', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('nav button')[1].trigger('click')

    expect(wrapper.text()).toContain('lobbyEntry.enter')
  })

  it('switches back to create mode', async () => {
    const wrapper = createWrapper({
      lobbyCode: 'ABC123',
    })

    await wrapper.findAll('nav button')[0].trigger('click')

    expect(wrapper.text()).toContain('lobbyEntry.createLobby')
  })

  it('calls create()', async () => {
    const wrapper = createWrapper()

    await wrapper.find('input').setValue('John')
    await wrapper.find('form').trigger('submit')

    expect(create).toHaveBeenCalledWith('John')
  })

  it('does not call create() when username is empty', async () => {
    const wrapper = createWrapper()

    await wrapper.find('form').trigger('submit')

    expect(create).not.toHaveBeenCalled()
  })

  it('calls join()', async () => {
    const wrapper = createWrapper({
      lobbyCode: 'ROOM1',
    })

    const inputs = wrapper.findAll('input')

    await inputs[0].setValue('John')
    await inputs[1].setValue('ROOM2')

    await wrapper.find('form').trigger('submit')

    expect(join).toHaveBeenCalledWith('ROOM2', 'John')
  })

  it('does not call join() when fields are missing', async () => {
    const wrapper = createWrapper({
      lobbyCode: 'ROOM1',
    })

    await wrapper.find('form').trigger('submit')

    expect(join).not.toHaveBeenCalled()
  })

  it('redirects when a lobby exists', async () => {
    lobby.value = {
      id: 'ABC',
    }

    createWrapper()

    await nextTick()

    expect(push).toHaveBeenCalledWith({
      name: 'lobby',
    })
  })

  it('updates the lobby code when the prop changes', async () => {
    const wrapper = createWrapper()

    await wrapper.setProps({
      lobbyCode: 'NEWCODE',
    })

    await nextTick()

    const inputs = wrapper.findAll('input')

    expect((inputs[1].element as HTMLInputElement).value).toBe('NEWCODE')
  })
})