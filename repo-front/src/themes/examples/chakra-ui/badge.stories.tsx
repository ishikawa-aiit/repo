/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Heading, Box } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Data Display / Badge',
}

export const Basic = () => {
  return (
    <Box>
      <Heading>※textTransform=&quot;uppercase&quot;</Heading>
      <br />
      <br />
      <Badge>My Badge</Badge>

      <Heading>variant=&quot;outline&quot;</Heading>
      <Badge variant="outline">My Badge</Badge>

      <Heading>variant=&quot;solid&quot;</Heading>
      <Badge variant="solid">My Badge</Badge>
    </Box>
  )
}
