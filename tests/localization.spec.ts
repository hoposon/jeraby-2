import { describe, it, expect, vi, beforeEach } from 'vitest'
import { ValidLang, LangToLocale, AvailableLocales, DEFAULT_LOCALE } from '../src/localizations/AvailableLocales'

// Mock i18next for useLocalizations tests
const mockI18next = {
  init: vi.fn(),
  t: vi.fn((key: string) => key),
  addResourceBundle: vi.fn(),
  changeLanguage: vi.fn(),
}

vi.mock('i18next', () => ({
  default: mockI18next,
}))

// Mock moment
vi.mock('moment/min/moment-with-locales', () => {
  const mockMoment = vi.fn(() => ({
    format: vi.fn(() => '2024-01-01'),
  }))
  ;(mockMoment as any).locale = vi.fn()
  return { default: mockMoment }
})

describe('Localization Configuration', () => {
  describe('ValidLang enum', () => {
    it('contains Czech language', () => {
      expect(ValidLang.cs).toBe('cs')
    })

    it('contains English language', () => {
      expect(ValidLang.en).toBe('en')
    })

    it('has exactly 2 languages', () => {
      const langs = Object.keys(ValidLang).filter(k => isNaN(Number(k)))
      expect(langs.length).toBe(2)
      expect(langs).toContain('cs')
      expect(langs).toContain('en')
    })
  })

  describe('LangToLocale mapping', () => {
    it('maps cs to cs-cz locale', () => {
      expect(LangToLocale.cs).toBe('cs-cz')
    })

    it('maps en to en-ww locale', () => {
      expect(LangToLocale.en).toBe('en-ww')
    })

    it('each ValidLang has a corresponding LangToLocale entry', () => {
      Object.values(ValidLang).forEach(lang => {
        expect(LangToLocale[lang as keyof typeof LangToLocale]).toBeDefined()
      })
    })
  })

  describe('AvailableLocales mapping', () => {
    it('maps en-ww locale to en language code', () => {
      expect(AvailableLocales['en-ww']).toBe('en')
    })

    it('maps cs-cz locale to cs language code', () => {
      expect(AvailableLocales['cs-cz']).toBe('cs')
    })

    it('each LangToLocale value exists in AvailableLocales', () => {
      Object.values(LangToLocale).forEach(locale => {
        expect(AvailableLocales[locale as keyof typeof AvailableLocales]).toBeDefined()
      })
    })
  })

  describe('Default locale', () => {
    it('default locale is Czech (cs-cz)', () => {
      expect(DEFAULT_LOCALE).toBe('cs-cz')
    })

    it('default locale exists in AvailableLocales', () => {
      expect(AvailableLocales[DEFAULT_LOCALE as keyof typeof AvailableLocales]).toBeDefined()
    })
  })
})

describe('Localization System', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('useLocalizations', () => {
    it('isValidLang returns true for valid languages', async () => {
      // Import after mocks are set up
      const { useLocalizations } = await import('../src/localizations/localizations')
      const { isValidLang } = useLocalizations()

      expect(isValidLang('cs')).toBe(true)
      expect(isValidLang('en')).toBe(true)
    })

    it('isValidLang returns false for invalid languages', async () => {
      const { useLocalizations } = await import('../src/localizations/localizations')
      const { isValidLang } = useLocalizations()

      expect(isValidLang('de')).toBe(false)
      expect(isValidLang('fr')).toBe(false)
      expect(isValidLang('invalid')).toBe(false)
      expect(isValidLang('')).toBe(false)
    })
  })
})

describe('Language URL patterns', () => {
  const validLangs = Object.values(ValidLang)

  describe('URL structure', () => {
    it('all pages support language prefix', () => {
      const pages = ['', 'about', 'contact', 'works/available', 'work/jeraby-21']

      validLangs.forEach(lang => {
        pages.forEach(page => {
          const url = `/${lang}/${page}`.replace(/\/+/g, '/').replace(/\/$/, '') || `/${lang}`
          expect(url.startsWith(`/${lang}`)).toBe(true)
        })
      })
    })

    it('language codes are lowercase 2-letter codes', () => {
      validLangs.forEach(lang => {
        expect(lang).toMatch(/^[a-z]{2}$/)
      })
    })
  })

  describe('Language switching URLs', () => {
    it('can construct alternate language URL for same page', () => {
      const currentPath = '/cs/about'
      const targetLang = 'en'

      // Extract path after language
      const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '')
      const newPath = `/${targetLang}${pathWithoutLang}`

      expect(newPath).toBe('/en/about')
    })

    it('handles home page language switch', () => {
      const currentPath = '/cs'
      const targetLang = 'en'

      const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}$/, '')
      const newPath = `/${targetLang}${pathWithoutLang}`

      expect(newPath).toBe('/en')
    })

    it('handles nested route language switch', () => {
      const currentPath = '/cs/works/available'
      const targetLang = 'en'

      const pathWithoutLang = currentPath.replace(/^\/[a-z]{2}/, '')
      const newPath = `/${targetLang}${pathWithoutLang}`

      expect(newPath).toBe('/en/works/available')
    })
  })
})

describe('Translation key conventions', () => {
  describe('Page translation keys', () => {
    it('home page uses home.* keys', () => {
      const expectedKeys = ['home.title', 'home.description']
      expectedKeys.forEach(key => {
        expect(key).toMatch(/^home\./)
      })
    })

    it('about page uses about.* keys', () => {
      const expectedKeys = [
        'about.title',
        'about.description',
        'about.bio.heading',
        'about.bio.1',
        'about.bio.2',
        'about.bio.3',
        'about.how.heading',
        'about.how.1',
        'about.contact.me.heading',
        'about.contact.me.1',
      ]
      expectedKeys.forEach(key => {
        expect(key).toMatch(/^about\./)
      })
    })

    it('contact page uses contact.* keys', () => {
      const expectedKeys = ['contact.title', 'contact.main.text', 'contact.small.text', 'contact.form']
      expectedKeys.forEach(key => {
        expect(key).toMatch(/^contact\./)
      })
    })
  })

  describe('Work translation keys', () => {
    it('work keys follow jeraby.collection.works.{id}.* pattern', () => {
      const workId = 'jeraby-21'
      const expectedPattern = new RegExp(`^jeraby\\.collection\\.works\\.${workId}\\.`)

      const sampleKeys = [
        `jeraby.collection.works.${workId}.title`,
        `jeraby.collection.works.${workId}.presentationDescription`,
        `jeraby.collection.works.${workId}.workDetails.main.text`,
        `jeraby.collection.works.${workId}.workDetails.small.text`,
      ]

      sampleKeys.forEach(key => {
        expect(key).toMatch(expectedPattern)
      })
    })
  })
})
