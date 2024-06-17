/* eslint-disable @typescript-eslint/no-explicit-any */
import { Stack, Box } from '@chakra-ui/layout'
import { Avatar, AvatarBadge, Text, Heading } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Media and Icons / Avatar',
  decorators: [
    (Story: any) => {
      return (
        <Box mx="auto">
          <Story />
        </Box>
      )
    },
  ],
}

export const Basic = () => {
  const sizes = ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl']

  return (
    <Stack spacing="5">
      <Stack direction="row">
        <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" />
        <Avatar name="Christian Nwamba" src="https://bit.ly/code-beast" />
        <Avatar name="Segun Adebayo" src="https://bit.ly/sage-adebayo" />
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <Box key={size}>
              <Text>size=&quot;{size}&quot;</Text>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size={size} />
            </Box>
          )
        })}
      </Stack>

      <Heading>AvatarBadge</Heading>
      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <Box key={size}>
              <Text>size=&quot;{size}&quot;</Text>
              <Avatar name="Dan Abrahmov" src="https://bit.ly/dan-abramov" size={size}>
                <AvatarBadge boxSize="1.25em" bg="green.500" />
              </Avatar>
            </Box>
          )
        })}
      </Stack>
    </Stack>
  )
}
