import { ApiTeamsTypes } from '../teams'

export namespace ApiCustomTemplateTypes {
  export type CustomTemplate = {
    /** 週報ID */
    id: number | null
    /** テンプレート名 */
    name: string
    /** 活動時間 */
    activityTime: string
    /** 今週の活動と成果の実績 */
    doneActivity: string
    /** 来週の活動と成果の予定 */
    todoActivity: string
    /** 課題と解決策 */
    solution: string
    /** できごと・気づき */
    event: string
    /** 特記事項 */
    remark: string
    /** 所属PT */
    team: ApiTeamsTypes.Team | null
    /** 作成日時 */
    createdAt: string
    /** 更新日時 */
    updatedAt: string
  }

  export type CustomTemplates = CustomTemplate[]
}
