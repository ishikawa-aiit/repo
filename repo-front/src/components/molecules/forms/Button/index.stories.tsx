import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Button } from '.'

export default {
  component: Button,
} as ComponentMeta<typeof Button>

export const ButtonUsage: ComponentStoryObj<typeof Button> = {
  storyName: '仕様',
  argTypes: {
    children: {
      defaultValue: 'ボタン',
    },
    colorScheme: {
      defaultValue: 'primary',
      control: {
        type: 'select',
      },
    },
    isDisabled: {
      defaultValue: false,
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'フォームの送信、ダイアログのオープン、アクションのキャンセル、削除操作の実行などのアクションまたはイベントをトリガーするために使用されるボタンコンポーネントです',
      },
    },
  },
}
