import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Textarea } from '.'

export default {
  component: Textarea,
} as ComponentMeta<typeof Textarea>

export const TextareaUsage: ComponentStoryObj<typeof Textarea> = {
  storyName: '仕様',
  args: {},
  parameters: {
    docs: {
      description: {
        component: '自動でサイズ調整をするテキストエリアです。',
      },
    },
  },
}
