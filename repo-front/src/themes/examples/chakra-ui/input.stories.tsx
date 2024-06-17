/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightAddon, Stack } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Input',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Basic = () => {
  return (
    <Stack spacing="3">
      <Input placeholder="Basic input" />
      <Heading>isDisabled</Heading>
      <Input isDisabled placeholder="Basic input" />
      <Heading>isInvalid</Heading>
      <Input isInvalid placeholder="Basic input" />
      <Heading>isReadOnly</Heading>
      <Input isReadOnly placeholder="Basic input" />
    </Stack>
  )
}

export const Filled = () => {
  return (
    <Stack spacing="3">
      <Heading>variant=&quot;filled&quot;</Heading>
      <Input placeholder="Basic input" variant="filled" />
      <Heading>isDisabled</Heading>
      <Input isDisabled placeholder="Basic input" variant="filled" />
      <Heading>isInvalid</Heading>
      <Input isInvalid placeholder="Basic input" variant="filled" />
      <Heading>isReadOnly</Heading>
      <Input isReadOnly placeholder="Basic input" variant="filled" />
    </Stack>
  )
}

export const LeftAndRightAddons = () => {
  return (
    <Stack spacing="3">
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input placeholder="Basic input" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isDisabled</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isDisabled placeholder="Basic input" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isInvalid</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isInvalid placeholder="Basic input" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isReadOnly</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isReadOnly placeholder="Basic input" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
    </Stack>
  )
}

export const FilledLeftAndRightAddons = () => {
  return (
    <Stack spacing="3">
      <Heading>variant=&quot;filled&quot;</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input placeholder="Basic input" variant="filled" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isDisabled</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isDisabled placeholder="Basic input" variant="filled" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isInvalid</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isInvalid placeholder="Basic input" variant="filled" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
      <Heading>isReadOnly</Heading>
      <InputGroup>
        <InputLeftAddon>Left</InputLeftAddon>
        <Input isReadOnly placeholder="Basic input" variant="filled" />
        <InputRightAddon>Right</InputRightAddon>
      </InputGroup>
    </Stack>
  )
}

export const ElementInsideInput = () => {
  return (
    <Stack spacing="3">
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input placeholder="Basic input" />
      </InputGroup>
      <Heading>isDisabled</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isDisabled placeholder="Basic input" />
      </InputGroup>
      <Heading>isInvalid</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isInvalid placeholder="Basic input" />
      </InputGroup>
      <Heading>isReadOnly</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isReadOnly placeholder="Basic input" />
      </InputGroup>
    </Stack>
  )
}

export const FilledElementInsideInput = () => {
  return (
    <Stack spacing="3">
      <Heading>variant=&quot;filled&quot;</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input placeholder="Basic input" variant="filled" />
      </InputGroup>
      <Heading>isDisabled</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isDisabled placeholder="Basic input" variant="filled" />
      </InputGroup>
      <Heading>isInvalid</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isInvalid placeholder="Basic input" variant="filled" />
      </InputGroup>
      <Heading>isReadOnly</Heading>
      <InputGroup>
        <InputLeftElement pointerEvents="none" color="gray.300" fontSize="1.2em">
          $
        </InputLeftElement>
        <Input isReadOnly placeholder="Basic input" variant="filled" />
      </InputGroup>
    </Stack>
  )
}
