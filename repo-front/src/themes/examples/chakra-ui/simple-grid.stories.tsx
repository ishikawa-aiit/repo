/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridItem, SimpleGrid } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Layout / SimpleGrid',
}

export const Basic = () => {
  return (
    <SimpleGrid>
      <GridItem p="4" bg="green.500">
        Column 1
      </GridItem>
      <GridItem p="4" bg="tomato">
        Column 2
      </GridItem>
    </SimpleGrid>
  )
}
