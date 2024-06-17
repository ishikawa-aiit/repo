/* eslint-disable @typescript-eslint/no-explicit-any */
import { CloseButton, Heading, Stack } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Data Display / CloseButton',
}

/**
 * A simple close button component.
 */

export const Basic = () => {
  const sizes = ['sm', 'md', 'lg']
  return (
    <Stack direction="row" spacing="3">
      <Stack>
        {sizes.map((size) => {
          return (
            <>
              <Heading>size=&quot;{size}&quot;</Heading>
              <CloseButton size={size} />
              <CloseButton isDisabled size={size} />
            </>
          )
        })}
      </Stack>
    </Stack>
  )
}
