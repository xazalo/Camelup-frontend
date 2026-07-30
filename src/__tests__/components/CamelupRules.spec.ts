import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Rules from '../../components/CamelUpRules.vue' 

describe('Rules', () => {
  const wrapper = mount(Rules, {
    global: {
      mocks: {
        $t: (key: string) => key,
      },
    },
  })

  it('renders the main title', () => {
    expect(wrapper.find('h2').text()).toBe('rules.rules.title')
  })

  it('renders all section headings', () => {
    const headings = wrapper.findAll('h3')

    expect(headings).toHaveLength(11)
  })

  it('renders the expected number of lists', () => {
    expect(wrapper.findAll('ul')).toHaveLength(9)
  })

  it('renders all camel rule items', () => {
    const camelSection = wrapper.findAll('ul')[0]

    expect(camelSection.findAll('li')).toHaveLength(5)
  })

  it('renders all action items', () => {
    const actionsSection = wrapper.findAll('ul')[1]

    expect(actionsSection.findAll('li')).toHaveLength(5)
  })

  it('renders the oasis and mirage labels in bold', () => {
    expect(wrapper.findAll('strong')).toHaveLength(2)
  })

  it('renders the rules container', () => {
    expect(wrapper.find('.gaper').exists()).toBe(true)
  })
})