/* eslint-disable @typescript-eslint/no-explicit-any */
import { Editable, EditableInput, EditablePreview } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Editable',
  decorators: [
    (Story: Function) => {
      return (
        <chakra.div mx="auto">
          <Story />
        </chakra.div>
      )
    },
  ],
}

export const Basic = () => {
  return (
    <Editable defaultValue="Rasengan ⚡️" onChange={console.log}>
      <EditablePreview />
      <EditableInput />
    </Editable>
  )
}
