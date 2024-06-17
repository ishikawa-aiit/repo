import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { HomeTitle } from '.'

export default {
  component: HomeTitle,
} as ComponentMeta<typeof HomeTitle>

export const HomeTitleUsage: ComponentStoryObj<typeof HomeTitle> = {
  storyName: '仕様',
  parameters: {
    docs: {
      description: {
        component: 'ホームページ（"/"）用のタイトルセクションコンポーネントです',
      },
    },
  },
}
