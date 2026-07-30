import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastAlert from '../../components/toast/ToastAlert.vue'

describe('ToastAlert', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  const createWrapper = (toast: any) =>
    mount(ToastAlert, {
      props: { toast },
      global: {
        mocks: {
          $t: (key: string) => key,
        },
      },
    })

  it('renders the toast message', () => {
    const wrapper = createWrapper({
      id: 1,
      type: 'success',
      message: 'toast.saved',
      duration: 1000,
    })

    expect(wrapper.text()).toBe('toast.saved')
  })

  it('applies the correct toast class', () => {
    const wrapper = createWrapper({
      id: 1,
      type: 'error',
      message: 'toast.error',
      duration: 1000,
    })

    expect(wrapper.classes()).toContain('toast')
    expect(wrapper.classes()).toContain('toast-error')
  })

  it('emits remove after the specified duration', () => {
    const wrapper = createWrapper({
      id: 42,
      type: 'info',
      message: 'toast.info',
      duration: 1000,
    })

    vi.advanceTimersByTime(999)
    expect(wrapper.emitted('remove')).toBeUndefined()

    vi.advanceTimersByTime(1)

    expect(wrapper.emitted('remove')).toEqual([[42]])
  })

  it('uses the default duration when none is provided', () => {
    const wrapper = createWrapper({
      id: 7,
      type: 'warning',
      message: 'toast.warning',
    })

    vi.advanceTimersByTime(2999)
    expect(wrapper.emitted('remove')).toBeUndefined()

    vi.advanceTimersByTime(1)

    expect(wrapper.emitted('remove')).toEqual([[7]])
  })
})