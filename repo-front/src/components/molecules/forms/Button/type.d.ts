import { ButtonProps } from '@chakra-ui/button/dist/declarations/src/button'

import { ReactType } from '@/components/types'

export namespace ButtonType {
  export type Props = ReactType.ChildProps &
    ButtonProps & {
      /** ボタンの非アクティブ化 */
      isDisabled?: boolean
    }
}
