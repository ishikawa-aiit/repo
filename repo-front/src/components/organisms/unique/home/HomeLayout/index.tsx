import { Flex } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { HomeLayoutType } from './type'

import { Footer, Main } from '@/components/organisms'

export const HomeLayout: FC<HomeLayoutType.Props> = memo(({ children }) => {
  return (
    <Flex data-testid="HomeLayout" data-cy="HomeLayout" flexDirection="column" minHeight="100vh" mt={16}>
      <Main overflow="visible">{children}</Main>
      <Footer />
    </Flex>
  )
})
