/**
 * @type {import("@jest/types").Config.InitialOptions}
 */
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  verbose: true,
  roots: ['<rootDir>/src'],
  testEnvironment: 'jest-environment-jsdom',
  testMatch: ['**/*.test.{ts,tsx}'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/.next/',
    '^.+\\.(css|sass|scss)$'
  ],
  transform: {
    '.+\\.tsx?$': [
      '@swc/jest',
      {
        sourceMaps: true,
        module: {
          type: 'commonjs',
        },
        jsc: {
          parser: {
            syntax: 'typescript',
            tsx: true,
          },
          transform: {
            react: {
              runtime: 'automatic',
            },
          },
        },
      },
    ],
  },
  transformIgnorePatterns: ['/node_modules/', '^.+\\.module\\.(css|sass|scss)$'],
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/{index,styles}.ts',
    '!**/constants.ts',
    '!**/client.ts',
    '!**/api-client.ts',
    '!**/provider.tsx',
    '!**/keys.ts',
    '!**/*.d.ts',
    '!**/*.stories.tsx',
    '!**/node_modules/**',
    '!**/.storybook/**',
    '!**/.jest/**',
    '!**/config/**',
    '!**/constants/**',
    '!**/pages/_app.page.tsx',
    '!**/pages/_document.page.tsx',
    '!**/pages/api/**',
  ],
  moduleNameMapper: {
    'next/dist/server/image-config': '<rootDir>/node_modules/next/dist/shared/lib/image-config',
    '^.+\\.(css|sass|scss)$': '<rootDir>/.jest/__mocks__/client/style.ts',
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$/i': `<rootDir>.jest/__mocks__/client/file.ts`,
    '\\.(mdx)$': '<rootDir>/.jest/__mocks__/client/mdx.ts',
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  moduleDirectories: ['node_modules', '<rootDir>/'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  snapshotSerializers: ['@emotion/jest/serializer'],
  setupFilesAfterEnv: ['<rootDir>/.jest/setup.ts'],
  maxWorkers: 1,
  logHeapUsage: true,
}

module.exports = createJestConfig(customJestConfig)
