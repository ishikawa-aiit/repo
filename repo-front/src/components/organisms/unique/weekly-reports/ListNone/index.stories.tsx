import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ListNone } from '.'

export default {
  component: ListNone,
} as ComponentMeta<typeof ListNone>

export const ListNoneUsage: ComponentStoryObj<typeof ListNone> = {
  storyName: '仕様',
  argTypes: {
    isError: {
      defaultValue: false,
      control: 'boolean',
    },
  },
  parameters: {
    docs: {
      description: {
        component: '表示できる週報がない際に表示するディスプレイコンポーネントです',
      },
    },
  },
}
