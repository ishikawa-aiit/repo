import { Flex, VStack } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { CardItem } from '../CardItem'
import { CardsType } from '../type'

export const Card: FC<CardsType.CardProps> = memo(({ weeklyReportItem, id }) => {
  const titles = {
    reportWeek: '報告週',
    activityTime: '活動時間',
    doneActivity: '今週の活動と成果の実績',
    todoActivity: '来週の活動と成果の予定',
    solution: '課題と解決策',
    event: 'できごと・気づき',
    remark: '特記事項',
  }

  return (
    <Flex
      data-testid="Card"
      data-cy="Card"
      role="listitem"
      px={6}
      py={3}
      border="1px"
      borderColor="neutral.200"
      borderRadius={12}
      w="100%"
      bgColor="bg.white"
      id={id as unknown as string}
    >
      <VStack w="100%">
        {Object.entries(weeklyReportItem).map(([key, value]) => {
          const title = titles[key as keyof Omit<CardsType.DisplayType, 'id'>] || ''
          const isCopyable = key !== 'reportWeek'

          return <CardItem key={key} title={title} description={value} isCopyable={isCopyable} />
        })}
      </VStack>
    </Flex>
  )
})
