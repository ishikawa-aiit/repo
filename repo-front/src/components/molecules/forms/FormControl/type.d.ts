import { FormControlProps } from '@chakra-ui/react'
import { ReactElement } from 'react'
import { FieldError } from 'react-hook-form'

import { ReactType } from '@/components/types'

export namespace FormControlType {
  export type Props = FormControlProps & {
    children: ReactElement
    /** ラベルの内容 */
    label: string
    /** 必須項目か */
    isRequired?: boolean
    /** バリデーションエラー */
    error?: FieldError
    /** ラベルとフォームを横に並べる場合はtrue デフォルトはfalse */
    isInline?: boolean
  }

  export type LabelProps = ReactType.ChildProps & {
    /** 必須項目か */
    isRequired: boolean
  }
}
