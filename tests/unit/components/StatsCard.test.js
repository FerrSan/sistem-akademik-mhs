// tests/unit/components/StatsCard.test.js
import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import StatsCard from '@/components/dashboard/StatsCard.vue'

describe('StatsCard Component', () => {
  const defaultProps = {
    title: 'Total Users',
    value: '1,234',
    icon: 'people-fill',
    variant: 'primary'
  }

  it('renders with required props', () => {
    const wrapper = mount(StatsCard, {
      props: defaultProps
    })

    expect(wrapper.find('h6').text()).toBe('Total Users')
    expect(wrapper.find('h3').text()).toBe('1,234')
    expect(wrapper.find('.bi-people-fill').exists()).toBe(true)
    expect(wrapper.find('.bg-primary').exists()).toBe(true)
  })

  it('renders with different variants', () => {
    const variants = ['primary', 'success', 'warning', 'danger', 'info']
    
    variants.forEach(variant => {
      const wrapper = mount(StatsCard, {
        props: {
          ...defaultProps,
          variant
        }
      })
      
      expect(wrapper.find(`.bg-${variant}`).exists()).toBe(true)
      expect(wrapper.find(`.text-${variant}`).exists()).toBe(true)
    })
  })

  it('renders subtitle and trend when provided', () => {
    const wrapper = mount(StatsCard, {
      props: {
        ...defaultProps,
        subtitle: '+10% from last month',
        trend: 'up'
      }
    })

    const subtitle = wrapper.find('small')
    expect(subtitle.text()).toContain('+10% from last month')
    expect(subtitle.classes()).toContain('text-success')
    expect(wrapper.find('.bi-arrow-up').exists()).toBe(true)
  })

  it('applies hover effect when hover prop is true', () => {
    const wrapper = mount(StatsCard, {
      props: {
        ...defaultProps,
        hover: true
      }
    })

    expect(wrapper.find('.card-hover').exists()).toBe(true)
  })

  it('handles numeric values correctly', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'Count',
        value: 42,
        icon: 'graph-up'
      }
    })

    expect(wrapper.find('h3').text()).toBe('42')
  })

  it('shows down trend with danger color', () => {
    const wrapper = mount(StatsCard, {
      props: {
        ...defaultProps,
        subtitle: '-5% from last month',
        trend: 'down'
      }
    })

    const subtitle = wrapper.find('small')
    expect(subtitle.classes()).toContain('text-danger')
    expect(wrapper.find('.bi-arrow-down').exists()).toBe(true)
  })

  it('renders without subtitle', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'Simple Card',
        value: '100'
      }
    })

    expect(wrapper.find('small').exists()).toBe(false)
  })

  it('uses default icon when not specified', () => {
    const wrapper = mount(StatsCard, {
      props: {
        title: 'Default Icon',
        value: '50'
      }
    })

    expect(wrapper.find('.bi-graph-up').exists()).toBe(true)
  })
})