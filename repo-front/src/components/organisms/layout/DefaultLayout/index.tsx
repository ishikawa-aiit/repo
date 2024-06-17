import { Container, Flex, Heading } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { DefaultLayoutType } from './type'

import { Head } from '@/components/molecules'
import { Header, Footer, Main, Sidebar } from '@/components/organisms'
import { UserGuard } from '@/components/organisms/guard/UserGuard'

export const DefaultLayout: FC<DefaultLayoutType.Props> = memo(
  ({ children, heading, innerWidth = '2xl', ...headProps }) => {
    return (
      <UserGuard>
        <Head {...headProps} />
        <Flex data-testid="DefaultLayout" data-cy="DefaultLayout" flexDirection="column" minW="1264px" minH="100vh">
          <Header />
          <Flex flex="1 1 auto">
            <Sidebar />
            <Flex flexDirection="column" flex={1} bgColor="gray.50" pt={16} px={8} pb={0}>
              <Main mb={12} pb={16}>
                <Container h="100%" maxW="none">
                  <Container w={innerWidth} maxW="1024px" p={0}>
                    <Heading as="h1" mb={8}>
                      {heading}
                    </Heading>
                    {children}
                  </Container>
                </Container>
              </Main>
              <Footer />
            </Flex>
          </Flex>
        </Flex>
      </UserGuard>
    )
  },
)
