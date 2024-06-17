/* eslint-disable @typescript-eslint/no-explicit-any */
import { Progress, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Feedback / Linear Progress',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const progresses = [20, 40, 60, 80]

  return (
    <Stack spacing={5}>
      {progresses.map((prog) => {
        return (
          <Stack key={prog} spacing={4}>
            <Progress height="4px" value={prog} />
            <Progress size="sm" value={prog} />
            <Progress size="md" value={prog} />
            <Progress size="lg" value={prog} />
            <Progress height="32px" value={prog} />
          </Stack>
        )
      })}
    </Stack>
  )
}
