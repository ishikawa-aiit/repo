import { CustomTemplateTypes, MetaType } from '@/components/types'

export namespace CustomTemplateType {
  export type Props = {
    customTemplates: CustomTemplateTypes.CustomTemplateProps[]
  } & MetaType.Props

  export type TemplateFormElementsPropType = {
    /** 項目名 */
    name: keyof Inputs
    /** 表示用の項目名 */
    label: string
    /** プレースホルダー */
    placeholder?: string
  }

  export type ModelSentencePropsType = {
    /** 項目名 */
    name: keyof Inputs
    /** 例文 */
    modelSentence: string
  }

  export type ExplainSentencePropsType = {
    /** 項目名 */
    name: string
    /** 例文 */
    explainSentence: string
  }

  export type Template = {
    /** 項目名 */
    name: keyof Inputs
    /** テンプレートの内容 */
    sentence: string
  }

  export type Inputs = {
    /** テンプレートID */
    id: number | null
    /** テンプレート名 */
    name: string
    /** 活動時間 */
    activityTime?: string
    /** これまでの活動と成果の実績 */
    doneActivity?: string
    /** 今後の活動と成果の予定 */
    todoActivity?: string
    /** 課題と解決策 */
    solution?: string
    /** できごと・気づき */
    event?: string
    /** 特記事項 */
    remark?: string
    /** PTで共有する */
    isShared: boolean
  }
}
