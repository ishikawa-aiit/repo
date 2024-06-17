/* eslint-disable @typescript-eslint/no-explicit-any */
import { Checkbox, Heading, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'
import { Meta } from '@storybook/react'

export default {
  title: 'Chakra UI Components / Forms / Checkbox',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
} as Meta

export const Basic = () => {
  const sizes = ['sm', 'md', 'lg']
  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <>
            <Heading>size=&quot;{size}&quot;</Heading>
            <Stack direction="row" spacing="4" key={size}>
              <Checkbox size={size}>Hello</Checkbox>
              <Checkbox size={size} isInvalid>
                Hello
              </Checkbox>
              <Checkbox size={size} defaultChecked>
                Hello
              </Checkbox>
              <Checkbox size={size} isDisabled>
                Hello
              </Checkbox>
              <Checkbox size={size} isDisabled defaultChecked>
                Hello
              </Checkbox>
            </Stack>
          </>
        )
      })}
    </Stack>
  )
}
