import { Container, Flex, Heading } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { ListLayoutType } from './type'

import { Head } from '@/components/molecules'
import { Header, Footer, Main, Sidebar, ListSidebar } from '@/components/organisms'
import { UserGuard } from '@/components/organisms/guard/UserGuard'

export const ListLayout: FC<ListLayoutType.Props> = memo(
  ({ children, heading, innerWidth = '2xl', menuItems, ...headProps }) => {
    return (
      <UserGuard>
        <Head {...headProps} />
        <Flex data-testid="ListLayout" data-cy="ListLayout" flexDirection="column" minW="1264px" minH="100vh">
          <Header />
          <Flex flex="1 1 auto">
            <Sidebar />
            {menuItems.length > 0 && <ListSidebar menuItems={menuItems} />}
            <Flex flexDirection="column" flex={1} bgColor="gray.50" pt={16} px={8} pb={0}>
              <Main mb={12} pb={16}>
                <Container h="100%" w={innerWidth} maxW="1024px">
                  <Heading as="h1" mb={8}>
                    {heading}
                  </Heading>
                  {children}
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
