import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { SettingSlack } from '.'

export default {
  component: SettingSlack,
} as ComponentMeta<typeof SettingSlack>

export const SettingSlackUsage: ComponentStoryObj<typeof SettingSlack> = {
  storyName: '仕様',
  parameters: {
    docs: {
      description: {
        component: '設定ページのSlack設定用コンポーネントです',
      },
    },
  },
}
