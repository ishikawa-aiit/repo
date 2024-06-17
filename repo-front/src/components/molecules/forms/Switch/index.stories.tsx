import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Switch } from '.'

export default {
  component: Switch,
} as ComponentMeta<typeof Switch>

export const SwitchUsage: ComponentStoryObj<typeof Switch> = {
  storyName: '仕様',
  args: {},
  parameters: {
    docs: {
      description: {
        component: 'スイッチコンポーネント。',
      },
    },
  },
}
