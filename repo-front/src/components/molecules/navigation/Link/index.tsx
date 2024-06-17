import { Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC, memo } from 'react'

import { LinkType } from './type'

export const Link: FC<LinkType.Props> = memo(({ href, text }) => {
  return (
    <NextLink href={href} passHref>
      <Text data-testid="Link" as="a" color="primary.500" _hover={{ textDecorationLine: 'underline' }}>
        {text}
      </Text>
    </NextLink>
  )
})
