import { WeeklyReportsTypes } from '@/components/types'

export namespace CardsType {
  export type RootProps = {
    /** 週報の配列 */
    weeklyReportItems: WeeklyReportsTypes.ReportsProps
  } & Pick<UseQueryTypes.ReturnProps, 'isLoading'>

  /** 週報表示用 */
  export type DisplayType = {
    /** 週報ID */
    id: number
    /** 報告週表示用 */
    reportWeek: string
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
  }

  export type CardProps = {
    /** 週報 */
    weeklyReportItem: Omit<DisplayType, 'id'>
    /** ページ内遷移のID */
    id: number
  }

  export type ItemProps = {
    /** タイトル */
    title: string
    /** 詳細文 */
    description: string
    /** コピー操作が可能か */
    isCopyable: boolean
  }

  export type SkeletonsProps = {}
}
