/* eslint-disable @typescript-eslint/no-explicit-any */
import { Flex, Center, Square, Box, Text } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Layout / Flex',
}

export const Basic = () => {
  return (
    <Flex>
      <Center w="100px" bg="green.500">
        <Text>Box 1</Text>
      </Center>
      <Square bg="blue.500" size="150px">
        <Text>Box 2</Text>
      </Square>
      <Box p="4" flex="1" bg="tomato">
        <Text>Box 3</Text>
      </Box>
    </Flex>
  )
}
