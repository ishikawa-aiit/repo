import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Main } from '.'

export default {
  component: Main,
} as ComponentMeta<typeof Main>

export const MainUsage: ComponentStoryObj<typeof Main> = {
  storyName: '仕様',
  argTypes: {
    children: {
      defaultValue: <div style={{ padding: '24px' }}>ここにコンテンツが入ります</div>,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'ページ内の主要な内容をラップするコンポーネントです（mainタグに相当）',
      },
    },
  },
}
