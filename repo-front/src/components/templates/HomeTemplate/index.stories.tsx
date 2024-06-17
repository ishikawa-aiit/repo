import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { HomeTemplate } from '.'

export default {
  component: HomeTemplate,
} as ComponentMeta<typeof HomeTemplate>

export const HomeTemplateUsage: ComponentStoryObj<typeof HomeTemplate> = {
  storyName: '仕様',
  argTypes: {
    title: {
      defaultValue: 'タイトルが入ります',
    },
    description: {
      defaultValue: 'ディスクリプションが入ります',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ホームページ（"/"）用のテンプレートとなるコンポーネントです',
      },
    },
  },
}
