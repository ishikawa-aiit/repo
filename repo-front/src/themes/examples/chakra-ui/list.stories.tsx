/* eslint-disable @typescript-eslint/no-explicit-any */
import { ListItem, OrderedList, UnorderedList, Stack } from '@chakra-ui/react'

export default {
  title: 'Chakra UI Components / Data Display / List',
}

export const Baic = () => {
  return (
    <Stack spacing="4">
      <Stack spacing="3">
        <UnorderedList>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipisicing elit</ListItem>
          <ListItem>Assumenda, quia temporibus eveniet a libero incidunt suscipit</ListItem>
          <ListItem>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</ListItem>
        </UnorderedList>
      </Stack>
      <Stack spacing="3">
        <OrderedList>
          <ListItem>Lorem ipsum dolor sit amet, consectetur adipisicing elit</ListItem>
          <ListItem>Assumenda, quia temporibus eveniet a libero incidunt suscipit</ListItem>
          <ListItem>Quidem, ipsam illum quis sed voluptatum quae eum fugit earum</ListItem>
        </OrderedList>
      </Stack>
    </Stack>
  )
}
