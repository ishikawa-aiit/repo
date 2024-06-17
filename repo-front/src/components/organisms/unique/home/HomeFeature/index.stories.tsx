import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { HomeFeature } from '.'

export default {
  component: HomeFeature,
} as ComponentMeta<typeof HomeFeature>

export const HomeFeatureUsage: ComponentStoryObj<typeof HomeFeature> = {
  storyName: '仕様',
  parameters: {
    docs: {
      description: {
        component: 'ホームページ（"/"）用のプロダクトの特徴を説明するコンポーネントです',
      },
    },
  },
}
