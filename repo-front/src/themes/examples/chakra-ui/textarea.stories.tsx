/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Stack, Textarea } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Textarea',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const sizes = ['sm', 'md']

  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <Stack spacing="3" key={size}>
            <Heading>variant=&quot;{size}&quot;</Heading>
            <Textarea defaultValue="This is a textarea" size={size} />
            <Textarea defaultValue="This is a textarea" size={size} isDisabled />
            <Textarea defaultValue="This is a textarea" size={size} isInvalid />
          </Stack>
        )
      })}
    </Stack>
  )
}
