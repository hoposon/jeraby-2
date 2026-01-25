import { describe, it, expect } from 'vitest'
import {
  PAGES_DATA,
  HOME,
  ABOUT,
  CONTACT,
  COLLECTION_AVAILABLE,
  COLLECTION_UNAVAILABLE,
} from '../src/configuration/pages.config'

describe('Pages Configuration', () => {
  describe('Page data structure', () => {
    it('has all required pages defined', () => {
      expect(PAGES_DATA[HOME]).toBeDefined()
      expect(PAGES_DATA[ABOUT]).toBeDefined()
      expect(PAGES_DATA[CONTACT]).toBeDefined()
      expect(PAGES_DATA[COLLECTION_AVAILABLE]).toBeDefined()
      expect(PAGES_DATA[COLLECTION_UNAVAILABLE]).toBeDefined()
    })

    it('each page has an id', () => {
      expect(PAGES_DATA[HOME].id).toBe(HOME)
      expect(PAGES_DATA[ABOUT].id).toBe(ABOUT)
      expect(PAGES_DATA[CONTACT].id).toBe(CONTACT)
      expect(PAGES_DATA[COLLECTION_AVAILABLE].id).toBe(COLLECTION_AVAILABLE)
      expect(PAGES_DATA[COLLECTION_UNAVAILABLE].id).toBe(COLLECTION_UNAVAILABLE)
    })
  })

  describe('Page headers', () => {
    it('HOME page has required header properties', () => {
      const header = PAGES_DATA[HOME].pageHeader
      expect(header).toBeDefined()
      expect(header?.title).toBe('home.title')
      expect(header?.bgImage).toBeDefined()
      expect(header?.classNames).toBeDefined()
    })

    it('ABOUT page has required header properties', () => {
      const header = PAGES_DATA[ABOUT].pageHeader
      expect(header).toBeDefined()
      expect(header?.title).toBe('about.title')
      expect(header?.description).toBe('about.description')
      expect(header?.bgImage).toBeDefined()
      expect(header?.classNames).toBeDefined()
    })

    it('CONTACT page has required header properties', () => {
      const header = PAGES_DATA[CONTACT].pageHeader
      expect(header).toBeDefined()
      expect(header?.title).toBe('contact.title')
      expect(header?.bgImage).toBeDefined()
      expect(header?.classNames).toBeDefined()
    })

    it('COLLECTION_AVAILABLE page has required header properties', () => {
      const header = PAGES_DATA[COLLECTION_AVAILABLE].pageHeader
      expect(header).toBeDefined()
      expect(header?.title).toBe('available.works.collection.title')
      expect(header?.description).toBe('available.works.collection.description')
      expect(header?.bgImage).toBeDefined()
      expect(header?.classNames).toBeDefined()
    })

    it('COLLECTION_UNAVAILABLE page has required header properties', () => {
      const header = PAGES_DATA[COLLECTION_UNAVAILABLE].pageHeader
      expect(header).toBeDefined()
      expect(header?.title).toBe('unavailable.works.collection.title')
      expect(header?.description).toBe('unavailable.works.collection.description')
      expect(header?.bgImage).toBeDefined()
      expect(header?.classNames).toBeDefined()
    })
  })

  describe('Page header class names', () => {
    it('all pages with headers have bg classNames', () => {
      const pagesWithHeaders = [HOME, ABOUT, CONTACT, COLLECTION_AVAILABLE, COLLECTION_UNAVAILABLE]

      pagesWithHeaders.forEach((page) => {
        const header = PAGES_DATA[page].pageHeader
        expect(header?.classNames?.bg, `${page} should have bg classNames`).toBeDefined()
        expect(Array.isArray(header?.classNames?.bg)).toBe(true)
      })
    })

    it('all pages with headers have title classNames', () => {
      const pagesWithHeaders = [HOME, ABOUT, CONTACT, COLLECTION_AVAILABLE, COLLECTION_UNAVAILABLE]

      pagesWithHeaders.forEach((page) => {
        const header = PAGES_DATA[page].pageHeader
        expect(header?.classNames?.title, `${page} should have title classNames`).toBeDefined()
        expect(Array.isArray(header?.classNames?.title)).toBe(true)
      })
    })
  })
})
