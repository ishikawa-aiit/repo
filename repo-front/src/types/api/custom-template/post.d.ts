import { ApiCustomTemplateTypes } from '.'

export namespace ApiPostCustomTemplateTypes {
  export type Request = {
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
    /** PT共有フラグ */
    isShared: boolean
  }

  export type Response = {
    data: ApiCustomTemplateTypes.CustomTemplates
    /** ステータスコード */
    status: number
  }
}
