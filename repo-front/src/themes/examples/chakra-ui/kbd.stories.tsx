/* eslint-disable @typescript-eslint/no-explicit-any */
import { Kbd } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Data Display / Kbd',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

/**
 * Divider will use the `horizontal` variant by default.
 *
 * @see `/theme/components/Divider.ts`
 */
export const Basic = () => {
  return (
    <>
      <Kbd>shift</Kbd> + <Kbd>H</Kbd>
    </>
  )
}
