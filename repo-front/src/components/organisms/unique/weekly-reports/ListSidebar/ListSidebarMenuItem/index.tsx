import { Flex, FlexProps } from '@chakra-ui/react'
import Link from 'next/link'
import { FC, memo } from 'react'

import { ListSidebarMenuItemType } from './type'

export const ListSidebarMenuItem: FC<ListSidebarMenuItemType.RootProps> = memo(({ link, name, isCurrent }) => {
  const commonProps: FlexProps = {
    w: '100%',
    alignItems: 'center',
    color: 'text.black',
    fontSize: 'sm',
    gap: 4,
    fontWeight: 'bold',
    px: 6,
    py: 4,
    textDecoration: 'none',
    transitionDuration: '.25s',
    cursor: 'pointer',
    _activeLink: {
      backgroundColor: 'primary.400',
      color: 'text.white',
    },
  }

  return (
    <Link href={`#${link}`}>
      <Flex
        {...commonProps}
        as="a"
        data-testid={isCurrent ? 'ListSidebarCurrentMenuItem' : 'ListSidebarMenuItem'}
        data-cy={isCurrent ? 'ListSidebarCurrentMenuItem' : 'ListSidebarMenuItem'}
        aria-current={isCurrent ? 'page' : undefined}
        _hover={isCurrent ? undefined : { background: 'primary.100' }}
      >
        {name}
      </Flex>
    </Link>
  )
})
