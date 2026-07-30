import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import HomeHero from '../../components/HomeHero.vue'

describe('HomeHero', () => {
  const wrapper = mount(HomeHero, {
    global: {
      mocks: {
        $t: (key: string) => key,
      },
    },
  })

  it('renders the badge', () => {
    expect(wrapper.find('.badge').text()).toContain('homeHero.badge')
  })

  it('renders the title', () => {
    expect(wrapper.find('h2').text()).toBe('homeHero.title')
  })

  it('renders the subtitle', () => {
    expect(wrapper.find('.subtitle').text()).toBe('homeHero.subtitle')
  })

  it('renders three feature items', () => {
    const features = wrapper.findAll('.feature')

    expect(features).toHaveLength(3)
  })

  it('renders the expected feature translation keys', () => {
    const features = wrapper.findAll('.feature')

    expect(features[0].text()).toContain('homeHero.features.stack')
    expect(features[1].text()).toContain('homeHero.features.multiplayer')
    expect(features[2].text()).toContain('homeHero.features.bets')
  })
})