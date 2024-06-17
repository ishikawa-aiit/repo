/* eslint-disable @typescript-eslint/no-explicit-any */
import { IconButton, Heading, Stack, Text, Divider } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / IconButton',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

const sizes = ['xs', 'sm', 'md', 'lg']

export const Basic = () => {
  return (
    <Stack spacing="5">
      <Heading>colorScheme=&quot;gray&quot;</Heading>
      <Stack direction="row" spacing="5">
        {sizes.map((size) => <Text>{size}</Text>)}
      </Stack>
      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} />
          )
        })}
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isActive />
          )
        })}
        <Text>isActive</Text>
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isDisabled />
          )
        })}
        <Text>isDisabled</Text>
      </Stack>

      <Divider />
      <Heading>colorScheme=&quot;gray&quot; variant=&quot;outline&quot;</Heading>
      <Stack direction="row" spacing="5">
        {sizes.map((size) => <Text>{size}</Text>)}
      </Stack>
      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} variant="outline" />
          )
        })}
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isActive isRound variant="outline" />
          )
        })}
        <Text>isActive</Text>
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isDisabled isRound variant="outline" />
          )
        })}
        <Text>isDisabled</Text>
      </Stack>

      <Divider />
      <Heading>colorScheme=&quot;gray&quot; variant=&quot;ghost&quot;</Heading>
      <Stack direction="row" spacing="5">
        {sizes.map((size) => <Text>{size}</Text>)}
      </Stack>
      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} variant="ghost" />
          )
        })}
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isActive isRound variant="ghost" />
          )
        })}
        <Text>isActive</Text>
      </Stack>

      <Stack direction="row">
        {sizes.map((size) => {
          return (
            <IconButton aria-label='dollar' colorScheme='gray' icon={<span>$</span>} size={size} isDisabled isRound variant="ghost" />
          )
        })}
        <Text>isDisabled</Text>
      </Stack>
    </Stack>
  )
}
