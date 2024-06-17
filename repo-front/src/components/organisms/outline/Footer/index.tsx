import { Flex } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { FooterType } from './type'

export const Footer: FC<FooterType.Props> = memo(() => {
  return (
    <Flex
      data-testid="Footer"
      data-cy="Footer"
      as="footer"
      color="neutral.600"
      w="100%"
      marginTop="auto"
      fontSize="sm"
      py={3}
      justifyContent="center"
      borderTop="1px"
      borderTopColor="neutral.200"
    >
      &copy; Advanced Institute of Industrial Technology, Oikawa Project Team 2022
    </Flex>
  )
})
