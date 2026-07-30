import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import About from '../../components/AboutComponent.vue'

describe('About', () => {
  const wrapper = mount(About, {
    global: {
      mocks: {
        $t: (key: string) => key,
      },
    },
  })

  it('renders the main title', () => {
    expect(wrapper.find('h2').text()).toBe('about.about.title')
  })

  it('renders all section headings', () => {
    const headings = wrapper.findAll('h3')

    expect(headings).toHaveLength(4)
  })

  it('renders the technical features list', () => {
    const items = wrapper.find('ul').findAll('li')

    expect(items).toHaveLength(4)
  })

  it('renders three highlighted text elements', () => {
    const strongs = wrapper.findAll('strong')

    expect(strongs).toHaveLength(3)
  })

  it('highlights Camel Up in the description', () => {
    const strongs = wrapper.findAll('strong')

    expect(strongs[0].text()).toBe('Camel Up')
  })

  it('highlights Camel Up in the copyright section', () => {
    const strongs = wrapper.findAll('strong')

    expect(strongs[2].text()).toBe('Camel Up')
  })

  it('renders the root container', () => {
    expect(wrapper.find('.gaper').exists()).toBe(true)
  })
})