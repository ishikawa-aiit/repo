import { FC, memo } from 'react'

import { ListTemplateType } from './type'

import { Cards, ListLayout, ListNone } from '@/components/organisms'
import { WeeklyReportsTypes } from '@/components/types'
import { convertTargetDurationStartEndToReportWeekString } from '@/utils'

export const ListTemplate: FC<ListTemplateType.RootProps> = memo(
  ({ weeklyReportItems, isLoading, isError, ...props }, _ref) => {
    const collectListSidebarMenuItems = (weeklyReportItems: WeeklyReportsTypes.ReportsProps) => {
      return weeklyReportItems.map((weeklyReportItem, index) => {
        return {
          link: index.toString(),
          name:
            weeklyReportItem.requirement === undefined
              ? ''
              : convertTargetDurationStartEndToReportWeekString(
                  weeklyReportItem.requirement.targetDuration.startAt,
                  weeklyReportItem.requirement.targetDuration.endAt,
                ),
        }
      })
    }

    const listSidebarMenuItems = collectListSidebarMenuItems(weeklyReportItems)

    return (
      <ListLayout heading="週報一覧" menuItems={listSidebarMenuItems} {...props}>
        {isError ? (
          <ListNone isError={isError} />
        ) : (
          <Cards weeklyReportItems={weeklyReportItems} isLoading={isLoading} />
        )}
      </ListLayout>
    )
  },
)
