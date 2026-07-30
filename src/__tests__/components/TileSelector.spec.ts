import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TileSelector from '../../components/game/actionsMenu/TileSelector.vue'

describe('TileSelector', () => {
  const createWrapper = (availableTiles = [true, true, false, true]) =>
    mount(TileSelector, {
      props: {
        availableTiles,
      },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders the dialog', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('.dialog').exists()).toBe(true)
    expect(wrapper.find('input').exists()).toBe(true)
    expect(wrapper.find('select').exists()).toBe(true)
  })

  it('renders the tile type options', () => {
    const wrapper = createWrapper()

    const options = wrapper.findAll('option')

    expect(options).toHaveLength(3)
    expect(options[1].text()).toBe('oasis')
    expect(options[2].text()).toBe('mirage')
  })

  it('emits close when clicking cancel', async () => {
    const wrapper = createWrapper()

    await wrapper.find('.cancel-btn').trigger('click')

    expect(wrapper.emitted('close')).toHaveLength(1)
  })

  it('emits select when the form is valid', async () => {
    const wrapper = createWrapper()

    await wrapper.find('input').setValue(1)
    await wrapper.find('select').setValue('1')

    await wrapper.find('.confirm-btn').trigger('click')

    expect(wrapper.emitted('select')).toEqual([
      [
        {
          position: 1,
          tileType: '1',
        },
      ],
    ])
  })

  it('does not emit select when no position is selected', async () => {
    const wrapper = createWrapper()

    await wrapper.find('select').setValue('1')
    await wrapper.find('.confirm-btn').trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('does not emit select when no tile type is selected', async () => {
    const wrapper = createWrapper()

    await wrapper.find('input').setValue(0)
    await wrapper.find('.confirm-btn').trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })

  it('does not emit select when the position is unavailable', async () => {
    const wrapper = createWrapper([true, false, true])

    await wrapper.find('input').setValue(1)
    await wrapper.find('select').setValue('2')

    await wrapper.find('.confirm-btn').trigger('click')

    expect(wrapper.emitted('select')).toBeUndefined()
  })
})