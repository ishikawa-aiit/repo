import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { CreationTemplate } from '.'

export default {
  component: CreationTemplate,
} as ComponentMeta<typeof CreationTemplate>

export const CreationTemplateUsage: ComponentStoryObj<typeof CreationTemplate> = {
  storyName: '仕様',
  argTypes: {},
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ホームページ（"/"）用のテンプレートとなるコンポーネントです',
      },
    },
  },
}
