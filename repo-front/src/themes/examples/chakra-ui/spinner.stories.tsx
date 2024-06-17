/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Spinner, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Feedback / Spinner',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const sizes = ['xs', 'sm', 'md', 'lg', 'xl']
  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <>
            <Heading>size=&quot;{size}&quot;</Heading>
            <Spinner size={size} key={size} />
          </>
        )
      })}
    </Stack>
  )
}
