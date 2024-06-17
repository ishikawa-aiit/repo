import { setupServer } from 'msw/node'

import { handlers } from './handlers'

/**
 * モックサーバー
 */
export const server = setupServer(...handlers)
