/* eslint-disable @typescript-eslint/no-explicit-any */
import { Hide, Show, Stack } from '@chakra-ui/react'

export default {
  title: 'Chakra UI System / Breakpoints',
}

export const Basic = () => {
  return (
    <Stack spacing="3">
      <Show above="sm">
        <div>Hey! I&apos;ll show above sm (480px)</div>
      </Show>
      <Hide below="md">
        <div>Hallos! I&apos;ll hide below 768px</div>
      </Hide>
    </Stack>
  )
}
