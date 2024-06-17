import { Flex, Box } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, memo } from 'react'

import { SidebarMenuItemType } from './type'

export const SidebarMenuItem: FC<SidebarMenuItemType.RootProps> = memo(({ link, name, icon, isCurrent = false }) => {
  const commonProps = {
    w: '100%',
    alignItems: 'center',
    color: 'text.white',
    fontSize: 'sm',
    gap: 4,
    fontWeight: 'bold',
    px: 6,
    py: 4,
    textDecoration: 'none',
    transitionDuration: '.25s',
    cursor: 'pointer',
    _activeLink: {
      backgroundColor: 'primary.600',
    },
  }

  const iconBox = () => {
    return <Box w={5}>{icon}</Box>
  }

  return (
    <Link href={link}>
      {isCurrent ? (
        <Flex
          {...commonProps}
          data-testid="SidebarCurrentMenuItem"
          data-cy="SidebarCurrentMenuItem"
          aria-current="page"
          as="a"
        >
          {iconBox()}
          {name}
        </Flex>
      ) : (
        <Flex
          {...commonProps}
          data-testid="SidebarMenuItem"
          data-cy="SidebarMenuItem"
          as="a"
          _hover={{ background: 'primary.400' }}
        >
          {iconBox()}
          {name}
        </Flex>
      )}
    </Link>
  )
})
