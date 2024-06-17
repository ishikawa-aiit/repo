import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { HomeLayout } from '.'

export default {
  component: HomeLayout,
} as ComponentMeta<typeof HomeLayout>

export const HomeLayoutUsage: ComponentStoryObj<typeof HomeLayout> = {
  storyName: '仕様',
  argTypes: {
    children: {
      defaultValue: <div style={{ padding: '0 24px' }}>ここにコンテンツが入ります</div>,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ホーム画面("/")に使用するレイアウトコンポーネントです',
      },
    },
  },
}
