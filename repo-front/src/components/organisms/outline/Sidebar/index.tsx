import { Box, Flex, Spacer } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, memo } from 'react'

import { SidebarMenuItem } from './SidebarMenuItem'
import { menuItems, bottomMenuItems } from './constants'

export const Sidebar: FC = memo(() => {
  const router = useRouter()

  return (
    <Flex
      data-testid="Sidebar"
      data-cy="Sidebar"
      as="aside"
      position="sticky"
      flexDirection="column"
      bg="primary.500"
      w="240px"
      top="68px"
      h="calc(100vh - 68px)"
    >
      <Box>
        {menuItems.map((menuItem, i) => {
          const { link } = menuItem
          const isCurrent = router.pathname === link

          return <SidebarMenuItem key={i} isCurrent={isCurrent} {...menuItem} />
        })}
      </Box>
      <Spacer />
      <Box>
        {bottomMenuItems.map((menuItem, i) => {
          const { link } = menuItem
          const isCurrent = router.pathname === link

          return <SidebarMenuItem key={menuItems.length + i} isCurrent={isCurrent} {...menuItem} />
        })}
      </Box>
    </Flex>
  )
})
