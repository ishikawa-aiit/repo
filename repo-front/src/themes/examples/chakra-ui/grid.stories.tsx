/* eslint-disable @typescript-eslint/no-explicit-any */
import { GridItem, Grid } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Layout / Grid',
}

export const Basic = () => {
  return (
    <Grid templateColumns="repeat(5, 1fr)" gap={4}>
      <GridItem bg="tomato" height="200px" />
      <GridItem bg="tomato" height="200px" />
      <GridItem bg="tomato" height="200px" />
      <GridItem bg="tomato" height="200px" />
      <GridItem bg="tomato" height="200px" />
    </Grid>
  )
}
