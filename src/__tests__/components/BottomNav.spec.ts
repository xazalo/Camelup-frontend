import { describe, it, expect, vi } from 'vitest'
import { mount, RouterLinkStub } from '@vue/test-utils'
import { ref } from 'vue'
import BottomNav from '../../components/nav/BottomNav.vue'

const locale = ref('en')

vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale,
  }),
}))

describe('BottomNav', () => {
  const createWrapper = () =>
    mount(BottomNav, {
      global: {
        stubs: {
          RouterLink: RouterLinkStub,
          Icon: true,
        },
      },
    })

  it('renders the application title', () => {
    const wrapper = createWrapper()

    expect(wrapper.find('h1').text()).toBe('Camel UP')
  })

  it('renders two navigation links', () => {
    const wrapper = createWrapper()

    const links = wrapper.findAllComponents(RouterLinkStub)

    expect(links).toHaveLength(2)
    expect(links[0].props('to')).toBe('/')
    expect(links[1].props('to')).toBe('/about')
  })

  it('renders the language selector', () => {
    const wrapper = createWrapper()

    const options = wrapper.findAll('option')

    expect(options).toHaveLength(3)
    expect(options.map(o => o.text())).toEqual(['ES', 'EN', 'DE'])
  })

  it('displays the current locale', () => {
    locale.value = 'en'

    const wrapper = createWrapper()

    expect(
      (wrapper.find('select').element as HTMLSelectElement).value
    ).toBe('en')
  })

  it('changes the locale when a new language is selected', async () => {
    locale.value = 'en'

    const wrapper = createWrapper()

    await wrapper.find('select').setValue('de')

    expect(locale.value).toBe('de')
  })
})