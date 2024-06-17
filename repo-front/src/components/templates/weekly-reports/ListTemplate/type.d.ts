import { UseQueryTypes, WeeklyReportsTypes, MetaType } from '@/components/types'

export namespace ListTemplateType {
  export type RootProps = {
    /** 週報 */
    weeklyReportItems: WeeklyReportsTypes.ReportsProps
  } & MetaType.Props &
    UseQueryTypes.ReturnProps
}
