import { DateTime } from 'luxon'

import { WeeklyReportQueryDataItem } from '@/types'

/**
 * 週報のクエリデータを報告週でソートする。
 *
 * @param queryData ソートしたい週報のクエリデータ
 */
export const sortWeeklyReportQueryData = (queryData: WeeklyReportQueryDataItem[]) => {
  queryData.sort((one, another) => {
    return (
      DateTime.fromISO(another.requirement.targetDuration.startAt).toMillis() -
      DateTime.fromISO(one.requirement.targetDuration.startAt).toMillis()
    )
  })

  return queryData
}
