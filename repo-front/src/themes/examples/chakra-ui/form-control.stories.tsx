/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  FormControlOptions,
  FormControl,
  FormErrorIcon,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Textarea,
  Select,
  // useFormControl,
  Stack,
  Heading,
} from '@chakra-ui/react'
import { chakra, PropsOf } from '@chakra-ui/system'
import * as React from 'react'

export default {
  title: 'Chakra UI Components / Forms / FormControl',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

type OmittedTypes = 'disabled' | 'required' | 'readOnly' | 'size'

type InputProps = Omit<PropsOf<'input'>, OmittedTypes> &
  FormControlOptions & {
    // Input component as `size` by default, so it resolves to `never`
    // Omitted it from types in Line 16 and added back here.
    size?: string
  }

// Create an input that consumes useFormControl
// type Props = { focusBorderColor?: string; errorBorderColor?: string }

// const Input = React.forwardRef<HTMLInputElement, InputProps & Props>((props, ref) => {
//   const inputProps = useFormControl<HTMLInputElement>(props)
//   return <chakra.input ref={ref} {...inputProps} />
// })

const sizes = ['sm', 'md']

export const Basic = () => {
  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <Stack p="3" key={size}>
            <Heading>size=&quot;{size}&quot;</Heading>
            <FormControl id="first-name" isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First Name" size={size} />
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>Your First name is invalid</FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-2">
              <FormLabel>First name</FormLabel>
              <Textarea placeholder="First Name" size={size} />
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-3">
              <FormLabel>First name</FormLabel>
              <Select size={size}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Select>
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
          </Stack>
        )
      })}
    </Stack>
  )
}

export const WithoutFormHelperText = () => {
  return (
    <Stack spacing="5">
      <Heading>FormHelperText なし</Heading>
      {sizes.map((size) => {
        return (
          <Stack p="3" key={size}>
            <Heading>size=&quot;{size}&quot;</Heading>
            <FormControl id="first-name" isRequired>
              <FormLabel>First name</FormLabel>
              <Input placeholder="First Name" size={size} />
              <FormErrorMessage>Your First name is invalid</FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-2">
              <FormLabel>First name</FormLabel>
              <Textarea placeholder="First Name" size={size} />
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-3">
              <FormLabel>First name</FormLabel>
              <Select size={size}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Select>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
          </Stack>
        )
      })}
    </Stack>
  )
}

export const WithoutFormLabel = () => {
  return (
    <Stack spacing="5">
      <Heading>FormLabel なし</Heading>
      {sizes.map((size) => {
        return (
          <Stack p="3">
            <Heading>size=&quot;{size}&quot;</Heading>
            <FormControl id="first-name" isRequired>
              <Input placeholder="First Name" size={size} />
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>Your First name is invalid</FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-2">
              <Textarea placeholder="First Name" size={size} />
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-3">
              <Select size={size}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Select>
              <FormHelperText>Keep it very short and sweet!</FormHelperText>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
          </Stack>
        )
      })}
    </Stack>
  )
}

export const OnlyInput = () => {
  return (
    <Stack spacing="5">
      {sizes.map((size) => {
        return (
          <Stack p="3">
            <Heading>size=&quot;{size}&quot;</Heading>
            <FormControl id="first-name" isRequired>
              <Input placeholder="First Name" size={size} />
              <FormErrorMessage>Your First name is invalid</FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-2">
              <Textarea placeholder="First Name" size={size} />
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
            <FormControl id="first-name-3">
              <Select size={size}>
                <option>Option 1</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </Select>
              <FormErrorMessage>
                <FormErrorIcon />
                Your First name is invalid
              </FormErrorMessage>
            </FormControl>
          </Stack>
        )
      })}
    </Stack>
  )
}
