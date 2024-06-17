import { CustomTemplateTypes, RequirementTypes, MetaType } from '@/components/types'

export namespace CreationTemplateType {
  export type Props = {
    /** カスタムテンプレート */
    customTemplates: CustomTemplateTypes.CustomTemplateProps[]
    /** 報告要件 */
    requirements: RequirementTypes.RequirementProps[]
  } & MetaType.Props

  export type FormElementsPropType = {
    /** 項目名 */
    name: keyof Inputs
    /** 表示用の項目名 */
    label: string
    /** プレースホルダー */
    placeholder: string
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
    /** 説明文 */
    explainSentence: string
  }

  export type Template = {
    /** 項目名 */
    name: keyof Inputs
    /** テンプレートの内容 */
    sentence: string
  }

  export type Inputs = {
    /** テンプレート */
    template: string
    /** テンプレート名 */
    name: string
    /** 週報要件ID(報告週や期限を定義しているもの) */
    requirementId: string
    /** 活動時間 */
    activityTime: string
    /** これまでの活動と成果の実績 */
    doneActivity: string
    /** 今後の活動と成果の予定 */
    todoActivity: string
    /** 課題と解決策 */
    solution: string
    /** できごと・気づき */
    event: string
    /** 特記事項 */
    remark: string
  }

  export type RequirementDisplayType = {
    /** 報告要件ID */
    id: string
    /** 報告週表示名 */
    name: string
  }
}
