import { vi } from 'vitest'

// Mock i18next
vi.mock('i18next', () => ({
  default: {
    init: vi.fn(),
    t: vi.fn((key: string) => key),
    addResourceBundle: vi.fn(),
    changeLanguage: vi.fn(),
  },
}))

// Create a mock moment function that also has static .locale() method
const createMockMoment = () => {
  const momentFn = vi.fn(() => ({
    format: vi.fn(() => '2024-01-01'),
    locale: vi.fn(),
  }))
  // Add static locale method
  ;(momentFn as any).locale = vi.fn()
  return momentFn
}

// Mock moment
vi.mock('moment/min/moment-with-locales', () => ({
  default: createMockMoment(),
}))
