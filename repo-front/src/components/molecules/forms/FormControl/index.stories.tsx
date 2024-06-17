import { Input } from '@chakra-ui/react'
import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { FormControl } from '.'

export default {
  component: FormControl,
} as ComponentMeta<typeof FormControl>

const SampleInput = <Input placeholder="サンプル" />

export const FormControlUsage: ComponentStoryObj<typeof FormControl> = {
  storyName: '仕様',
  args: {
    label: 'ラベル',
    isRequired: true,
    children: SampleInput,
  },
  parameters: {
    docs: {
      description: {
        component: '週報関連のフォームです。',
      },
    },
  },
}
