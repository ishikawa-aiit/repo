import { ComponentMeta, ComponentStoryObj } from '@storybook/react'

import { ClipboardCopyButton } from '.'

export default {
  component: ClipboardCopyButton,
} as ComponentMeta<typeof ClipboardCopyButton>

export const ClipboardCopyButtonUsage: ComponentStoryObj<typeof ClipboardCopyButton> = {
  storyName: '仕様',
  args: {
    copyText: 'sample',
    onCopied: () => {
      console.log('Copied!')
    },
  },
  parameters: {
    docs: {
      description: {
        component: 'クリップボードにコピーするボタンです',
      },
    },
  },
}
