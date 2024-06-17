const {
  series,
  crossEnv
} = require('nps-utils');

module.exports = {
  scripts: {
    dev: {
      script: crossEnv('APP_ENV=local next dev'),
      description: 'ローカル開発サーバ立ち上げ',
    },
    build: {
      script: crossEnv('next build'),
      description: 'アプリケーションビルド',
      audits: {
        script: crossEnv(`APP_ENV=ci next build`),
        description: 'Lighthouse実行時のアプリケーション実行',
      },
    },
    appstart: {
      script: crossEnv('next start'),
      description: 'アプリケーション実行',
    },
    eslint: {
      script: crossEnv('eslint "**/*.{ts,tsx}"'),
      description: 'ESLint検証',
    },
    eslintfix: {
      script: crossEnv('eslint --fix "**/*.{ts,tsx}"'),
      description: 'ESLint実行',
    },
    stylelint: {
      script: crossEnv('stylelint "**/*.{ts,tsx}"'),
      description: 'Stylelint検証',
    },
    stylelintfix: {
      script: crossEnv('stylelint --fix "**/*.{ts,tsx}"'),
      description: 'Stylelint実行',
    },
    start: {
      local: {
        script: crossEnv(`APP_ENV=local ${series.nps('build', 'appstart')}`),
        description: 'ローカル環境でのアプリケーション実行',
      },
      ci: {
        script: crossEnv(`APP_ENV=ci ${series.nps('build', 'appstart')}`),
        description: 'CI環境でのアプリケーション実行',
      },
      audits: {
        script: crossEnv(`APP_ENV=ci next start`),
        description: 'Lighthouse実行時のアプリケーション実行',
      },
    },
    lint: {
      script: crossEnv(`${series.nps('eslint', 'stylelint')}`),
      description: 'Linting検証',
      fix: {
        script: crossEnv(`${series.nps('eslintfix', 'stylelintfix')}`),
        description: 'Linting実行',
      }
    },
    test: {
      script: crossEnv('NODE_OPTIONS="--max-old-space-size=4096" jest'),
      description: 'テスト実行',
      watch: {
        script: crossEnv('NODE_OPTIONS="--max-old-space-size=4096" jest --watch'),
        description: 'ウォッチモードでテスト実行',
      },
      update: {
        script: crossEnv('NODE_OPTIONS="--max-old-space-size=4096" jest -u'),
        description: 'スナップショット更新',
      },
      ci: {
        script: crossEnv('NODE_OPTIONS="--max-old-space-size=4096" jest --ci'),
        description: 'CI環境でテスト実行',
      }
    },
    storybook: {
      script: 'cross-env TS_NODE_PROJECT=.storybook/tsconfig.json start-storybook -p 3001 --ci',
      description: 'Storybook開発サーバ立ち上げ',
      build: {
        script: 'cross-env TS_NODE_PROJECT=.storybook/tsconfig.json build-storybook -o ui',
        description: 'Storybookのビルド',
      },
    },
    audits: {
      script: 'node ./audits/index.js',
      description: 'Lighthouseの実行',
    },
  }
};
