import { Box, VStack } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { ListNone } from '../ListNone'

import { Card } from './Card'
import { CardSkeletons } from './CardSkeletons'
import { CardsType } from './type'

import { convertTargetDurationStartEndToReportWeekString } from '@/utils'

export const Cards: FC<CardsType.RootProps> = memo(({ weeklyReportItems, isLoading }) => {
  if (isLoading) return <CardSkeletons />
  if (weeklyReportItems.length > 0) {
    return (
      <VStack data-testid="Cards" data-cy="Cards" role="list" spacing={6} h="100%">
        {weeklyReportItems.map((weeklyReportItem, i) => {
          const { requirement, activityTime, doneActivity, todoActivity, solution, event, remark } = weeklyReportItem
          const reportWeek =
            weeklyReportItem.requirement === undefined
              ? ''
              : convertTargetDurationStartEndToReportWeekString(
                  requirement.targetDuration.startAt,
                  requirement.targetDuration.endAt,
                )
          const pickItem = {
            reportWeek,
            activityTime,
            doneActivity,
            todoActivity,
            solution,
            event,
            remark,
          }

          return <Card key={i} weeklyReportItem={pickItem} id={i} />
        })}
      </VStack>
    )
  }

  return (
    <Box data-testid="Cards" data-cy="Cards">
      <ListNone isError={false} />
    </Box>
  )
})
