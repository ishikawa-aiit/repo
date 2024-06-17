import '@testing-library/jest-dom'
import { cleanup } from '@testing-library/react'

import { server } from './__mocks__/server'

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = require('util').TextEncoder
}

beforeAll(() => {
  server.listen()
})

afterEach(() => {
  server.resetHandlers()
  cleanup()
})

afterAll(() => {
  server.close()
})
