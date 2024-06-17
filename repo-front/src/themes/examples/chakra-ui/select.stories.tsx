/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Select, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Select',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  const sizes = ['xs', 'sm', 'md', 'lg']

  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <Stack spacing="3" key={size}>
            <Heading>size=&quot;{size}&quot;</Heading>
            <Select placeholder="Select option" size={size}>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Select>

            <Select isDisabled placeholder="Select option" size={size}>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Select>

            <Select isInvalid placeholder="Select option" size={size}>
              <option value="Option 1">Option 1</option>
              <option value="Option 2">Option 2</option>
              <option value="Option 3">Option 3</option>
            </Select>
          </Stack>
        )
      })}
    </Stack>
  )
}
