import { RequirementTypes } from '@/components/types'

export type WeeklyReportQueryDataItem = {
  /** 週報の要件(報告週や期限を定義しているもの) */
  requirement: RequirementTypes.Requirement
}
