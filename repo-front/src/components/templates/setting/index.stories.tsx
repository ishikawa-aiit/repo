import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { SettingTemplate } from '.'

export default {
  component: SettingTemplate,
} as ComponentMeta<typeof SettingTemplate>

const sampleData = [
  {
    id: 1,
    name: '飛田PT',
    createdAt: '2022-10-23T14:52:47.000000Z',
    updatedAt: '2022-10-23T14:52:47.000000Z',
  },
  {
    id: 2,
    name: '嶋津PT',
    createdAt: '2022-10-23T14:52:47.000000Z',
    updatedAt: '2022-10-23T14:52:47.000000Z',
  },
]

export const ListTemplateUsage: ComponentStoryObj<typeof SettingTemplate> = {
  storyName: '仕様',
  argTypes: {
    projectTeams: {
      defaultValue: sampleData,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '所属PT設定("/setting")用テンプレートコンポーネントです',
      },
    },
  },
}
