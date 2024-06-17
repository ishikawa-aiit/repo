import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { DefaultLayout } from '.'

export default {
  component: DefaultLayout,
} as ComponentMeta<typeof DefaultLayout>

export const DefaultLayoutUsage: ComponentStoryObj<typeof DefaultLayout> = {
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
