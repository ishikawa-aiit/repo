import { Flex, Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { CardsType } from '../type'

import { ClipboardCopyButton, toast } from '@/components/molecules'

export const CardItem: FC<CardsType.ItemProps> = memo(({ title, description, isCopyable }) => {
  return (
    <Flex
      data-testid="CardItem"
      data-cy="CardItem"
      as="dl"
      borderBottom="1px"
      borderColor="neutral.200"
      w="100%"
      wordBreak="break-all"
      _last={{ borderBottom: 'none' }}
      pt={2}
      pb={4}
      gap={4}
      direction="column"
    >
      <Flex as="dt" aria-label="title" fontWeight="bold" justifyContent="space-between" alignItems="baseline">
        {title}
        {isCopyable && (
          <ClipboardCopyButton
            flexShrink="0"
            copyText={description}
            onCopied={() => {
              toast({
                status: 'success',
                title: 'クリップボードにコピーしました',
                duration: 1000,
                isClosable: false,
              })
            }}
          />
        )}
      </Flex>
      <Text as="dd" verticalAlign="middle" whiteSpace="pre-wrap">
        {description}
      </Text>
    </Flex>
  )
})
