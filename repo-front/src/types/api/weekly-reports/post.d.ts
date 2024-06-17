import { ApiWeeklyReportsTypes } from '.'

import { WeeklyReportsTypes } from '@/components/types'

export namespace ApiPostWeeklyReportTypes {
  export type Request = {
    /** 週報要件(報告週や期限を定義しているもの) ID */
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

  export type Response = {
    data: ApiWeeklyReportsTypes.WeeklyReport
  }

  export type Props = {
    /** APIへのリクエストデータ */
    request: Request
    /** 楽観的更新する際に使用するクエリデータ */
    temporaryQueryData: WeeklyReportsTypes.ReportsProps
    /** 更新に失敗した際に戻すためのクエリデータ */
    rollbackQueryData: WeeklyReportsTypes.ReportsProps
  }
}
