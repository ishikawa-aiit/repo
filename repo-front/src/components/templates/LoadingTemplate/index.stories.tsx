import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { LoadingTemplate } from '.'

export default {
  component: LoadingTemplate,
} as ComponentMeta<typeof LoadingTemplate>

export const LoadingTemplateUsage: ComponentStoryObj<typeof LoadingTemplate> = {
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
        component: 'ローディングを表示する用のテンプレートとなるコンポーネントです',
      },
    },
  },
}
