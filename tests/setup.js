// tests/setup.js
import { vi } from 'vitest'
import { config } from '@vue/test-utils'

// Setup global properties
config.global.stubs = {}

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
  length: 0,
  key: vi.fn(),
}
global.localStorage = localStorageMock

// Mock sessionStorage
global.sessionStorage = localStorageMock

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  error: vi.fn(),
  warn: vi.fn(),
}

// Global test utilities
global.flushPromises = () => new Promise(resolve => setImmediate(resolve))

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.getItem.mockReset()
  localStorageMock.setItem.mockReset()
  localStorageMock.removeItem.mockReset()
  localStorageMock.clear.mockReset()
})