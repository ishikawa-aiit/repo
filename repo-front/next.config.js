/** @type {import('next').NextConfig} */

const path = require('path')
const intercept = require('intercept-stdout')

const interceptStdout = (text) => {
  return text.includes('Duplicate atom key') ? '' : text
}
intercept(interceptStdout)

const nextConfig = {
  i18n: {
    locales: ['ja'],
    defaultLocale: 'ja',
  },
  webpack(config, _options) {
    config.resolve.alias['@'] = path.join(__dirname, 'src')
    return config
  },
  pageExtensions: ['page.tsx', 'page.ts'],
  reactStrictMode: true
}

module.exports = {
  ...nextConfig
}
