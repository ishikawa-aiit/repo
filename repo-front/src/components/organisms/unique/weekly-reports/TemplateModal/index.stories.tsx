import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { TemplateModal } from '.'

export default {
  component: TemplateModal,
} as ComponentMeta<typeof TemplateModal>

export const TemplateModalUsage: ComponentStoryObj<typeof TemplateModal> = {
  storyName: '仕様',
  args: {
    isOpen: true,
    /* eslint-disable @typescript-eslint/no-empty-function */
    onClose: () => {},
    onApply: async () => {},
    /* eslint-enable @typescript-eslint/no-empty-function */
  },
  parameters: {
    docs: {
      description: {
        component: 'テンプレート反映の確認を行うモーダル',
      },
    },
  },
}
