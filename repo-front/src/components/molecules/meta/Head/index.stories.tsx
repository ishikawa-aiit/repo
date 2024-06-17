import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { Head } from '.'

export default {
  component: Head,
} as ComponentMeta<typeof Head>

export const HeadUsage: ComponentStoryObj<typeof Head> = {
  storyName: '仕様',
  argTypes: {
    title: {
      defaultValue: 'タイトルが入ります',
    },
    description: {
      defaultValue: 'ディスクリプションが入ります',
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'HTMLで作成された文章に関するメタ情報を記述するためのコンポーネントです（headタグに相当）',
      },
    },
  },
}
