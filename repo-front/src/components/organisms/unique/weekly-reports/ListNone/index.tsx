import { Box, Text, VStack } from '@chakra-ui/react'
import { PencilAltIcon } from '@heroicons/react/outline'
import Link from 'next/link'
import { FC, memo } from 'react'

import { ListNoneType } from './type'

import { Button } from '@/components/molecules'

export const ListNone: FC<ListNoneType.Props> = memo(({ isError }) => {
  const commonProps = {
    fontWeight: 'bold',
    fontSize: 'xl',
  }

  return (
    <VStack spacing={6}>
      {isError ? (
        <Text data-testid="ListNoneIsError" data-cy="ListNoneIsError" as="p" {...commonProps}>
          表示できる週報はありません
        </Text>
      ) : (
        <>
          <Text data-testid="ListNone" data-cy="ListNone" as="p" {...commonProps}>
            作成された週報はありません
          </Text>
          <Link href="/weekly-reports/create" passHref>
            <Button
              as="a"
              leftIcon={
                <Box as="span" w={5}>
                  <PencilAltIcon />
                </Box>
              }
              size="lg"
            >
              週報を作成する
            </Button>
          </Link>
        </>
      )}
    </VStack>
  )
})
