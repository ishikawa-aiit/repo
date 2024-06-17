import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Footer } from '.'

export default {
  component: Footer,
} as ComponentMeta<typeof Footer>

export const FooterUsage: ComponentStoryObj<typeof Footer> = {
  storyName: '仕様',
  parameters: {
    docs: {
      description: {
        component: 'セクション（または文書全体）に関する情報をラップするコンポーネントです（footerタグに相当）',
      },
    },
  },
}
