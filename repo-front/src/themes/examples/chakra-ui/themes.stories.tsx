/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, WrapItem, Tooltip, Box, Wrap, useClipboard, Text, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { FC } from 'react'

import { colors } from '../../config/foundations/colors'

export default {
  title: 'Chakra UI Components',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

// カラーグリッド
const ColorGrid: FC<{
  color: string
}> = ({ color }) => {
  const { onCopy } = useClipboard(color)

  return (
    <WrapItem onClick={onCopy}>
      <Tooltip label={color} aria-label={color}>
        <Box bgColor={color} boxSize="120px"></Box>
      </Tooltip>
    </WrapItem>
  )
}

export const Themes = () => {
  const colorNames: string[] = []
  const fontSizes = ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl']

  Object.keys(colors).map((data) => {
    if (typeof colors[data] === 'string') {
      colorNames.push(data)
    } else {
      Object.keys(colors[data]).map((name) => {
        colorNames.push(data + '.' + name)
      })
    }
  })

  return (
    <>
      <Stack>
        <Heading size="md" mb={4}>
          カラーパレット
        </Heading>
        <Wrap spacing={0}>
          {colorNames.map((name) => {
            return (
              <Box key={name}>
                <ColorGrid color={name} />
              </Box>
            )
          })}
        </Wrap>
      </Stack>
      <Stack>
        <Heading size="md" mt={12} mb={4}>
          フォント
        </Heading>
        {fontSizes.map((sizeName) => {
          return (
            <Text fontSize={sizeName} key={sizeName}>
              （{sizeName}）この文章はダミーです。文字の大きさ、量、字間、行間等を確認するために入れています
            </Text>
          )
        })}
      </Stack>
    </>
  )
}
