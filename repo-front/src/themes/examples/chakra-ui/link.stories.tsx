/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Navigation / Link',
}

/**
 * Here's a basic link component
 * in Chakra.
 */
export const Basic = () => {
  return (
    <Link isExternal href="https://google.com">
      This is a link
    </Link>
  )
}
