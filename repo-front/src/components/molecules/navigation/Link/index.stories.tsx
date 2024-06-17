import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Link } from '.'

export default {
  component: Link,
} as ComponentMeta<typeof Link>

export const ValidationErrorMessageUsage: ComponentStoryObj<typeof Link> = {
  storyName: '仕様',
  args: {
    href: 'アドレスが入ります',
    text: 'リンクにする文字列が入ります',
  },
  parameters: {
    docs: {
      description: {
        component: 'リンクのコンポーネントです',
      },
    },
  },
}
