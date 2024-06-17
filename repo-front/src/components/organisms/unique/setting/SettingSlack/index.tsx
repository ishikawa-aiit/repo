import { Text, Flex, Icon } from '@chakra-ui/react'
import { CheckCircleIcon } from '@heroicons/react/outline'
import React, { FC, memo } from 'react'

import { SlackType } from './type'

export const SettingSlack: FC<SlackType.Props> = memo(({ hasSlackConnection }) => {
  const setColor = hasSlackConnection ? 'primary.500' : 'neutral.500'

  return (
    <Flex alignItems={'center'} data-cy="SlackSettingStatus">
      {hasSlackConnection ? (
        <>
          <Icon as={CheckCircleIcon} w={6} h={6} color={setColor} strokeWidth={1} />
          <Text fontStyle={'italic'} color={setColor}>
            設定済み
          </Text>
        </>
      ) : (
        <>
          <Icon as={CheckCircleIcon} w={6} h={6} color={setColor} strokeWidth={1} />
          <Text fontStyle={'italic'} color={setColor}>
            未設定
          </Text>
        </>
      )}
    </Flex>
  )
})
