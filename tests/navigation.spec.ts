import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { createRouter, createWebHistory, Router } from 'vue-router'
import { defineComponent, h } from 'vue'
import Home from '../src/views/Home.vue'
import About from '../src/views/About.vue'
import Contact from '../src/views/Contact.vue'
import Collection from '../src/views/Collection.vue'
import WorkDetail from '../src/views/WorkDetail.vue'
import { TranslateKey } from '../src/localizations/localizations'
import { ValidLang } from '../src/localizations/AvailableLocales'

// Mock i18next - factory is hoisted, so use inline vi.fn()
vi.mock('i18next', () => ({
  default: {
    init: vi.fn(),
    t: vi.fn((key: string) => key),
    addResourceBundle: vi.fn(),
    changeLanguage: vi.fn(),
  },
}))

// Mock moment
vi.mock('moment/min/moment-with-locales', () => {
  const fn = vi.fn(() => ({ format: vi.fn() }))
  ;(fn as any).locale = vi.fn()
  return { default: fn }
})

// Mock translate function
const mockTranslate = vi.fn((key: string) => key)

// Stub components
const stubs = {
  PageHeader: {
    template: '<div class="page-header-stub" :data-title="page?.title"><slot /></div>',
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
  WorkDetailGallery: true,
  WorkDetailGrid: true,
}

// Create App wrapper component with router-view
const App = defineComponent({
  template: '<router-view />',
})

// Create router instance for testing
function createTestRouter(): Router {
  return createRouter({
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
          { path: 'work/:id', name: 'work-detail', component: WorkDetail },
        ],
      },
      { path: '/:pathMatch(.*)*', name: 'NotFound', component: Home },
    ],
  })
}

describe('Navigation', () => {
  let router: Router

  beforeEach(() => {
    vi.clearAllMocks()
    router = createTestRouter()
  })

  describe('Route navigation', () => {
    it('navigates to home page', async () => {
      router.push('/cs')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()
      expect(wrapper.find('.page-header-stub').exists()).toBe(true)
      expect(wrapper.find('.works-overview-stub').exists()).toBe(true)
    })

    it('navigates to about page', async () => {
      router.push('/cs/about')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()
      expect(wrapper.find('.page-header-stub').exists()).toBe(true)
      // About page has an image
      expect(wrapper.find('img[src="/images/michaela.jpg"]').exists()).toBe(true)
    })

    it('navigates to contact page', async () => {
      router.push('/cs/contact')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()
      expect(wrapper.find('.page-header-stub').exists()).toBe(true)
      expect(wrapper.find('.contact-form-stub').exists()).toBe(true)
    })

    it('navigates to collection page', async () => {
      router.push('/cs/works/available')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()
      expect(wrapper.find('.page-header-stub').exists()).toBe(true)
      expect(wrapper.find('.works-overview-stub').exists()).toBe(true)
    })

    it('redirects root to default language', async () => {
      router.push('/')
      await router.isReady()

      expect(router.currentRoute.value.path).toBe('/cs')
    })

    it('handles navigation between pages', async () => {
      router.push('/cs')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()

      // Navigate to about
      await router.push('/cs/about')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/cs/about')

      // Navigate to contact
      await router.push('/cs/contact')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/cs/contact')

      // Navigate back to home
      await router.push('/cs')
      await flushPromises()
      expect(router.currentRoute.value.path).toBe('/cs')
    })
  })

  describe('Language routes', () => {
    it('supports Czech language route', async () => {
      router.push('/cs')
      await router.isReady()

      expect(router.currentRoute.value.params.lang).toBe('cs')
    })

    it('supports English language route', async () => {
      router.push('/en')
      await router.isReady()

      expect(router.currentRoute.value.params.lang).toBe('en')
    })

    it('preserves language when navigating between pages', async () => {
      // Start on Czech home
      router.push('/cs')
      await router.isReady()
      expect(router.currentRoute.value.params.lang).toBe('cs')

      // Navigate to about - should stay in Czech
      await router.push('/cs/about')
      expect(router.currentRoute.value.params.lang).toBe('cs')

      // Navigate to contact - should stay in Czech
      await router.push('/cs/contact')
      expect(router.currentRoute.value.params.lang).toBe('cs')
    })

    it('can switch language on same page', async () => {
      // Start on Czech about
      router.push('/cs/about')
      await router.isReady()
      expect(router.currentRoute.value.params.lang).toBe('cs')

      // Switch to English about
      await router.push('/en/about')
      expect(router.currentRoute.value.params.lang).toBe('en')
      expect(router.currentRoute.value.path).toBe('/en/about')
    })

    it('both languages have same page structure', async () => {
      const pages = ['', 'about', 'contact', 'works/available']

      for (const page of pages) {
        // Test Czech
        router.push(`/cs/${page}`)
        await router.isReady()

        const wrapperCs = mount(App, {
          global: {
            plugins: [router],
            stubs,
            provide: {
              [TranslateKey as symbol]: mockTranslate,
            },
          },
        })
        await flushPromises()
        const csHasHeader = wrapperCs.find('.page-header-stub').exists()

        // Test English
        await router.push(`/en/${page}`)
        await flushPromises()
        const enHasHeader = wrapperCs.find('.page-header-stub').exists()

        expect(csHasHeader).toBe(enHasHeader)
        wrapperCs.unmount()
      }
    })
  })

  describe('Valid language validation', () => {
    it('ValidLang enum contains expected languages', () => {
      expect(ValidLang.cs).toBe('cs')
      expect(ValidLang.en).toBe('en')
    })

    it('only cs and en are valid languages', () => {
      const validLangs = Object.values(ValidLang)
      expect(validLangs).toContain('cs')
      expect(validLangs).toContain('en')
      expect(validLangs.length).toBe(2)
    })
  })

  describe('Route parameters', () => {
    it('extracts language from route params', async () => {
      router.push('/cs/about')
      await router.isReady()

      expect(router.currentRoute.value.params.lang).toBe('cs')
    })

    it('extracts collection from works route', async () => {
      router.push('/cs/works/available')
      await router.isReady()

      expect(router.currentRoute.value.params.lang).toBe('cs')
      expect(router.currentRoute.value.params.collection).toBe('available')
    })

    it('extracts work id from detail route', async () => {
      router.push('/cs/work/jeraby-21')
      await router.isReady()

      expect(router.currentRoute.value.params.lang).toBe('cs')
      expect(router.currentRoute.value.params.id).toBe('jeraby-21')
    })
  })

  describe('404 handling', () => {
    it('unknown routes render home component', async () => {
      router.push('/cs/unknown-page')
      await router.isReady()

      const wrapper = mount(App, {
        global: {
          plugins: [router],
          stubs,
          provide: {
            [TranslateKey as symbol]: mockTranslate,
          },
        },
      })

      await flushPromises()
      // NotFound route renders Home component
      expect(wrapper.find('.page-header-stub').exists()).toBe(true)
    })
  })
})
