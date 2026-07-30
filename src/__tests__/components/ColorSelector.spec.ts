import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ColorSelector from '../../components/game/actionsMenu/ColorSelector.vue'

describe('ColorSelector', () => {
  const colors = {
    red: true,
    blue: false,
    green: true,
    yellow: true,
  }

  const createWrapper = () =>
    mount(ColorSelector, {
      props: {
        colors,
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders one button for each color', () => {
    const wrapper = createWrapper()

    expect(wrapper.findAll('.color-btn')).toHaveLength(4)
  })

  it('disables unavailable colors', () => {
    const wrapper = createWrapper()

    const buttons = wrapper.findAll('.color-btn')

    expect(buttons[0].attributes('disabled')).toBeUndefined()
    expect(buttons[1].attributes('disabled')).toBeDefined()
    expect(buttons[2].attributes('disabled')).toBeUndefined()
    expect(buttons[3].attributes('disabled')).toBeUndefined()
  })

  it('renders the correct preview colors', () => {
    const wrapper = createWrapper()

    const previews = wrapper.findAll('.color-preview')

    expect(previews[0].attributes('style')).toContain('red')
    expect(previews[1].attributes('style')).toContain('blue')
    expect(previews[2].attributes('style')).toContain('green')
    expect(previews[3].attributes('style')).toContain('yellow')
  })

  it('emits the selected color', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('.color-btn')[0].trigger('click')

    expect(wrapper.emitted('select')).toEqual([['red']])
  })

  it('does not emit select when clicking a disabled color', async () => {
    const wrapper = createWrapper()

    await wrapper.findAll('.color-btn')[1].trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('emits close when clicking the cancel button', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.cancel-btn').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits close when clicking the overlay', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.overlay').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('does not emit close when clicking inside the dialog', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.dialog').trigger('click')

    expect(wrapper.emitted('close')).toBeUndefined()
  })
})