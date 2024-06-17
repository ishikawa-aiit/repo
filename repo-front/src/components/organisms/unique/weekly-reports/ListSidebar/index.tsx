import { Box } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { FC, memo } from 'react'

import { ListSidebarMenuItem } from './ListSidebarMenuItem'
import { ListSidebarType } from './type'

export const ListSidebar: FC<ListSidebarType.Props> = memo(({ menuItems }) => {
  const router = useRouter()

  return (
    <Box
      position="sticky"
      top="68px"
      h="calc(100vh - 68px)"
      w="180px"
      data-testid="ListSidebar"
      data-cy="ListSidebar"
      bg="primary.50"
      overflowY="scroll"
    >
      {menuItems.map((menuItem, i) => {
        const link = `${router.pathname}#${menuItem.link}`
        const isCurrent = router.asPath === link

        return <ListSidebarMenuItem key={i} isCurrent={isCurrent} {...menuItem} />
      })}
    </Box>
  )
})
