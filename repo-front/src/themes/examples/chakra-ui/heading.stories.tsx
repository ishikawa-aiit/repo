/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Stack } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Typography / Heading',
}

// see https://github.com/chakra-ui/chakra-ui/issues/2464
export const Basic = () => {
  return (
    <Stack spacing="3">
      <Heading>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet, sapiente.</Heading>
    </Stack>
  )
}
