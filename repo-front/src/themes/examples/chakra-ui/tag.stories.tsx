/* eslint-disable @typescript-eslint/no-explicit-any */
import fallbackIcon from '@chakra-ui/icon'
import { Heading, HStack, Stack, Tag, TagLabel, TagLeftIcon, TagRightIcon } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Data Display / Tag',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const sizes = ['sm', 'md', 'lg']
  return (
    <Stack spacing="5">
      <Heading>variant=&quot;solid&quot;</Heading>
      <HStack spacing="4">
        {sizes.map((size) => {
          return <Tag key={size}>Gray</Tag>
        })}
      </HStack>
      <HStack spacing={4}>
        {sizes.map((size) => {
          return (
            <Tag size={size} key={size} variant="solid">
              <TagLeftIcon as={fallbackIcon} />
              <TagLabel>Default</TagLabel>
            </Tag>
          )
        })}
      </HStack>
      <HStack spacing={4}>
        {sizes.map((size) => {
          return (
            <Tag size={size} key={size}>
              <TagLabel>Default</TagLabel>
              <TagRightIcon as={fallbackIcon} />
            </Tag>
          )
        })}
      </HStack>
    </Stack>
  )
}
