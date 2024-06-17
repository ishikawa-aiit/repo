import { ApiRequirementTypes } from '../requirement'

export namespace ApiWeeklyReportsTypes {
  export type WeeklyReport = {
    /** 週報ID */
    id: number
    /** 報告要件 */
    requirement: ApiRequirementTypes.Requirement
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
    /** 作成日時 */
    createdAt: string
    /** 更新日時 */
    updatedAt: string
  }

  export type WeeklyReports = WeeklyReport[]
}
