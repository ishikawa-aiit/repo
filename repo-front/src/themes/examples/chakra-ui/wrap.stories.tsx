/* eslint-disable @typescript-eslint/no-explicit-any */
import { Badge, Wrap, WrapItem } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Layout / Wrap',
}

export const basic = () => {
  return (
    <Wrap>
      <WrapItem>
        <Badge>Badge 1</Badge>
      </WrapItem>
      <WrapItem>
        <Badge>Badge 2</Badge>
      </WrapItem>
      <WrapItem>
        <Badge>Badge 3</Badge>
      </WrapItem>
      <WrapItem>
        <Badge>Badge 4</Badge>
      </WrapItem>
    </Wrap>
  )
}
