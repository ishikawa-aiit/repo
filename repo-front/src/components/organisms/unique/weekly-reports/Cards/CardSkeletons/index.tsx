import { Flex, Skeleton, Stack, VStack } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { CardsType } from '../type'

export const CardSkeletons: FC<CardsType.SkeletonsProps> = memo(() => {
  return (
    <VStack data-testid="CardSkeletons" data-cy="CardSkeletons" role="list" spacing={6} h="100%">
      {[...Array(3)].map((_, i) => {
        return (
          <Flex
            key={i}
            px={6}
            py={3}
            border="1px"
            borderColor="neutral.200"
            borderRadius={12}
            w="100%"
            bgColor="bg.white"
            role="status"
            aria-busy
          >
            <Stack w="100%" spacing={3}>
              <Skeleton height={8} />
              <Skeleton height={8} />
              <Skeleton height={8} />
            </Stack>
          </Flex>
        )
      })}
    </VStack>
  )
})
