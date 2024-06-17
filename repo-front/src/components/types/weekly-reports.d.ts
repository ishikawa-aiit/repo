import { ApiWeeklyReportsTypes, ApiRequirementTypes } from '@/types'

/**
 * 週報
 */
export namespace WeeklyReportsTypes {
  export type ReportProps = Pick<
    ApiWeeklyReportsTypes.WeeklyReport,
    'id' | 'requirement' | 'activityTime' | 'doneActivity' | 'todoActivity' | 'solution' | 'event' | 'remark'
  > & {
    [key: string]: string | number | ApiRequirementTypes.Requirement | null
  }

  export type ReportsProps = ReportProps[]
}
