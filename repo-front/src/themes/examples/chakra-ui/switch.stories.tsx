/* eslint-disable @typescript-eslint/no-explicit-any */
import { Heading, Stack, Switch } from '@chakra-ui/react'
import { chakra } from '@chakra-ui/system'

export default {
  title: 'Chakra UI Components / Forms / Switch',
  decorators: [
    (story: Function) => {
      return <chakra.div mx="auto">{story()}</chakra.div>
    },
  ],
}

export const Base = () => {
  return (
    <Stack spacing="5">
      <Switch />
      <Heading>isDisabled</Heading>
      <Switch isDisabled />
      <Heading>isChecked 値を更新するために、onChangeが必要</Heading>
      <Switch isChecked />
      <Heading>isChecked isDisabled</Heading>
      <Switch isChecked isDisabled />
    </Stack>
  )
}
