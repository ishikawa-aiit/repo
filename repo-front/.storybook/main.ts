const path = require('path')

const toPath = (_path) => path.join(process.cwd(), _path)

module.exports = {
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  staticDirs: ['../public'],
  stories: ['../src/**/*.stories.*'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    {
      name: 'storybook-addon-next',
      options: {
        nextConfigPath: path.resolve(__dirname, '../next.config.js')
      }
    },
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  refs: {
    '@chakra-ui/react': {
      disable: true
    },
  },
  webpackFinal: async config => {
    config.resolve = {
      ...config.resolve,
      extensions: ['.ts', '.tsx', '.js', '.css', '.scss'],
      fallback: {
        fs: false,
        path: false,
      },
      mainFields: ['browser', 'module', 'main'],
      alias: {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        "@emotion/core": "@emotion/react",
        "emotion-theming": "@emotion/react",
      },
    }

    return {
      ...config,
    }
  },
}
