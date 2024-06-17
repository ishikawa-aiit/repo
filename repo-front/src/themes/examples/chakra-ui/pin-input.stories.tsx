/* eslint-disable @typescript-eslint/no-explicit-any */
import { PinInput, PinInputField } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Forms / PinInput',
}

export const Basic = () => {
  return (
    <PinInput>
      <PinInputField />
      <PinInputField />
      <PinInputField />
    </PinInput>
  )
}
