/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Heading, Stack } from '@chakra-ui/react'
import { ThemingProps } from '@chakra-ui/system'
import { chakra } from '@chakra-ui/system'
import { Meta, StoryFn } from '@storybook/react'
import * as React from 'react'

export default {
  title: 'Chakra UI Components / Forms / Button',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
} as Meta

interface StoryProps extends ThemingProps<'Button'> {
  children?: React.ReactNode
}

export const basic: StoryFn<StoryProps> = () => {
  const sizes = ['xs', 'sm', 'md', 'lg']
  return (
    <Stack spacing="5">
      <Stack direction="row" spacing="3">
        <Button>Button</Button>
        <Button isLoading>Button</Button>
      </Stack>

      <Stack direction="row" spacing="3">
        {sizes.map((size) => {
          return (
            <Button size={size} key={size}>
              Button
            </Button>
          )
        })}
      </Stack>

      <Heading>variant=&quot;outline&quot; colorScheme=&quot;gray&quot;</Heading>
      <Stack direction="row" spacing="3">
        {sizes.map((size) => {
          return (
            <Button size={size} key={size} variant="outline" colorScheme="gray">
              Button
            </Button>
          )
        })}
      </Stack>

      <Heading>variant=&quot;ghost&quot; colorScheme=&quot;gray&quot;</Heading>
      <Stack direction="row" spacing="3">
        {sizes.map((size) => {
          return (
            <Button size={size} key={size} variant="ghost" colorScheme="gray">
              Button
            </Button>
          )
        })}
      </Stack>
    </Stack>
  )
}
