import { Box, Flex, Link, Text } from '@chakra-ui/react'
import Image from 'next/image'
import NextLink from 'next/link'
import { FC, memo } from 'react'
import { useRecoilState } from 'recoil'

import { HeaderType } from './type'

import { ProductConst } from '@/constants'
import { user as userState } from '@/contexts/global/atoms/User'

export const Header: FC<HeaderType.Props> = memo(() => {
  const [user] = useRecoilState(userState)

  return (
    <Flex
      data-testid="Header"
      data-cy="Header"
      as="header"
      position="sticky"
      top="0"
      left="0"
      background="white"
      w="100%"
      px={5}
      boxShadow="sm"
      // メインコンテンツで z-index を使用できるように少し大きい値にしている
      // cf: モーダルの z-index は 1400 なのでそれ未満である必要がある
      zIndex={10}
      justifyContent="space-between"
    >
      <NextLink href="/weekly-reports/create" passHref>
        <Link>
          <Box pt={2} pb={1} transitionDuration=".25s" cursor="pointer" _hover={{ opacity: '.75' }}>
            <Image
              src="/images/common/logo_repo_01.svg"
              width="110"
              height="50"
              alt={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
            />
          </Box>
        </Link>
      </NextLink>
      {user && (
        <Flex flexDirection="column" justifyContent="center">
          <Text data-testid="HeaderUserName">
            {user.name}
            <Text as="small" fontSize="80%" paddingLeft=".8rem">
              さん
            </Text>
          </Text>
        </Flex>
      )}
    </Flex>
  )
})
