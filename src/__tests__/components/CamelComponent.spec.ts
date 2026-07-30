import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CamelComponent from '@/components/game/board/CamelComponent.vue' // adjust path

describe('CamelComponent', () => {
  const camel = {
    color: 'red',
  }

  it('renders the svg', () => {
    const wrapper = mount(CamelComponent, {
      props: {
        camel,
        level: 0,
      },
    })

    expect(wrapper.find('svg.camel').exists()).toBe(true)
  })

  it('applies the camel color', () => {
    const wrapper = mount(CamelComponent, {
      props: {
        camel,
        level: 0,
      },
    })

    const body = wrapper.find('g')

    expect(body.attributes('fill')).toBe('red')
  })

  it('positions the camel using the level prop', () => {
    const wrapper = mount(CamelComponent, {
      props: {
        camel,
        level: 3,
      },
    })

    expect(wrapper.find('svg').attributes('style')).toContain('bottom: 30px')
  })

  it('renders different camel colors', () => {
    const wrapper = mount(CamelComponent, {
      props: {
        camel: {
          color: 'blue',
        },
        level: 1,
      },
    })

    expect(wrapper.find('g').attributes('fill')).toBe('blue')
  })

  it('renders level 0 at the bottom', () => {
    const wrapper = mount(CamelComponent, {
      props: {
        camel,
        level: 0,
      },
    })

    expect(wrapper.find('svg').attributes('style')).toContain('bottom: 0px')
  })
})