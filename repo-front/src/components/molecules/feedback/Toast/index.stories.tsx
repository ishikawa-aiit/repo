import { Button } from '@chakra-ui/react'
import { Meta, Story } from '@storybook/react'

import { ToastType } from './type'

import { Toast, toast } from '.'

export default {
  storyName: '仕様',
  title: 'Components/molecules/feedback/Toast',
  argTypes: {
    status: {
      name: 'status',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: 'error',
      description: 'トーストとして表示する際のステータス',
      table: {
        type: {
          summary: 'error',
        },
      },
      control: {
        type: 'select',
        options: ['error'],
      },
    },
    title: {
      name: 'title',
      type: {
        name: 'string',
        required: true,
      },
      defaultValue: 'タイトルが入ります',
      description: 'タイトル',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'text',
      },
    },
    description: {
      name: 'description',
      type: {
        name: 'string',
        required: false,
      },
      description: '詳細テキスト',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    docs: {
      description: {
        component:
          'トーストは、オーバーレイの上にアラートなどのフィードバック要素を表示します。アクションが発生した後にユーザーにフィードバックを提供するために使用されます。<br>`Toast`コンポーネントはサーバプロバイダ内で既にラップしているため、**使用時は`toast`のみをインポートしてください。**',
      },
      source: {
        code: `
import { toast } from '@/components/molecules'

<Button
  onClick={() => {
    toast({
      status: 'error',
      title: '...',
      description: '...',
    })
  }}
>
  トーストを表示します
</Button>
        `,
        language: 'tsx',
      },
    },
  },
} as unknown as Meta<ToastType.FunctionArgsProps>

const Template: Story<ToastType.FunctionArgsProps> = (args) => {
  return (
    <Toast>
      <Button
        onClick={() => {
          toast(args)
        }}
      >
        トーストを表示します
      </Button>
    </Toast>
  )
}

export const Default = Template.bind({})

Default.storyName = '仕様'
