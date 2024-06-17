import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Header } from '.'

export default {
  component: Header,
} as ComponentMeta<typeof Header>

export const HeaderUsage: ComponentStoryObj<typeof Header> = {
  storyName: '仕様',
  args: {},
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          '導入的なコンテンツ、導入部やナビゲーション等のグループをラップするコンポーネントです（headerタグに相当）',
      },
    },
  },
}
