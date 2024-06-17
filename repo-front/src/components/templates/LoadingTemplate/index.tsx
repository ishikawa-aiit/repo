import { Flex, Spinner } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { LoadingTemplateType } from './types'

import { Head } from '@/components/molecules'

export const LoadingTemplate: FC<LoadingTemplateType.Props> = memo(({ title, description }) => {
  return (
    <>
      <Head title={title} description={description} />
      <Flex data-testid="CallbackTemplate" data-cy="CallbackTemplate" flexDirection="column" minHeight="100vh">
        <Flex h="100vh" direction="column" justifyContent="center" alignItems="center">
          <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" size="xl" label="Now loading" />
        </Flex>
      </Flex>
    </>
  )
})
