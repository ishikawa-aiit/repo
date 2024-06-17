import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ValidationErrorMessage } from '.'

export default {
  component: ValidationErrorMessage,
} as ComponentMeta<typeof ValidationErrorMessage>

export const ValidationErrorMessageUsage: ComponentStoryObj<typeof ValidationErrorMessage> = {
  storyName: '仕様',
  args: {
    message: 'ここにバリデーションエラーメッセージが入ります',
  },
  parameters: {
    docs: {
      description: {
        component: 'バリデーションエラーメッセージを表示するコンポーネントです',
      },
    },
  },
}
