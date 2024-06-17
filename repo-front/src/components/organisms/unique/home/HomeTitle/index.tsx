import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Image from 'next/image'
import { FC, memo } from 'react'
import { FaGoogle } from 'react-icons/fa'

import { HomeTitleType } from './types'

import { Button } from '@/components/molecules'
import { ProductConst } from '@/constants'
import { usePostAuthRedirect } from '@/hooks/api'

export const HomeTitle: FC<HomeTitleType.RootProps> = memo(() => {
  return (
    <Box
      data-testid="HomeTitle"
      data-cy="HomeTitle"
      position="relative"
      _before={{
        display: 'block',
        content: '""',
        width: '384px',
        height: '617px',
        position: 'absolute',
        top: '-84px',
        left: 0,
        background: 'url("/images/pages/home/bg_left-obj_01.svg") no-repeat 0 0',
        zIndex: -1,
      }}
    >
      <Flex w="1200px" m="20px auto 0" justifyContent="space-between" alignItems="center">
        <HomeTitleHeading />
        <HomeTitleHero />
      </Flex>
    </Box>
  )
})

/**
 * タイトルエリア見出し
 */
const HomeTitleHeading: FC<HomeTitleType.HeadingProps> = () => {
  const { mutate } = usePostAuthRedirect()

  const handleOnClick = () => {
    mutate(null)
  }

  return (
    <Box w="500px">
      <Box mb={10}>
        <Heading as="h1" mb={10}>
          <Image
            src="/images/pages/home/logo_repo_01.svg"
            width="400"
            height="181"
            alt={`${ProductConst.PRODUCT_CATEGORY} ${ProductConst.PRODUCT_NAME}`}
          />
        </Heading>
        <Text as="p" fontSize="xl" fontWeight="bold" lineHeight="1.5">
          AIIT（東京都立産業技術大学院大学）学生のPBL週報作成を効率化。manaba上での週報作成を最短時間で完了できます。また、manaba上では参照しづらい過去の週報も簡単に参照できます。
        </Text>
        <Text as="p" fontSize="sm" mt={2}>
          &#8251; Google Chrome以外のブラウザの場合、表示が崩れる場合があります。
        </Text>
      </Box>

      <Button
        type="button"
        colorScheme="red"
        data-cy="LinkToCreationPage"
        data-testid="RedirectButton"
        onClick={handleOnClick}
        leftIcon={<FaGoogle />}
      >
        <Text as="span">ログインして週報作成</Text>
      </Button>
    </Box>
  )
}

/**
 * タイトルエリアメイン画像
 */
const HomeTitleHero: FC<HomeTitleType.HeroProps> = () => {
  return (
    <Box w="620px">
      <Image src="/images/pages/home/hero_repo_01.svg" width="620" height="496" alt="" />
    </Box>
  )
}
