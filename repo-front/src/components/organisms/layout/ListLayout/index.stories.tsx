import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ListLayout } from '.'

export default {
  component: ListLayout,
} as ComponentMeta<typeof ListLayout>

export const ListLayoutUsage: ComponentStoryObj<typeof ListLayout> = {
  storyName: '仕様',
  argTypes: {
    children: {
      defaultValue: 'ここにコンテンツが入ります',
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'デフォルトで使用するレイアウトコンポーネントです',
      },
    },
  },
}
