/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Radio, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Radio',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const sizes = ['sm', 'md', 'lg']
  return (
    <Stack direction="column" spacing="5">
      {sizes.map((size) => {
        return (
          <Stack spacing="3" key={size}>
            <Heading>size=&quot;{size}&quot;</Heading>
            <Radio size={size}>Hello</Radio>
            <Radio isChecked size={size}>
              Hello
            </Radio>
            <Radio isDisabled size={size}>
              Hello
            </Radio>
            <Radio isInvalid size={size}>
              Hello
            </Radio>
          </Stack>
        )
      })}
    </Stack>
  )
}
