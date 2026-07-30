import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { ref, nextTick } from 'vue'
import CamelTerminal from '../../components/terminal/CamelTerminal.vue'

const logs = ref([])

vi.mock('@/composables/useLogs', () => ({
  useLogs: () => ({
    logs,
  }),
}))

describe('CamelTerminal', () => {
  beforeEach(() => {
    logs.value = []
  })

  const createWrapper = () =>
    mount(CamelTerminal, {
      global: {
        stubs: {
          Icon: true,
        },
      },
    })

  it('is closed by default', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.terminal').exists()).toBe(false)
    expect(wrapper.find('.terminal-button').exists()).toBe(true)
  })

  it('opens when the button is clicked', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.terminal-button').trigger('click')

    expect(wrapper.find('.terminal').exists()).toBe(true)
  })

  it('closes when the close button is clicked', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.terminal-button').trigger('click')
    await wrapper.find('.terminal-btn').trigger('click')

    expect(wrapper.find('.terminal').exists()).toBe(false)
  })

  it('renders all logs', async () => {
    logs.value = [
      { id: 1, type: 'INFO', message: 'Hello' },
      { id: 2, type: 'ERROR', message: 'Oops' },
    ]

    const wrapper = createWrapper()

    await wrapper.find('.terminal-button').trigger('click')
    await nextTick()

    const lines = wrapper.findAll('.log-line')

    expect(lines).toHaveLength(2)
    expect(lines[0].text()).toContain('Hello')
    expect(lines[1].text()).toContain('Oops')
  })

  it('applies the correct class to each log', async () => {
    logs.value = [
      { id: 1, type: 'SUCCESS', message: 'Done' },
    ]

    const wrapper = createWrapper()

    await wrapper.find('.terminal-button').trigger('click')
    await nextTick()

    expect(wrapper.find('.log-line').classes()).toContain('success')
  })

  it('updates the command input', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.terminal-button').trigger('click')

    const input = wrapper.find('input')

    await input.setValue('help')

    expect((input.element as HTMLInputElement).value).toBe('help')
  })
})