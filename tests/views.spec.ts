import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, config } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'
import Contact from '../src/views/Contact.vue'
import Collection from '../src/views/Collection.vue'
import { TranslateKey } from '../src/localizations/localizations'

// Mock i18next
vi.mock('i18next', () => ({
  default: {
    init: vi.fn(),
    t: vi.fn((key: string) => key),
    addResourceBundle: vi.fn(),
    changeLanguage: vi.fn(),
  },
}))

// Mock the translate function
const mockTranslate = vi.fn((key: string) => key)

// Stub child components to isolate view testing
config.global.stubs = {
  PageHeader: {
    template: '<div class="page-header-stub"><slot /></div>',
    props: ['page'],
  },
  WorksOverviewList: {
    template: '<div class="works-overview-stub"></div>',
  },
  ContactForm: {
    template: '<div class="contact-form-stub"></div>',
    props: ['contactSubject'],
  },
  BurgerButton: true,
  HomeButton: true,
}

// Create a simple router for testing
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/cs' },
    {
      path: '/:lang',
      children: [
        { path: '', name: 'home', component: Home },
        { path: 'about', name: 'about', component: About },
        { path: 'contact', name: 'contact', component: Contact },
        { path: 'works/:collection', name: 'collection', component: Collection },
      ],
    },
  ],
})

// Helper to create global config with proper injection key
const createGlobalConfig = () => ({
  plugins: [router],
  provide: {
    [TranslateKey as symbol]: mockTranslate,
  },
})

describe('Home View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mounts without errors', () => {
    const wrapper = mount(Home, {
      global: createGlobalConfig(),
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains PageHeader component', () => {
    const wrapper = mount(Home, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.page-header-stub').exists()).toBe(true)
  })

  it('contains WorksOverviewList component', () => {
    const wrapper = mount(Home, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.works-overview-stub').exists()).toBe(true)
  })
})

describe('About View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mounts without errors', () => {
    const wrapper = mount(About, {
      global: createGlobalConfig(),
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains PageHeader component', () => {
    const wrapper = mount(About, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.page-header-stub').exists()).toBe(true)
  })

  it('renders bio section with correct translation keys', () => {
    mount(About, {
      global: createGlobalConfig(),
    })

    expect(mockTranslate).toHaveBeenCalledWith('about.bio.heading')
    expect(mockTranslate).toHaveBeenCalledWith('about.bio.1')
    expect(mockTranslate).toHaveBeenCalledWith('about.bio.2')
    expect(mockTranslate).toHaveBeenCalledWith('about.bio.3')
  })

  it('renders how and contact sections', () => {
    mount(About, {
      global: createGlobalConfig(),
    })

    expect(mockTranslate).toHaveBeenCalledWith('about.how.heading')
    expect(mockTranslate).toHaveBeenCalledWith('about.how.1')
    expect(mockTranslate).toHaveBeenCalledWith('about.contact.me.heading')
    expect(mockTranslate).toHaveBeenCalledWith('about.contact.me.1')
  })

  it('contains profile image', () => {
    const wrapper = mount(About, {
      global: createGlobalConfig(),
    })

    const img = wrapper.find('img')
    expect(img.exists()).toBe(true)
    expect(img.attributes('src')).toBe('/images/michaela.jpg')
  })
})

describe('Contact View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mounts without errors', () => {
    const wrapper = mount(Contact, {
      global: createGlobalConfig(),
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains PageHeader component', () => {
    const wrapper = mount(Contact, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.page-header-stub').exists()).toBe(true)
  })

  it('contains ContactForm component', () => {
    const wrapper = mount(Contact, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.contact-form-stub').exists()).toBe(true)
  })

  it('renders contact text sections', () => {
    mount(Contact, {
      global: createGlobalConfig(),
    })

    expect(mockTranslate).toHaveBeenCalledWith('contact.main.text')
    expect(mockTranslate).toHaveBeenCalledWith('contact.small.text')
    expect(mockTranslate).toHaveBeenCalledWith('contact.form')
  })
})

describe('Collection View', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('mounts without errors', () => {
    const wrapper = mount(Collection, {
      global: createGlobalConfig(),
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('contains PageHeader component', () => {
    const wrapper = mount(Collection, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.page-header-stub').exists()).toBe(true)
  })

  it('contains WorksOverviewList component', () => {
    const wrapper = mount(Collection, {
      global: createGlobalConfig(),
    })
    expect(wrapper.find('.works-overview-stub').exists()).toBe(true)
  })
})
