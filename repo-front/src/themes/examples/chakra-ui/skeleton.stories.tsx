/* eslint-disable @typescript-eslint/no-explicit-any */
import { Skeleton, SkeletonText, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Feedback / Skeleton',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

// Get more examples from here:
// https://danilowoz.com/create-content-loader/

export const Basic = () => {
  return (
    <Stack spacing={3}>
      <Skeleton h="20px" />
      <SkeletonText noOfLines={[3, 4, 5, 6, 7]} />
    </Stack>
  )
}
