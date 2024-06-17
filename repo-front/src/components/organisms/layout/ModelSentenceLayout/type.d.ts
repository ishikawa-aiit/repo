import { ReactType } from '@/components/types'

export namespace ModelSentenceLayoutType {
  type modelSentence = {
    /** 項目名 */
    name: string
    /** 例文 */
    modelSentence: string
  }

  type explainSentence = {
    /** 項目名 */
    name: string
    /** 説明文 */
    explainSentence: string
  }

  export type Props = ReactType.ChildProps & {
    /** 例文 */
    modelSentences: modelSentence[]
    /** 説明文 */
    explainSentences?: explainSentence[]
  }
}
