import { Box, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { FC, memo } from 'react'

import { HomeFeatureType } from './types'

import { ProductConst } from '@/constants'

export const HomeFeature: FC<HomeFeatureType.RootProps> = memo(() => {
  return (
    <Box
      data-testid="HomeFeature"
      data-cy="HomeFeature"
      position="relative"
      _before={{
        display: 'block',
        content: '""',
        width: '688px',
        height: '477px',
        position: 'absolute',
        top: '-52px',
        right: 0,
        background: 'url("/images/pages/home/bg_right-obj_01.svg") no-repeat 0 0',
        zIndex: -1,
      }}
    >
      <Box w="1264px" m="0 auto">
        <HomeFeatureHeading />
        <HomeFeatureColumn />
      </Box>
    </Box>
  )
})

/**
 * 特徴エリア見出し
 */
const HomeFeatureHeading: FC<HomeFeatureType.HeadingProps> = memo(() => {
  return (
    <Heading
      as="h2"
      fontSize="30px"
      mt="120px"
      mb="50px"
      pb={6}
      textAlign="center"
      position="relative"
      _after={{
        display: 'block',
        content: '""',
        width: '4rem',
        height: '4px',
        backgroundColor: 'primary.500',
        borderRadius: '9999px',
        position: 'absolute',
        left: '50%',
        bottom: 0,
        transform: 'translateX(-50%)',
      }}
    >
      {`${ProductConst.PRODUCT_NAME}の特徴`}
    </Heading>
  )
})

/**
 * 特徴エリアカラム
 */
const HomeFeatureColumn: FC<HomeFeatureType.ColumnProps> = memo(() => {
  const features = [
    {
      title: '簡単に過去の週報を見返せる！',
      description: '週報一覧から参照したい週報を容易にストレスなく閲覧することができます。',
    },
    {
      title: '週報を素早く記入できる！',
      description: '週報作成時に登録したフォーマットを反映させることで、入力時間を大幅に短縮できます。',
    },
    {
      title: '週報の記入を忘れない！',
      description: '週報提出期限が近づくと、リマインダーを受け取ることができます。',
    },
  ]

  return (
    <SimpleGrid columns={3} mb={40}>
      {features.map(({ title, description }, idx) => {
        const borderProps =
          idx !== 0
            ? {
                borderLeft: '1px',
                borderColor: 'neutral.200',
              }
            : undefined

        return (
          <Box p={8} key={idx} {...borderProps}>
            <Heading as="h3" size="md" mb={6}>
              {title}
            </Heading>
            <Text size="md"> {description}</Text>
          </Box>
        )
      })}
    </SimpleGrid>
  )
})
