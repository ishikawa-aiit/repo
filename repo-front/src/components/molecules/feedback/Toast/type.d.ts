import { ReactType } from '@/components/types'

export namespace ToastType {
  export type ContainerProps = ReactType.ChildProps & {}

  export type FunctionArgsProps = {
    /** トーストとして表示する際のステータス */
    status: 'error' | 'success'
    /** タイトル */
    title: string
    /** 詳細テキスト */
    description?: string
    /** 表示時間 */
    duration?: number
    /** 閉じるボタンを表示させるか */
    isClosable?: boolean
  }

  export type FunctionProps = (args: FunctionArgsProps) => void
}
