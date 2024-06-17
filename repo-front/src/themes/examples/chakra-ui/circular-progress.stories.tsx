/* eslint-disable @typescript-eslint/no-explicit-any */
import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Feedback / Circular Progress',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const basic = () => {
  return (
    <>
      <CircularProgress value={20} color="primary.500" />
      <CircularProgress value={40} color="primary.500">
        <CircularProgressLabel>40%</CircularProgressLabel>
      </CircularProgress>
    </>
  )
}
