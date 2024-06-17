import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { CreationTemplate } from '.'

export default {
  component: CreationTemplate,
} as ComponentMeta<typeof CreationTemplate>

const sampleData = [
  {
    id: 1,
    name: 'dummy1',
    activityTime: 'dummy1',
    doneActivity: 'dummy1',
    todoActivity: 'dummy1',
    solution: 'dummy1',
    event: 'dummy1',
    remark: 'dummy1',
    team: {
      id: 1,
      name: 'dummy1',
      createdAt: 'dummy1',
      updatedAt: 'dummy1',
    },
  },
  {
    id: 2,
    name: 'dummy2',
    activityTime: 'dummy2',
    doneActivity: 'dummy2',
    todoActivity: 'dummy2',
    solution: 'dummy2',
    event: 'dummy2',
    remark: 'dummy2',
    team: {
      id: 2,
      name: 'dummy2',
      createdAt: 'dummy2',
      updatedAt: 'dummy2',
    },
  },
]

export const CreationTemplateUsage: ComponentStoryObj<typeof CreationTemplate> = {
  storyName: '仕様',
  argTypes: {
    customTemplates: {
      defaultValue: sampleData,
    },
  },
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'テンプレート作成ページ（"/create-templates/create"）用のテンプレートとなるコンポーネントです',
      },
    },
  },
}
