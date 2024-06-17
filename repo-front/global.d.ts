declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly APP_ENV: 'local' | 'ci'
      readonly RESOURCE_URL: string
    }
  }
}

import '@testing-library/jest-dom'
